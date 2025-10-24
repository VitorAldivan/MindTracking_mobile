import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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

const { width, height } = Dimensions.get("window");
const API_BASE_URL = "http://44.220.11.145";

export default function Questionnaire() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = String(params?.mode ?? "");

  const [questions, setQuestions] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;

  // anima barra de progresso
  useEffect(() => {
    const total = questions.length;
    const newProgress = total === 0 ? 0 : (currentQuestionIndex / total) * 100;
    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex, questions.length, progressAnim]);

  // obtém perguntas da API
  useEffect(() => {
    let mounted = true;
    async function fetchQuestions() {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const perguntasEndpoint =
          mode === "diario"
            ? `${API_BASE_URL}/questionario/diario/perguntas`
            : `${API_BASE_URL}/questionario/perguntas`;

        const resp = await axios.get(perguntasEndpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          timeout: 10000,
        });

        if (mounted && resp?.data) {
          const raw = Array.isArray(resp.data)
            ? resp.data
            : resp.data.perguntas ?? resp.data;
          if (Array.isArray(raw) && raw.length > 0) {
            setQuestions(
              raw.map((q: any, idx: number) => ({
                id: Number(q.id ?? idx + 1),
                text: String(
                  q.text ?? q.texto ?? q.pergunta ?? q.question ?? ""
                ),
                alternativas: Array.isArray(q.alternativas)
                  ? q.alternativas.map((a: any) => ({
                      id: Number(a.id),
                      texto: a.texto ?? a.text ?? String(a),
                      pontuacao: a.pontuacao ?? null,
                    }))
                  : [],
              }))
            );
          }
        }
      } catch (e) {
        console.log("Erro ao buscar perguntas", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchQuestions();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelect = async (alternativaId: number) => {
    const perguntaId = questions[currentQuestionIndex]?.id;
    if (!perguntaId) return;
    setSelected((s) => ({ ...s, [perguntaId]: alternativaId }));

    // avança automaticamente
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
        .map((q: any) => ({
          pergunta_id: q.id,
          alternativa_id: selected[q.id],
        }))
        .filter(
          (r: any) => r.alternativa_id !== undefined && r.alternativa_id !== null
        );

      const body: any = { respostas };
      const responderEndpoint =
        mode === "diario"
          ? `${API_BASE_URL}/questionario/diario/responder`
          : `${API_BASE_URL}/questionario/responder`;

      await axios.post(responderEndpoint, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      // garante persistência antes do redirecionamento
      const today = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem("diario_last_done", today);
      await AsyncStorage.setItem("diario_show_modal", "true");

      router.replace("/(tabs)/home");
    } catch (err) {
      console.log("Erro ao enviar respostas", err);
      Alert.alert(
        "Erro",
        (err as any)?.response?.data?.message ??
          "Não foi possível enviar suas respostas. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleWrapper}>
        <View style={styles.questionWrapper}>
          <View style={styles.verticalLine} />
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex]?.text ?? ""}
          </Text>
        </View>
      </View>

      <View style={styles.optionContainer}>
        {(questions[currentQuestionIndex]?.alternativas || []).map((alt: any) => {
          const isSelected =
            selected[questions[currentQuestionIndex].id] === alt.id;
          return (
            <TouchableOpacity
              key={alt.id}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelect(alt.id)}
            >
              <View
                style={[styles.radio, isSelected && styles.radioSelected]}
              />
              <Text style={styles.optionText}>{alt.texto}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", padding: 20 },
  middleWrapper: { flex: 1, justifyContent: "center" },
  questionWrapper: { flexDirection: "row" },
  verticalLine: { width: 2, backgroundColor: "#fff", marginRight: 10 },
  questionText: { color: "#fff", fontSize: 18 },
  optionContainer: { gap: 14, marginBottom: 50 },
  option: {
    backgroundColor: "#29374F",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  optionSelected: { backgroundColor: "#3357D6" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  radioSelected: { backgroundColor: "#2E5BFF", borderColor: "#2E5BFF" },
  optionText: { color: "#fff" },
});
