// App.tsx
import React from 'react';
import { View, Text } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

// Dados da semana (10/07 a 16/07)
const data = [
  { x: '10/07', y: 8.0 },
  { x: '11/07', y: 9.0 },
  { x: '12/07', y: 6.0 },
  { x: '13/07', y: 7.0 },
  { x: '14/07', y: 8.0 },
  { x: '15/07', y: 6.0 },
  { x: '16/07', y: 10.0 },
];

// Estatísticas
const media = 6.8;
const melhorDia = { label: 'qui', valor: 8.0 }; // Melhor dia 8.0 (qui)

export default function BemEstarSemana() {
  return (
    <View style={{ backgroundColor: '#0f1320', padding: 16, borderRadius: 12 }}>
      <Text style={{ color: '#ffffff', fontSize: 22, marginBottom: 4 }}>
        Seu Bem-Estar Esta Semana
      </Text>
      <Text style={{ color: '#bac2d6', marginBottom: 8 }}>
        Média: {media.toFixed(1)}  |  Melhor dia: {melhorDia.valor.toFixed(1)} ({melhorDia.label})
      </Text>

      <VictoryChart
        theme={VictoryTheme.material}
        height={260}
        padding={{ top: 20, right: 24, bottom: 40, left: 36 }}
        domain={{ y: [0, 10] }}
      >
        {/* Eixo Y oculto, grade sutil */}
        <VictoryAxis
          dependentAxis
          tickValues={[0, 2, 4, 6, 8, 10]}
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            grid: { stroke: 'rgba(158, 174, 255, 0.18)' },
            tickLabels: { fill: 'transparent' },
          }}
        />

        {/* Eixo X com datas */}
        <VictoryAxis
          tickValues={data.map(d => d.x)}
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: '#97a4cc', fontSize: 10 },
          }}
        />

        {/* Área preenchida (gradiente simulado com opacidade) */}
        <VictoryArea
          data={data}
          interpolation="monotoneX"
          style={{
            data: {
              fill: 'rgba(52, 104, 255, 0.18)',
              stroke: 'transparent',
            },
          }}
          animate={{ duration: 800 }}
        />

        {/* Linha principal */}
        <VictoryLine
          data={data}
          interpolation="monotoneX"
          style={{
            data: {
              stroke: '#7db0ff',
              strokeWidth: 2,
              filter: 'drop-shadow(0px 0px 6px rgba(125,176,255,0.6))' as any,
            },
          }}
          animate={{ duration: 800 }}
        />

        {/* Pontos em forma de “diamante” com contorno claro */}
        <VictoryScatter
          data={data}
          size={4}
          symbol="diamond"
          style={{
            data: {
              fill: '#0f1320',
              stroke: '#b6c8ff',
              strokeWidth: 1.5,
            },
          }}
          animate={{ duration: 800 }}
        />

        {/* Linha de referência da média */}
        <VictoryLine
          y={() => media}
          style={{
            data: { stroke: 'rgba(182, 200, 255, 0.25)', strokeDasharray: '6,6' },
          }}
        />
        <VictoryLabel
          x={36}
          y={36}
          text={`Média ${media.toFixed(1)}`}
          style={{ fill: '#9eb2e6', fontSize: 10 }}
        />
      </VictoryChart>

      {/* Legenda simples */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#7db0ff',
            marginRight: 6,
          }}
        />
        <Text style={{ color: '#97a4cc' }}>Esta semana</Text>
      </View>
    </View>
  );
}
