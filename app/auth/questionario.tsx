import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Questionnaire() {
  const router = useRouter();

  const [questions] = useState([
    { id: 1, text: "Qual o seu objetivo com o uso do nosso app?" },
    { id: 2, text: "Com que frequência você se sente estressado?" },
    { id: 3, text: "Você pratica atividades físicas regularmente?" },
    { id: 4, text: "Você se sente ansioso durante o dia?" },
    { id: 5, text: "Como você descreveria sua qualidade de sono?" },
    { id: 6, text: "Você se sente ansioso durante o dia?" },
    { id: 7, text: "Como você descreveria sua qualidade de sono?" },
    { id: 8, text: "Qual o seu objetivo com o uso do nosso app?" },
    { id: 9, text: "Com que frequência você se sente estressado?" },
    { id: 10, text: "Você pratica atividades físicas regularmente?" },
    { id: 11, text: "Você se sente ansioso durante o dia?" },
    { id: 12, text: "Como você descreveria sua qualidade de sono?" },
    { id: 13, text: "Você se sente ansioso durante o dia?" },
    { id: 14, text: "Como você descreveria sua qualidade de sono?" },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // animação da barra
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const total = questions.length;
    const newProgress = ((currentQuestionIndex + 1) / total) * 100;

    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 500, // meio segundo de animação
      useNativeDriver: false, // largura não suporta native driver
    }).start();
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // router.push("/final");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderProgressBar = () => {
    const total = questions.length;
    const progress = ((currentQuestionIndex + 1) / total) * 100;

    return (
      <>
        <View style={styles.progressWrapper}>
          <Text style={styles.progressText}>Progresso</Text>
          <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
        </View>

        <View style={styles.progressContainer}>
          {/* Animated.View no lugar da View normal */}
          <Animated.View
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

  return (
    <View style={styles.container}>
      {/* wrapper com altura fixa */}
      <View style={styles.backButtonWrapper}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image
              source={require("../../assets/icons/seta.png")}
              style={styles.seta}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* barra de progresso */}
      {renderProgressBar()}

      {/* wrapper que centraliza a pergunta */}
      <View style={styles.middleWrapper}>
        <View style={styles.questionWrapper}>
          <View style={styles.verticalLine} />
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].text}
          </Text>
        </View>
      </View>

      {/* opções */}
      <View style={styles.optionContainer}>
        {["Nunca", "Raramente", "Às vezes", "Sempre"].map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={handleNext}>
            <View style={styles.radio} />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: height * 0.02,
  },
  seta: {
    width: width * 0.09,
    height: width * 0.08,
    tintColor: "#3F3F46",
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
    alignItems: "center",
    backgroundColor: "#29374F",
    borderRadius: 24,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  radio: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: "white",
    marginRight: width * 0.04,
  },
  optionText: {
    color: "white",
    fontSize: width * 0.045,
    fontFamily: "Inter_500Medium",
  },
});
