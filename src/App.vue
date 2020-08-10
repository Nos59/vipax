<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Мой профиль</router-link> |
      <router-link to="/team">Моя команда</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  width: 1000px;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 768px;
  }

  @media screen and (max-width: 480px) {
    width: 480px;
  }

  @media screen and (max-width: 320px) {
    width: 320px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 20px;

    &.router-link-exact-active {
      color: #007bff;
    }
  }
}
</style>
