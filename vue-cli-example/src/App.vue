<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Editor/>
  <div>hello world!!!!</div>
</template>

<script>
import Editor from 'vue-next-m-editor'
import { onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    Editor
  },
  setup () {
    onMounted(() => {
      console.log('mounted')
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
