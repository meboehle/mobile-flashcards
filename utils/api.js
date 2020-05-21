import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[id]
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      'questions': []
    }
  }))
}

export function addCardToDeck (title, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[title]
      const questions = deck.questions
      questions.push(card)
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: data[title]
      }))
    })
}