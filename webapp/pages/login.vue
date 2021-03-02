<template>
  <div class="container">
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="username-group" label="Username" label-for="username-input">
        <b-form-input id="username-input" v-model="form.username" name="username"></b-form-input>
      </b-form-group>
      <b-form-group id="password-group" label="Password" label-for="password-input">
        <b-form-input id="password-input" v-model="form.password" name="password-input"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'test@email.com',
        password: '12345',
      },
    }
  },
  methods: {
    onSubmit() {
      // this.$axios.post('/api/login_check', this.form).then((reponse) => console.log(reponse))
      this.$auth.loginWith('local', { data: this.form })
      // this.$auth.loginWith('cookie', { data: this.form })
    },
  },
}
</script>

<style scoped></style>
