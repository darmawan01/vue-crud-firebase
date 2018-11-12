<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm3>
        <form>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="10"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="location"
            :error-messages="locationErrors"
            label="Location"
            required
            @input="$v.location.$touch()"
            @blur="$v.location.$touch()"
          ></v-text-field>
          <v-flex>
            <img :src="src" height="300" width="100%">
            <v-text-field
              v-model="src"
              :error-messages="srcErrors"
              label="Image URL"
              required
              @input="$v.src.$touch()"
              @blur="$v.src.$touch()"
            ></v-text-field>
          </v-flex>
          <v-textarea
            v-model="desc"
            :error-messages="descErrors"
            label="Describtion"
            required
            multi-line=""
            @input="$v.desc.$touch()"
            @blur="$v.desc.$touch()"
          ></v-textarea>

          <v-layout row wrap>
            <v-flex xs12>
              <v-menu
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Event Date"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menus"
                :nudge-right="40"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="time"
                  label="Event Time"
                  readonly
                ></v-text-field>
                <v-time-picker
                  v-if="menus"
                  v-model="time"
                  full-width
                  @change="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-flex mt-2>
            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      title: { required, maxLength: maxLength(20) },
      location: { required },
      src: { required },
      desc: { required },
      date: {required}
    },

    data: () => ({
      title: '',
      location: '',
      src: '',
      desc: '',
      date: new Date().toISOString().substr(0, 10),
      time: null,
      menu: false,
      menus: false
    }),

    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.maxLength && errors.push('Title must be at most 20 characters long')
        !this.$v.title.required && errors.push('Title is required.')
        return errors
      },
      locationErrors () {
        const errors = []
        if (!this.$v.location.$dirty) return errors
        !this.$v.location.required && errors.push('Location is required.')
        return errors
      },
      srcErrors () {
        const errors = []
        if (!this.$v.src.$dirty) return errors
        !this.$v.src.required && errors.push('Img URL is required.')
        return errors
      },
      descErrors () {
        const errors = []
        if (!this.$v.desc.$dirty) return errors
        !this.$v.desc.required && errors.push('Desctibtion is required.')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        const meetup = {
          title: this.title,
          location: this.location,
          src: this.src,
          desc: this.desc,
          date: this.date + ' ' + this.time
        }

        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.$store.dispatch('createMeetup', meetup)
          this.$router.push('/meetups')
        }
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.location = ''
        this.src = ''
        this.desc = ''
      }
    }
  }
</script>