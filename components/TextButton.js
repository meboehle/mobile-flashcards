import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, persianGreen, tartOrange, persianBlue, xiketic } from '../utils/colors'

export default function TextButton ({ children, onPress, activeOpacity, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 10,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 7,
    width: 160,
    marginTop: 10,
    fontSize: 24,
    overflow: 'hidden',
  }
})