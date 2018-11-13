import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    loadedMeetup (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetup ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          commit('setLoading', false)
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              src: obj[key].src,
              desc: obj[key].desc,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('loadedMeetup', meetups)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', true)
        })
    },
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        desc: payload.desc,
        date: payload.date,
        creatorId: this.getters.user.id
      }
      let imgUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((meet) => {
          key = meet.key
          return key
        })
        .then((key) => {
          const filename = payload.src.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.src)
        })
        .then((fileData) => {
          imgUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({src: imgUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            src: imgUrl,
            id: key
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetup: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
        })
    },
    signIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const me = {
            id: user.user.uid,
            registeredMeetup: []
          }
          commit('setUser', me)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetup: []})
    },
    logOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
