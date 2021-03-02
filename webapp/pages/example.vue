<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Example</h1>
      <div class="links">
        <nuxt-link to="/" class="button--grey">Index</nuxt-link>
        <nuxt-link to="/more" class="button--green">More</nuxt-link>
        <nuxt-link to="/more/example" class="button--green">More example</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
