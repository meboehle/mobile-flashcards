import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
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
    bounceValue: new Animated.Value(1),
    fadeValue: new Animated.Value(1)
  }

  componentDidMount () {
    getDeck(this.props.deckId).then((deck) => {
      this.setState(() => ({
        questions: deck.questions
      }))
    })
  }

  showAnswer () {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start()

    this.setState(() => ({
      showQuestion: false
    }))
  }

  showQuestion () {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start()

    this.setState(() => ({
      showQuestion: true
    }))
  }

  correct () {
    const { bounceValue, fadeValue } = this.state
    Animated.sequence([
      Animated.timing(fadeValue, { toValue: 0, duration: 10 }),
      Animated.parallel([
        Animated.timing(fadeValue, { toValue: 1, duration: 1000, delay: 200 }),
        Animated.spring(bounceValue, { toValue: 1, friction: 4, delay: 900 })
      ])
    ]).start()

    this.setState((prevState) => ({
      correct: prevState.correct + 1,
      questionIndex: prevState.questionIndex + 1,
      showQuestion: true,
    }))
  }

  incorrect () {
    const { bounceValue, fadeValue } = this.state
    Animated.sequence([
      Animated.timing(fadeValue, { toValue: 0, duration: 10 }),
      Animated.parallel([
        Animated.timing(fadeValue, { toValue: 1, duration: 1000, delay: 200 }),
        Animated.spring(bounceValue, { toValue: 1, friction: 4, delay: 900 })
      ])
    ]).start()

    this.setState((prevState) => ({
      incorrect: prevState.incorrect + 1,
      questionIndex: prevState.questionIndex + 1,
      showQuestion: true,
    }))
  }

  render() {
    const { questions, questionIndex, correct, showQuestion, bounceValue, fadeValue } = this.state
    return (
      (questionIndex < questions.length) ?
        (<View style={styles.container}>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              {questionIndex + 1}/{questions.length}
            </Text>
          </View>
          {showQuestion &&
            (<Animated.View style={[styles.qAndA, { transform: [{ scale: bounceValue }]}, { opacity: fadeValue }]}>
              <Text style={styles.question}>{questions[questionIndex].question.trim()}?</Text>
              <TextButton
                style={styles.answerBtn}
                onPress={() => this.showAnswer()}>
                Answer
              </TextButton>
            </Animated.View>
          )}
          {!showQuestion &&
            (<Animated.View style={[styles.qAndA, { transform: [{ scale: bounceValue }]}, { opacity: fadeValue }]}>
              <Text style={styles.question}>{questions[questionIndex].answer}</Text>
              <TextButton
                style={styles.answerBtn}
                onPress={() => this.showQuestion()}>
                Question
              </TextButton>
            </Animated.View>
          )}
          <View style={styles.btnContainer}>
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
          </View>
        </View>)
        : (
          <View style={styles.container}>
            <Text style={styles.score}>Score</Text>
            {correct/questions.length === 1 ?
              <Text style={styles.hundred}>💯</Text> :
              <Text style={styles.results}>
                {Number(correct/questions.length * 100).toFixed(1)}%
              </Text>
            }
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
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: xiketic,
    paddingTop: 10,
  },
  correctBtn: {
    backgroundColor: persianGreen,
    color: white,
    width: 200,
    padding: 12,
  },
  incorrectBtn: {
    backgroundColor: tartOrange,
    color: white,
    width: 200,
    padding: 12,
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  answerBtn: {
    alignSelf: 'center',
    color: tartOrange,
    borderWidth: 0,
    fontWeight: 'bold',
  },
  status: {
    padding: 15,
    fontSize: 30,
    color: xiketic,
    textAlign: 'center'
  },
  statusContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  results: {
    fontSize: 60,
    padding: 10,
    color: persianBlue
  },
  hundred: {
    fontSize: 100,
    padding: 20,
  },
  score: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  qAndA: {
    flex: 4,
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 15,
    borderWidth: 5,
    margin: 5,
    marginBottom: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderEndColor: persianBlue,
    borderBottomColor: persianBlue,
    borderStartColor: 'rgba(59, 40, 204, 0.7)',
    borderTopColor: 'rgba(59, 40, 204, 0.7)',
    width: '90%',
    backgroundColor: white,
    shadowColor: xiketic,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  }
})


function mapStateToProps(state, { route }) {
  const { deckId } = route.params
  return {
    deckId
  }
}

export default connect(mapStateToProps)(Quiz)