import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import TextButton from './TextButton'
import { xiketic, persianBlue, white } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { CommonActions } from '@react-navigation/native'

class AddDeck extends Component {
  state = {
    disabled: true,
    value: '',
  }

  onSubmit = (disabled) => {
    if (!disabled) {
      const { value } = this.state
      const { decks } = this.props
      const found = Object.keys(decks).find(
        (deck) => deck.trim().toLowerCase() === value.trim().toLowerCase()
      )

      if (found) {
        alert('You already have a deck with this name.')
      } else {
        const deck = {
          title: value,
          questions: []
        }

        this.props.dispatch(addDeck({
          [value]: deck
        }))

        saveDeckTitle(value)

        this.setState(({ value: '', disabled: true }))

        this.toHome()
      }
    }
  }

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'DeckList',
      })
    )
  }

  onChangeText = (text) => {
    this.setState(() => ({
      value: text,
      disabled: text.trim() === '' ? true : false
    }))
  }

  render () {
    const { value, disabled } = this.state
    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          placeholder='Deck title'
          style={styles.input}
          onChangeText={text => this.onChangeText(text)}
          value={value}
        />
        <TextButton
          style={disabled ? styles.disabledBtn : styles.button}
          activeOpacity={disabled ? 1 : 0.7}
          onPress={() => this.onSubmit(disabled)}>
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    padding: 40,
    textAlign: 'center'
  },
  input: {
    backgroundColor: white,
    height: 40,
    width: 300,
    fontSize: 24,
    borderColor: xiketic,
    borderWidth: 1,
    margin: 10,
    paddingLeft: 5,
    color: xiketic,
    borderRadius: 3,
  },
  button: {
    backgroundColor: persianBlue,
    color: white
  },
  disabledBtn: {
    backgroundColor: persianBlue,
    opacity: 0.3,
    color: white
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)