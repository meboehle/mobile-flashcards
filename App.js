import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { white, persianBlue } from './utils/colors'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import { setQuizNotification } from './utils/api'


const Tab = createBottomTabNavigator()

const TabNav = () => (
  <Tab.Navigator
    initialRouteName='DeckList'
    screenOptions={({ route }) => ({
      tabBarIcon: ({color, size}) => {
        let icon;
        if (route.name === 'New Deck') {
          icon = (
            <Entypo name='squared-plus' size={size} color={color} />
          )
        } else if (route.name === 'Decks') {
          icon = (
            <Ionicons name='ios-photos' size={size} color={color} />
          )
        }
        return icon
      }
    })}
    tabBarOptions={{
      activeTintColor: persianBlue,
      style: {
        height: 50,
        backgroundColor: white,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
      }
    }}>
    <Tab.Screen name='Decks' component={DeckList}/>
    <Tab.Screen name='New Deck' component={AddDeck} />
  </Tab.Navigator>
)

const Stack = createStackNavigator()
const MainNav = () => (
  <Stack.Navigator headerMode='screen'>
    <Stack.Screen
      name='Decks'
      component={TabNav}
      options={{headerShown: false}} />
    <Stack.Screen
      name='Deck'
      component={Deck}
      options={{
        headerTintColor: persianBlue,
        headerStyle: {
          backgroundColor: white,
        },
      }} />
    <Stack.Screen
      name='Add Card'
      component={AddCard}
      options={{
        headerTintColor: persianBlue,
        headerStyle: {
          backgroundColor: white,
        }
      }} />
    <Stack.Screen
      name='Quiz'
      component={Quiz}
      options={{
        headerTintColor: persianBlue,
        headerStyle: {
          backgroundColor: white,
        },
      }} />
  </Stack.Navigator>
)

export default class App extends Component {
  componentDidMount () {
    setQuizNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <StatusBar barStyle='dark-content' />
            <MainNav />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
