import CustomButton from "../components/cards/cardIA";
import InputIA from "../components/common/input/inputIA";

import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function PreLogin() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages(prev => [...prev, inputValue]);
    setInputValue("");
    setChatStarted(true);
  };

  // Scroll para o final sempre que uma mensagem for enviada
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const isChat = chatStarted && messages.length > 0;

  return (
    <View style={styles.container}>
      {/* Header dinâmico */}
      {!isChat ? (
        <View style={styles.topo}>
          <Image
            source={require("../../assets/icons/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.titulos}>
            <Text style={styles.title}>Athena</Text>
            <Text style={styles.subtitle}>Sua aliada emocional</Text>
          </View>
        </View>
      ) : (
        <View style={styles.headerFixed}>
          <View style={[styles.headerRow, styles.headerRowChat]}>
            <Image
              source={require("../../assets/icons/logo.png")}
              style={[styles.logo, styles.logoChat]}
              resizeMode="contain"
            />
            <Text style={[styles.title, styles.titleChat]}>Athena</Text>
          </View>
        </View>
      )}

      {/* Cards + Input agrupados na mesma View */}
      <View style={styles.inferior}>
        {!isChat ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              style={styles.cardsScroll}
            >
              <CustomButton 
                title="O que posso fazer para me sentir melhor hoje?" 
                onPress={() => setInputValue("O que posso fazer para me sentir melhor hoje?")} 
              />
              <CustomButton 
                title="Registrar meu humor" 
                onPress={() => setInputValue("Registrar meu humor")} 
              />
              <CustomButton 
                title="Meditação guiada" 
                onPress={() => setInputValue("Meditação guiada")} 
              />
              <CustomButton 
                title="Exercícios rápidos" 
                onPress={() => setInputValue("Exercícios rápidos")} 
              />
            </ScrollView>
            <InputIA
              value={inputValue}
              onChangeText={setInputValue}
              onIconPress={handleSend}
              placeholder="Digite sua mensagem..."
            />
          </>
        ) : (
          <>
            {/* Chat messages scroll reverso */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatScroll}
              contentContainerStyle={styles.chatContainer}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((msg, idx) => (
                <View key={idx} style={styles.messageBubble}>
                  <Text style={styles.messageText}>{msg}</Text>
                </View>
              ))}
            </ScrollView>
            <InputIA
              value={inputValue}
              onChangeText={setInputValue}
              onIconPress={handleSend}
              placeholder="Digite sua mensagem..."
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsScroll: {},
  inputFixedWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: height * 0.14 + height * 0.02,
    paddingHorizontal: width * 0.08,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.06,
    justifyContent: "center",
  },
  logo: {
    width: width * 0.42,
    height: height * 0.1,
    marginBottom: height * -0.03,
  },
  logoChat: {
    width: width * 0.13,
    height: height * 0.06,
    marginBottom: 0,
    marginRight: width * 0.02,
    alignSelf: "flex-end",
  },
  topo: {
    gap: height * 0.05,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  topoChat: {
    marginBottom: height * 0.01,
    alignItems: "flex-start",
    paddingTop: height * 0.01,
  },
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRowChat: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
  },
  titulos: {
    gap: height * 0.001,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.09,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
  titleChat: {
    fontSize: width * 0.06,
    color: "#fff",
    textAlign: "left",
    fontFamily: "Inter_600SemiBold",
    marginLeft: width * 0.01,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: height * 0.03,
    fontFamily: "Inter_600SemiBold",
  },
  scrollContent: {
    flexDirection: "row",
    gap: width * 0.05,
    paddingHorizontal: width * 0.02,
    marginBottom: 0,
  },
  inferior: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: height * 0.14 + height * 0.02,
    paddingHorizontal: width * 0.08,
  },
  chatScroll: {
    flex: 1,
    marginBottom: height * 0.02,
    maxHeight: "100%",
  },
  chatContainer: {
    paddingBottom: height * 0.02,
    justifyContent: "flex-end",
  },
  messageBubble: {
    backgroundColor: "#29374F",
    borderRadius: 12,
    padding: 10,
    marginVertical: 4,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  messageText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  input: {
    marginBottom: height * 0.1,
  },
});
