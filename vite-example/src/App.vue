<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <MEditor
    v-model="value"
    mode="edit"
    @on-change="handleChange"
    @on-fullscreen-change="handleFullScreenChange"
    @on-mode-change="handleModeChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MEditor } from 'vue-next-m-editor'
import 'vue-next-m-editor/dist/index.min.css'

export default defineComponent({
  name: 'App',
  components: {
    MEditor
  },
  setup () {
    const value = ref('# hello world')
    const handleChange = ({ content, htmlContent }: { content: string, htmlContent: string }) => {
      console.log('content', content)
      console.log('htmlContent', htmlContent)
    }
    const handleFullScreenChange = (fullScreen: boolean) => {
      console.log('fullscreenChange', fullScreen)
    }
    const handleModeChange = (newMode: string, oldMode: string) => {
      console.log('newMode', newMode, 'oldMode', oldMode)
    }
    return {
      value,
      handleChange,
      handleFullScreenChange,
      handleModeChange
    }
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
