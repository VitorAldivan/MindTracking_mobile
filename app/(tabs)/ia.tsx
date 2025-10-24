import CustomButton from "../components/cards/cardIA";
import InputIA from "../components/common/input/inputIA";

import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function PreLogin() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const flatListRef = useRef<FlatList<string>>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleSend = (text?: string) => {
    const toSend = (text ?? inputValue).trim();
    if (!toSend) return;
    setMessages(prev => [...prev, toSend]);
    setInputValue("");
    setChatStarted(true);
  };

  const isChat = chatStarted && messages.length > 0;

  return (
    <View style={styles.container}>
      {/* Header dinâmico */}
      <View style={isChat ? styles.headerFixedChat : styles.topo}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={
            isChat
              ? [styles.logo, styles.logoChat, styles.logoChatActive]
              : styles.logo
          }
          resizeMode="contain"
        />
        <View style={isChat ? [styles.headerRow, styles.headerRowChat] : styles.titulos}>
          {isChat ? (
            <Text style={[styles.title, styles.titleChat, styles.titleChatActive]}>
              Assistente Emocional
            </Text>
          ) : (
            <>
              <Text style={styles.title}>Athena</Text>
              <Text style={styles.subtitle}>Sua aliada emocional</Text>
            </>
          )}
        </View>
      </View>

      {/* Area principal */}
      {!isChat ? (
        <View style={styles.inferior}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.cardsScroll}
          >
            <CustomButton title="O que posso fazer para me sentir melhor hoje?" onPress={() => handleSend("O que posso fazer para me sentir melhor hoje?")} />
            <CustomButton title="Registrar meu humor" onPress={() => handleSend("Registrar meu humor")} />
            <CustomButton title="Meditação guiada" onPress={() => handleSend("Meditação guiada")} />
            <CustomButton title="Exercícios rápidos" onPress={() => handleSend("Exercícios rápidos")} />
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
          >
            <InputIA
              value={inputValue}
              onChangeText={setInputValue}
              onIconPress={() => handleSend()}
              placeholder="Digite sua mensagem..."
            />
          </KeyboardAvoidingView>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.chatContent}
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, idx) => String(idx)}
            contentContainerStyle={styles.chatContainer}
            style={styles.chatScroll}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item}</Text>
              </View>
            )}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
          />
          <View style={!keyboardOpen ? styles.inputWrapperWithPadding : null}>
            <InputIA
              value={inputValue}
              onChangeText={setInputValue}
              onIconPress={() => handleSend()}
              placeholder="Digite sua mensagem..."
            />
          </View>
        </KeyboardAvoidingView>
      )}
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
    backgroundColor: "#0F172A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.06,
  },
  logo: {
    width: width * 0.42,
    height: height * 0.1,
    marginBottom: height * -0.03,
  },
  logoChat: {
    width: width * 0.12,
    height: width * 0.12,
    marginRight: width * 0.03,
    marginBottom: 0,
    alignSelf: "auto",
  },
  logoChatActive: {
    width: width * 0.12,
    height: width * 0.12,
    marginRight: width * 0.03,
  },
  topo: {
    gap: height * 0.05,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  headerFixedChat: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.025,
    width: "100%",
    backgroundColor: "#0F172A",
    zIndex: 1,
  },
  headerRow: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRowChat: {
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "auto",
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
    fontSize: width * 0.07,
    color: "#fff",
    textAlign: "left",
    fontFamily: "Inter_600SemiBold",
    marginLeft: 0,
    alignSelf: "center",
  },
  titleChatActive: {
    fontSize: width * 0.07,
    fontFamily: "Inter_700Bold",
    marginRight: 0,
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
    paddingVertical: height * 0.015,
  },
  inferior: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: height * 0.14 + height * 0.02,
    paddingHorizontal: width * 0.08,
  },
  chatContent: {
    flex: 1,
    paddingTop: height * 0.01,
  },
  inputWrapperWithPadding: {
    paddingBottom: height * 0.160, // ajuste o valor até ficar igual ao print 1 SEM teclado aberto
  },
  chatScroll: {
    flex: 1,
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