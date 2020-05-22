import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'
const NOTIFICATIONS_KEY = 'mobile-flashcards:notifications'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck (id) {
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

function createQuizNotification () {
  return {
    title: 'Take a quiz today!',
    body: "Don't forget to take a quiz today! 🍎",
    ios: {
      sound: true,
    }
  }
}

export function setQuizNotification () {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(16)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createQuizNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearQuizNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}