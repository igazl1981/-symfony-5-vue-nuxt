<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">More index</h1>
      <div class="links">Message: {{ message }}</div>
      <div class="links">
        <nuxt-link to="/" class="button--grey">Index</nuxt-link>
        <nuxt-link to="/example" class="button--green">Example</nuxt-link>
        <nuxt-link to="/more/example" class="button--green">More example</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  async fetch() {
    this.message = (await this.$axios.$get('/api/message')).message
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
