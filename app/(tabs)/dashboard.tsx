import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { CorrelationsCard, InfoCard, StatCard } from "../components/cards/cardDashboard1";
//import { WellbeingChart } from "../components/cards/grafico";


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
            { icon: require('@assets/icons/diario.png'), color: '#16A34A', text: 'Dias com 7h+ de sono: 4 dias' },
            { icon: require('@assets/icons/apoio.png'), color: '#E11D48', text: 'Menos ansiedade após 3 dias de diário' },
          ]}
        />

        {/* <WellbeingChart
          data={[
            { xLabel: '10/07', value: 8 },
            { xLabel: '11/07', value: 9 },
            { xLabel: '12/07', value: 6 },
            { xLabel: '13/07', value: 7 },
            { xLabel: '14/07', value: 8 },
            { xLabel: '15/07', value: 6 },
            { xLabel: '16/07', value: 10 },
          ]}
          avgLabel="Média: 6.8"
          bestLabel="Melhor dia: 8.0 (qui)"
        /> */}
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
