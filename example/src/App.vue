<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MEditor v-model="value"></MEditor>
</template>

<script>
import { MEditor } from 'vue-next-m-editor'
import 'vue-next-m-editor/dist/index.min.css'

export default {
  name: 'App',
  components: {
    MEditor
  },
  data () {
    return {
      value: '# hello world'
    }
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
