import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import DeckDetails from './DeckDetails'
import { white, xiketic, gray, persianBlue, persianGreen } from '../utils/colors'
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
    <View style={{flex: 1}}>
      <Text style={styles.title}>Flashcard Decks</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 38,
    color: white,
    backgroundColor: persianBlue,
    fontWeight: '400',
    shadowColor: xiketic,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
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
    borderWidth: 2,
    height: 200,
    borderRadius: 5,
  },
  deckTitle: {
    padding: 10,
    fontSize: 36,
    color: persianBlue,
  },
  deckSubtitle: {
    fontSize: 26,
    color: gray
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)