<template>
  <v-app>
    <v-toolbar dark class="purple darken-1">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Vue Sample 1</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in items" :key="item.title" 
          :to="item.link">
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-navigation-drawer  v-model="drawer" absolute temporary>
      <v-list class="pt-0" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      mini: true,
      right: null
    }
  },
  computed: {
    items () {
      let menu = [
        { title: 'Sign Up', icon: 'face', link: '/signup' },
        { title: 'Sign In', icon: 'lock_open', link: '/signin' }
      ]

      if (this.userisAuthenticated) {
        menu = [
          { title: 'View Meetup', icon: 'supervisor_account', link: '/meetups' },
          { title: 'Organize Meetup', icon: 'room', link: '/meetup/new' },
          { title: 'Profile', icon: 'person', link: '/profile' },
          { title: 'Logout', icon: 'lock' }
        ]
      }

      return menu
    },
    userisAuthenticated () {
      const user = this.$store.getters.user
      return user !== null && user !== undefined
    }
  }
}
</script>

<style lang="stylus">
  @import './theme/main'
</style>