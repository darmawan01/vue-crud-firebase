<template>
  <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm8 offset-sm2>
          <v-card>
             <v-img
              :src="meetup.src"
              height="330px"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h2>{{ meetup.title }} - {{ meetup.location }}</h2>
                <div>
                  <p>{{ meetup.desc }}</p>
                  <p>{{ meetup.date | date }}</p>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">Follow</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>