<template>
  <div>
    <v-alert v-model="alert" dismissible type="error" @input="onDissmissed">
      {{ msg }}
    </v-alert>
  </div>
</template>

<script>
  export default {
    props: ['msg'],
    data () {
      return {
        alert: true
      }
    },
    methods: {
      onDissmissed () {
        this.$emit('dissmised')
      }
    }
  }
</script>