import { useState } from "react";
import { View, Text } from "react-native";
import { Svg, Path, LinearGradient, Defs, Stop  } from "react-native-svg";
import * as d3 from 'd3';
import { styles } from "./styles";

type GraficoCardProps = {
  data: number[]
  color: string 
  title:  string
  title2: string
  subtitle: string
}

const CHART_ASPECT_RATTIO = 9 / 16

export function GraficoCard(props: GraficoCardProps) {
  const [witdh, setWidth] = useState(0)

  const  height = witdh * CHART_ASPECT_RATTIO
  const chartHeight = (height * 2) / 4

  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  

const yScale = d3.scaleLinear().domain([min, max]).range([chartHeight, 0])
const xScale = d3.scaleLinear().domain([0, props.data.length - 1]).range([0, witdh])

const linefn = d3
.line<number>()
.y((d, i) => yScale(d))
.x((d, i) => xScale(i))
.curve(d3.curveCardinal.tension (0))

const areafn = d3
.area<number>()
.x((d, i) => xScale(i))
.y0(height)
.y1((d, i) => yScale(d))
.curve(d3.curveCardinal.tension (0))

const svgLine = linefn(props.data) ?? ""
const svgArea = areafn(props.data) ?? ""

  return (
    <View style={styles.container} onLayout={(({nativeEvent})=> setWidth(nativeEvent.layout.width))}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.title2}>{props.title2}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      
      <Svg width={witdh} 
           height={height} 
           viewBox= {`-20 0 ${witdh} ${height -12} `}>
        <Path d={svgLine} stroke="blue" fill="none" strokeWidth={1}/>
        <Path d={svgArea} stroke="none" fill={props.color} opacity={0.1} />
      </Svg>
    </View>
  )
}


