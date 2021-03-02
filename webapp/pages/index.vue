<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Index</h1>
      <div class="links">
        <nuxt-link to="/example" class="button--grey">Example</nuxt-link>
        <nuxt-link to="/more" class="button--green">More</nuxt-link>
        <nuxt-link to="/more/example" class="button--grey">More Example</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
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
