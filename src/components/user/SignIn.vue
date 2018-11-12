<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm4 offset-sm4>
        <my-alert @dissmised="onDissmissed" :msg="error.message"></my-alert>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>
        <form>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            type="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-flex mt-2>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="info"
              @click="submit"
            >
              Login
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required },
      password: { required }
    },

    data: () => ({
      email: '',
      password: ''
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.required && errors.push('Email is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      submit () {
        this.$v.$touch()

        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.$store.dispatch('signIn', {email: this.email, password: this.password})
        }
      },
      onDissmissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>