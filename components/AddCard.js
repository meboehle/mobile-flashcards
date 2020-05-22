import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
import { white, xiketic, persianBlue } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { CommonActions } from '@react-navigation/native'

class AddCard extends Component {
  state = {
    disabled: true,
    question: '',
    answer: ''
  }

  onSubmit = () => {
    const { question, answer, disabled } = this.state

    const card = { question, answer }

    if (!disabled) {
      addCardToDeck(this.props.deckTitle, card)

      this.setState(() => ({
        question: '',
        answer: '',
        disabled: true
      }))

      this.toDeck()
    }
  }

  toDeck = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'Deck',
      })
    )
  }

  onChangeQuestion = (text) => {
    this.setState(() => ({
      question: text,
      disabled: text.trim() === '' || this.state.answer === '' ? true : false
    }))
  }

  onChangeAnswer = (text) => {
    this.setState(() => ({
      answer: text,
      disabled: text.trim() === '' || this.state.question === '' ? true : false
    }))
  }

  render() {
    const { question, answer, disabled } = this.state
    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}>
        <Text style={styles.deckTitle}>{this.props.deckTitle.trim()}</Text>
        <Text style={styles.title}>Add a Card</Text>
        <TextInput
          placeholder='Question'
          style={styles.input}
          onChangeText={text => this.onChangeQuestion(text)}
          value={question}
        />
        <TextInput
          placeholder='Answer'
          style={styles.input}
          onChangeText={text => this.onChangeAnswer(text)}
          value={answer}
        />
        <TextButton
          style={disabled ? styles.disabledBtn : styles.button}
          activeOpacity={disabled ? 1 : 0.7}
          onPress={this.onSubmit}>
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
    padding: 20,
    textAlign: 'center'
  },
  deckTitle: {
    fontSize: 50,
    textAlign: 'center',
    color: persianBlue,
    paddingBottom: 15,
    fontWeight: '600'
  },
  input: {
    backgroundColor: white,
    height: 40,
    shadowColor: xiketic,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
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
    color: white,
    marginBottom: 100,
  },
  disabledBtn: {
    backgroundColor: persianBlue,
    opacity: 0.3,
    color: white,
    marginBottom: 100,
  }
})

function mapStateToProps(state, { route }) {
  const { deckId } = route.params
  return {
    deckTitle: state[deckId].title
  }
}

export default connect(mapStateToProps)(AddCard)