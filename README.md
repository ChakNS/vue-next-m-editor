# vue-next-m-editor

> A markdown editor with Vue3

![GitHub package.json version](https://img.shields.io/github/package-json/v/hellomrbigshot/vue-next-m-editor)
![GitHub](https://img.shields.io/github/license/hellomrbigshot/vue-next-m-editor)
![node-current](https://img.shields.io/node/v/vue-next-m-editor)

## Install

use npm

```
npm install -S vue-next-m-editor

```

use yarn
```
yarn add vue-next-m-editor
```

> It's peerDependencies includes higlight.js and marked, so make sure you have installed them before you install this package.


## Usage with Vue@next

Use the component

```
<template>
  <MEditor
    v-model="value"
    @on-change="handleChange"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MEditor } from 'vue-next-m-editor'
import 'vue-next-m-editor/dist/index.min.css'
export default defineComponent({
  name: 'Example',
  components: {
    MEditor
  },
  setup () {
    const value = ref('')
    const handleChange = ({ content, htmlContent }: { content: string, htmlContent: string }) => {
      console.log('content', content)
      console.log('htmlContent', htmlContent)
    }
    return {
      value,
      handleChange
    }
  }
})
```

The component also exports ```marked``` function:

```javascript
// The marked funciton will replace
// <code> or <code class="language-*"> tag
// to <code class="hljs">

import { marked } from 'vue-next-m-editor'

let a = '```console.log('hello world')```'
console.log(marked(a)) // <p><code class="hljs">console.log(&#39;hello world&#39;)</code></p>

```

## Preview

[address](https://hellomrbigshot.github.io/vue-next-m-editor)


## Api

### props

| name       | type   | default     | description     |
| ---------- | -------| ----------- | --------------- |
| model-value| string |   -         | value           |
| placeholder| string |   -         | placehoder      |
| mode       | live \| edit \| preview | live      | edit mode |
| full-screen | boolean| false       | full screen     |
| show-line-num| boolean| true        | show side line number |
| theme      | string | light       | light or dark   |
| auto-scroll | boolean| true        | auto sroll or not |
| debounce-render   | boolean | false | debounce render html when edit |
| debounce-render-wait | number | 200 | debounce wait time (ms) |

### events

| event name | description | return value |
| on-change   | callback when editor changes | Object: { content: string, htmlContent: string } | 
| on-mode-change | callback when editor's mode changes | mode: string, one of ['live', 'edit', 'preview']; oldMode, one of ['live', 'edit', 'preview'] | 
| on-fullscreen-change | callback when editor's fullscreen changes |  isFullScreen: boolean |



## License

[MIT Licence](./LICENSE)
