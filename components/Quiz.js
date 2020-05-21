import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { persianGreen, tartOrange, white, xiketic, persianBlue } from '../utils/colors'
import TextButton from './TextButton'
import { getDeck } from '../utils/api'

class Quiz extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    correct: 0,
    incorrect: 0,
    showQuestion: true,
  }

  componentDidMount () {
    getDeck(this.props.deckId).then((deck) => {
      this.setState(() => ({
        questions: deck.questions
      }))
    })
  }

  showAnswer () {
    this.setState(() => ({
      showQuestion: false
    }))
  }

  showQuestion () {
    this.setState(() => ({
      showQuestion: true
    }))
  }

  correct () {
    this.setState((prevState) => ({
      correct: prevState.correct + 1,
      questionIndex: prevState.questionIndex + 1,
      showQuestion: true,
    }))
  }

  incorrect () {
    this.setState((prevState) => ({
      incorrect: prevState.incorrect + 1,
      questionIndex: prevState.questionIndex + 1,
      showQuestion: true,
    }))
  }

  render() {
    const { questions, questionIndex, correct, incorrect, showQuestion } = this.state
    return (
      (questionIndex < questions.length) ?
        (<View style={styles.container}>
          <Text style={styles.status}>{questionIndex + 1}/{questions.length}</Text>
          {showQuestion &&
            (<View style={styles.qAndA}>
              <Text style={styles.question}>{questions[questionIndex].question.trim()}?</Text>
              <TextButton
                style={styles.answerBtn}
                onPress={() => this.showAnswer()}>
                Answer
              </TextButton>
            </View>
          )}
          {!showQuestion &&
            (<View style={styles.qAndA}>
              <Text style={styles.question}>{questions[questionIndex].answer}</Text>
              <TextButton
                style={styles.answerBtn}
                onPress={() => this.showQuestion()}>
                Question
              </TextButton>
            </View>
          )}
          <TextButton
            style={styles.correctBtn}
            onPress={() => this.correct()}>
            Correct
          </TextButton>
          <TextButton
            style={styles.incorrectBtn}
            onPress={() => this.incorrect()}>
            Incorrect
          </TextButton>
        </View>)
        : (
          <View style={styles.container}>
            <Text style={styles.score}>Score</Text>
            <Text style={styles.results}>{correct/questions.length * 100}%</Text>
          </View>
        )
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: xiketic,
  },
  correctBtn: {
    backgroundColor: persianGreen,
    color: white,
    width: 200,
    padding: 15,
  },
  incorrectBtn: {
    backgroundColor: tartOrange,
    color: white,
    width: 200,
    padding: 15,
  },
  answerBtn: {
    alignSelf: 'center',
    color: tartOrange,
    borderWidth: 0,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  status: {
    fontSize: 30,
    color: xiketic,
  },
  results: {
    fontSize: 40,
    padding: 10,
    color: persianBlue
  },
  score: {
    fontSize: 60,
    fontWeight: 'bold'
  },
})


function mapStateToProps(state, { route }) {
  const { deckId } = route.params
  // const deck = state[deckId]
  // const questions = deck.questions
  return {
    deckId
  }
}

export default connect(mapStateToProps)(Quiz)