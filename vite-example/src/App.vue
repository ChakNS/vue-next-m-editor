<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>hello world!</div>
  <div>hot load!</div>
  <MEditor/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import MEditor from 'vue-next-m-editor'
// import test from 'vue-next-m-editor'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    MEditor
  },
  setup () {
    onMounted(() => {
      console.log('a')
      // const a = test()
      // console.log(a)
    })
  }
})
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
