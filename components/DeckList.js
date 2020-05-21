import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import DeckDetails from './DeckDetails'
import { white, xiketic, gray, persianBlue } from '../utils/colors'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'

function DeckList ({dispatch, decks, navigation}) {
  useFocusEffect(useCallback(() => {
    getDecks()
    .then((decks) => dispatch(receiveDecks(JSON.parse(decks))))
  }, [getDecks, decks]))

  return (
    <ScrollView>
      {Object.values(decks).map((deck) => (
        <TouchableOpacity
          key={deck.title}
          onPress={() => navigation.navigate('Deck', { deckId: deck.title })}>
          <DeckDetails
            style={styles.deck}
            titleStyle={styles.deckTitle}
            subTitleStyle={styles.deckSubtitle}
            title={deck.title}
            numCards={deck.questions.length} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    backgroundColor: white,
    borderColor: xiketic,
    borderWidth: 1,
    height: 200,
  },
  deckTitle: {
    padding: 10,
    fontSize: 30,
    color: persianBlue,
  },
  deckSubtitle: {
    fontSize: 22,
    color: gray
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)