<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <VueNextMEditor/>
  hello world
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { VueNextMEditor } from 'vue-next-m-editor'

export default defineComponent({
  name: 'App',
  components: {
    VueNextMEditor
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
