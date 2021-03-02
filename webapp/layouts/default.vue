<template>
  <div class="container my-container">
    <navigation-top />
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.my-container {
  margin: 0 auto;
  min-height: 100vh;
  align-items: center;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
