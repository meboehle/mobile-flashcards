import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { gray, white, persianBlue, xiketic } from '../utils/colors'
import DeckDetails from './DeckDetails'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { useFocusEffect } from '@react-navigation/native'

const addCard = (navigation, deckId) => {
  navigation.navigate('Add Card', { deckId: deckId })
}

const startQuiz = (navigation, deckId, numCards) => {
  if (numCards > 0) navigation.navigate('Quiz', { deckId: deckId })
}

function Deck ({dispatch, deckId, decks, navigation}) {
  useFocusEffect(useCallback(() => {
    getDecks()
    .then((decks) => {
      dispatch(receiveDecks(JSON.parse(decks)))
    })
  }, [getDecks, decks]))

  const deck = decks[deckId]
  return (
    <View style={styles.container}>
      <DeckDetails
        style={styles.deck}
        titleStyle={styles.title}
        subTitleStyle={styles.subtitle}
        title={deck.title}
        numCards={deck.questions.length} />
      <TextButton
        style={styles.addBtn}
        onPress={() => addCard(navigation, deckId)}>
        Add Card
      </TextButton>
      <TextButton
        style={deck.questions.length > 0 ? styles.startBtn : styles.disabledBtn}
        activeOpacity={deck.questions.length === 0 ? 1 : 0.7}
        onPress={() => startQuiz(navigation, deckId, deck.questions.length)}>
        Start Quiz
      </TextButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deck: {
    margin: 10,
    padding: 20,
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    padding: 10,
    color: xiketic,
  },
  subtitle: {
    fontSize: 40,
    textAlign: 'center',
    color: gray
  },
  addBtn: {
    backgroundColor: white,
    color: persianBlue,
    borderColor: persianBlue,
    borderWidth: 1,
  },
  startBtn: {
    backgroundColor: persianBlue,
    color: white,
  },
  disabledBtn: {
    backgroundColor: persianBlue,
    opacity: 0.3,
    color: white
  }
})

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params
  return {
    deckId,
    decks
  }
}

export default connect(mapStateToProps)(Deck)