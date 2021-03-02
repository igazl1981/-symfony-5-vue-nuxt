<template>
  <b-navbar toggleable="lg">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/example">Example</b-nav-item>
        <b-nav-item to="/more">More Index</b-nav-item>
        <b-nav-item to="/more/example">More Example</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-nav v-if="$auth.loggedIn">
      <b-nav-item>{{ $auth.user.username }}</b-nav-item>
      <b-nav-item to="/logout">Logout</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav v-else>
      <b-nav-item to="/login">Login</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {}
</script>
