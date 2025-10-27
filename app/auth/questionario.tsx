import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchQuestions as fetchQuestionsService, submitAnswers as submitAnswersService } from "../../service/questionarioService";

const { width, height } = Dimensions.get("window");
const API_BASE_URL = "http://44.220.11.145";

export default function Questionnaire() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = String(params?.mode ?? "");

  // no fallback: rely on backend for perguntas
  const fallback: any[] = [];

  const [questions, setQuestions] = useState<Array<any>>(fallback as any);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);

  // animação da barra
  const progressAnim = useRef(new Animated.Value(0)).current!;
  // Animated.View sometimes confuses TS JSX types in this workspace; create a safe any alias
  const AnimatedView: any = Animated.View;

  // animate progress when index or questions length change; progress = answeredCount / total
  useEffect(() => {
    const total = questions.length;
    const newProgress = total === 0 ? 0 : (currentQuestionIndex / total) * 100;

    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex, questions.length, progressAnim]);

  // fetch questions from backend
  useEffect(() => {
    let mounted = true;
    async function loadQuestions() {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const modeParam = mode === "diario" ? "diario" : undefined;
        const resp = await fetchQuestionsService(modeParam);
        if (mounted && resp) {
          // API may return { success:true, perguntas: [...] } or an array directly
          const raw = Array.isArray(resp) ? resp : (resp.perguntas ?? resp);
          if (Array.isArray(raw) && raw.length > 0) {
            setQuestions(
              raw.map((q: any, idx: number) => ({
                id: Number(q.id ?? idx + 1),
                text: String(q.text ?? q.texto ?? q.pergunta ?? q.question ?? ""),
                alternativas: Array.isArray(q.alternativas)
                  ? q.alternativas.map((a: any) => ({ id: Number(a.id), texto: a.texto ?? a.text ?? String(a), pontuacao: a.pontuacao ?? null }))
                  : [],
              }))
            );
          }
        }
      } catch (e) {
        console.log("Could not fetch questions, using fallback", (e as any)?.message ?? String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadQuestions();
    return () => {
      mounted = false;
    };
  }, [mode]);

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((c) => c + 1);
    } else {
      await submitAnswers();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((c) => c - 1);
    }
  };

  const handleSelect = async (alternativaId: number) => {
    const perguntaId = questions[currentQuestionIndex]?.id;
    if (!perguntaId) return;
    setSelected((s) => ({ ...s, [perguntaId]: alternativaId }));
    // auto-advance
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((c) => c + 1);
    } else {
      await submitAnswers();
    }
  };

  const submitAnswers = async () => {
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const respostas = questions
        .map((q: any) => ({ pergunta_id: q.id, alternativa_id: selected[q.id] }))
        .filter((r: any) => r.alternativa_id !== undefined && r.alternativa_id !== null);

      const body: any = { respostas };
      // ensure we send a valid usuario_id: first try AsyncStorage
      let usuarioId = await AsyncStorage.getItem("usuario_id");

      // helper: robust JWT decode + network lookup to obtain usuario_id and persist it
      const base64Decode = (b64: string) => {
        try {
          // handle URL-safe base64
          const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
          // add padding
          const pad = padded.length % 4;
          const withPad = pad === 0 ? padded : padded + '='.repeat(4 - pad);
          if (typeof globalThis.atob === 'function') {
            return globalThis.atob(withPad);
          }
          // React Native JS environment: use Buffer if available
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (globalThis as any).Buffer !== 'undefined') {
            // @ts-ignore
            return (globalThis as any).Buffer.from(withPad, 'base64').toString('utf8');
          }
          // last resort: try decoding via decodeURIComponent
          const binary = atob(withPad);
          return decodeURIComponent(escape(binary));
        } catch (e) {
          return null;
        }
      };

      const decodeJwt = (tk?: string) => {
        if (!tk) return null;
        try {
          const parts = tk.split('.');
          if (parts.length < 2) return null;
          const json = base64Decode(parts[1]);
          if (!json) return null;
          return JSON.parse(json);
        } catch (e) {
          return null;
        }
      };

      const tryNetworkUser = async (tk?: string) => {
        if (!tk) return null;
        const candidates = [
          "/auth/me",
          "/usuario/me",
          "/user/me",
          "/users/me",
          "/usuario",
          "/user",
        ];
        // import api lazily to avoid top-level cycle
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const api = require("../../service/api").default;
        for (const endpoint of candidates) {
          try {
            const res = await api.get(endpoint, { headers: { Authorization: `Bearer ${tk}` }, timeout: 5000 });
            if (res?.data) return res.data;
          } catch (_) {
            // ignore and try next
          }
        }
        return null;
      };

      // 1) AsyncStorage
      // (usuarioId variable already set above from AsyncStorage getItem)

      // 2) decode JWT token payload
      if (!usuarioId && token) {
        const decoded = decodeJwt(token);
        if (decoded) {
          usuarioId = String(decoded.id ?? decoded.user?.id ?? decoded.usuario_id ?? decoded.usuario?.id ?? decoded.sub ?? "");
          if (usuarioId) {
            await AsyncStorage.setItem('usuario_id', usuarioId);
            console.log('Decoded usuario_id from token:', usuarioId);
          }
        }
      }

      // 3) network lookup (last resort)
      if (!usuarioId && token) {
        try {
          const userData = await tryNetworkUser(token);
          if (userData) {
            usuarioId = String(userData.id ?? userData.user?.id ?? userData.usuario_id ?? userData.usuario?.id ?? userData.sub ?? "");
            if (usuarioId) {
              await AsyncStorage.setItem('usuario_id', usuarioId);
              console.log('Fetched usuario_id from network:', usuarioId);
            }
          }
        } catch (e) {
          console.log('Network lookup for usuario_id failed', (e as any)?.message ?? e);
        }
      }

      if (usuarioId) body.usuario_id = Number(usuarioId);

  await submitAnswersService(body, mode);

      // on success
      await AsyncStorage.removeItem("questionario_pending");
      // if this was the daily questionnaire, persist that it was completed today
      try {
        // sempre marcar o questionário como concluído — seja inicial ou diário
const today = new Date().toISOString().slice(0, 10);
await AsyncStorage.setItem("diario_last_done", today);
await AsyncStorage.setItem("diario_show_modal", "true");

      } catch (e) {
        // ignore storage errors
        console.log('Failed to persist diario flag', (e as any)?.message ?? e);
      }

      router.replace("/(tabs)/home");
    } catch (err) {
      console.log("Failed submit answers", (err as any)?.response ?? err);
      // prefer backend message when available
      const message = (err as any)?.response?.data?.message ?? (err as any)?.message ?? "Não foi possível enviar suas respostas. Tente novamente.";
      Alert.alert("Erro", String(message));
    } finally {
      setSubmitting(false);
    }
  };

  const renderProgressBar = () => {
    const total = questions.length;
    const progress = total === 0 ? 0 : (currentQuestionIndex / total) * 100;

    return (
      <>
        <View style={styles.progressWrapper}>
          <Text style={styles.progressText}>Progresso</Text>
          <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
        </View>

        <View style={styles.progressContainer}>
          <AnimatedView
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </>
    );
  };

  // If there are no questions from the backend, show a simple message and a button
  if (!loading && (!questions || questions.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.backButtonWrapper}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Image source={require("../../assets/icons/seta.png")} style={styles.seta} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.middleWrapper}>
          <Text style={[styles.questionText, { textAlign: "center" }]}>Nenhuma pergunta disponível no momento.</Text>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={async () => {
              try {
                await AsyncStorage.removeItem("questionario_pending");
              } catch (e) {
                /* ignore */
              }
              router.replace("/(tabs)/home");
            }}
          >
            <Text style={styles.optionText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={require("../../assets/icons/seta.png")} style={styles.seta} />
          </TouchableOpacity>
        )}
      </View>

      {renderProgressBar()}

      <View style={styles.middleWrapper}>
        <View style={styles.questionWrapper}>
          <View style={styles.verticalLine} />
          <Text style={styles.questionText}>{questions[currentQuestionIndex]?.text ?? ""}</Text>
        </View>
      </View>

      <View style={styles.optionContainer}>
        {(() => {
          const q = questions[currentQuestionIndex] ?? { alternativas: [] };
          if (q.alternativas && q.alternativas.length > 0) {
            return q.alternativas.map((alt: any) => {
              const isSelected = selected[q.id] === alt.id;
              return (
                <TouchableOpacity
                  key={String(alt.id)}
                  style={[styles.option, isSelected ? styles.optionSelected : null]}
                  onPress={() => handleSelect(alt.id)}
                >
                  <View style={[styles.radio, isSelected ? styles.radioSelected : null]} />
                  <Text style={styles.optionText}>{alt.texto}</Text>
                </TouchableOpacity>
              );
            });
          }

          // if question exists but has no alternativas: show a Next button
          return (
            <TouchableOpacity key="next" style={styles.option} onPress={handleNext}>
              <View style={styles.radio} />
              <Text style={styles.optionText}>Próximo</Text>
            </TouchableOpacity>
          );
        })()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.06,
  },
  backButtonWrapper: {
    height: height * 0.06, // espaço reservado fixo
    marginBottom: height * 0.02,
    justifyContent: "center",
  },
  backButton: {
    marginBottom: height * 0.01,
    marginTop: height * 0.05,
  },
  seta: {
    width: width * 0.09,
    height: width * 0.08,
    tintColor: "#fff",
    resizeMode: "contain",
    marginBottom: height * 0.025,
    transform: [{ rotate: "90deg" }],
  },
  progressWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02,
  },
  progressText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontFamily: "Inter_500Medium",
  },
  progressContainer: {
    height: height * 0.015,
    backgroundColor: "#1E293B",
    borderRadius: width * 0.02,
    overflow: "hidden",
    marginBottom: height * 0.04,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2E5BFF",
    borderRadius: width * 0.02,
  },
  middleWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  questionWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: width * 0.02,
  },
  verticalLine: {
    width: width * 0.009,
    backgroundColor: "#fff",
    marginRight: width * 0.03,
    borderRadius: 2,
    alignSelf: "stretch",
    marginTop: -14,
    marginBottom: -14,
  },
  questionText: {
    flex: 1,
    fontSize: width * 0.055,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  optionContainer: {
    marginTop: "auto",
    marginBottom: height * 0.08,
    gap: height * 0.02,
  },
  option: {
    flexDirection: "row",
    // align to top so wrapped text expands downward
    alignItems: "flex-start",
    backgroundColor: "#29374F",
    borderRadius: 24,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    minHeight: 48,
    paddingRight: width * 0.04,
  },
  optionSelected: {
    backgroundColor: "#3357D6",
  },
  radio: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: "white",
    marginRight: width * 0.04,
    flexShrink: 0,
  },
  radioSelected: {
    backgroundColor: "#2E5BFF",
    borderColor: "#2E5BFF",
  },
  optionText: {
    color: "white",
    fontSize: width * 0.045,
    fontFamily: "Inter_500Medium",
    // allow wrapping and ensure text stays within the card
    flex: 1,
    flexWrap: "wrap",
    includeFontPadding: false,
    marginRight: width * 0.02,
  },
});
