import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { CorrelationsCard, InfoCard, StatCard, AthenaCard, ExportarJornadaCard   } from "../components/cards/cardDashboard1";
import { GraficoCard } from "../components/cards/grafico";


const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardsWrapper}
        showsVerticalScrollIndicator={false}
      >
       

        <StatCard
          title="Questionários respondidos"
          value={22}
          deltaSign="up"
          deltaText="3% mais do que o mês passado"
          icon={require('@assets/icons/clipboard.png')}
        />

        <InfoCard
          title="Estado Emocional Médio"
          subtitle="Complete uma jornada de 7 questionários para poder visualizar sua nota."
          icon={require('@assets/icons/grafico.png')}
        />

        <InfoCard
          title="Recomendação"
          subtitle="Bem-vindo à MindTracking! Que tal começar conhecendo mais sobre como está se sentindo hoje?"
          icon={require('@assets/icons/recomendacao.png')}
        />

        <CorrelationsCard
          items={[
            { icon: require('@assets/icons/joiaverde.png'), color: '#16A34A', text: 'Dias com 7h+ de sono: 4 dias' },
            { icon: require('@assets/icons/joiavermelho.png'), color: '#E11D48', text: 'Menos ansiedade após 3 dias de diário' },
            { icon: require('@assets/icons/joiaverde.png'), color: '#16A34A', text: 'Dias com alimentação saúdavel: 7 dias ' },
          ]}
        />

        <GraficoCard 
            data={[2, 10, 1, 8, 3, 10, 8]}
            color="#38BDF8"
            title="Seu Bem-Estar Esta Semana"
            title2="Média: 6.8  | Melhor dia: 8.0 (qui)"
            xLabels={[
            "10/07", "11/07", "12/07", "13/07", "14/07", "15/07", "16/07"
            ]}
        />


        <AthenaCard
          title="Converse com a Athena"
          description="12 conversas até agora."
          onPress={() => {/* ação ao clicar, se desejar */}}
          testID="athena-card"
  // O ícone já está fixo no componente (chat.png) pelo exemplo anterior.
 />

<ExportarJornadaCard
  title="Exportar Jornada"
  description="Leve suas reflexões com você. Gere um arquivo PDF seguro para compartilhar com seu terapeuta ou guardar como um arquivo pessoal."
  onPress={() => {/* ação ao clicar, se desejar */}}
  testID="exportar-jornada-card"
  // O ícone já está fixo no componente (lightbulb.png) pelo exemplo anterior.
 />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.06,
  },
  cardsWrapper: {
    width: '100%',
    rowGap: height * 0.025,
    alignItems: 'center',
    paddingTop: height * 0.02,
    paddingBottom: height * 0.1,
  },
});