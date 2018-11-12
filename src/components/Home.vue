<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm6>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
            v-if="loading"
          ></v-progress-circular>
        </v-flex>
    </v-layout>
    <v-layout row v-if="loading === false">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-carousel>
            <v-carousel-item
              v-for="item in meetups"
              :key=item.id
              :src="item.src"
              @click="showMeetup(item.id)"
            ></v-carousel-item>
          </v-carousel>

          <v-card-title primary-title>
            <div>
              <div>Let's Join the event !</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Follow</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featureMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    showMeetup (id) {
      this.$router.push('/meetup/' + id)
    }
  }
}
</script>