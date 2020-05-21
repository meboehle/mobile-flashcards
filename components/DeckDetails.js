import React from 'react'
import { View, Text } from 'react-native'

export default function DeckDetails ({ style, titleStyle, subTitleStyle, title, numCards }) {
  return (
    <View style={style}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={subTitleStyle}>{numCards} cards</Text>
    </View>
  )
}