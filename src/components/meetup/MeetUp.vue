<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 sm4 v-for="meetup in meetups" :key="meetup.id" class="mr-1 mb-1">
          <v-card>
            <v-img
              :src="meetup.src"
              height="180px"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ meetup.title }} - {{ meetup.location }}</h3>
                <p>{{ meetup.desc }}</p>
                <p>{{ meetup.date | date }}</p>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :to="'/meetup/'+meetup.id">Detail...</v-btn>
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
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>