<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      this.$toast.error(value)
    }
  }
}
</script>
