
import { defineComponent, toRefs, ref, Ref, watch, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue'
import ToolBar from './ToolBar'
import Column from './Column'
import { config } from '../assets/js/config'
import hljs from 'highlight.js'
import markedFun from 'marked'
import { throttle, debounce } from 'lodash-es'

markedFun.setOptions({
  renderer: new markedFun.Renderer(),
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  headerIds: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const betterMarked = (str: string) => { // replace <code> tags to <code class="hljs">
  return markedFun(str).replace(/<code( class="language-[A-Za-z]*")?>/g, '<code class="hljs">')
}

export const marked = betterMarked

import '../assets/css/editor.scss'
import '../assets/css/preview.scss'
import '../assets/css/solarized-light.scss'
export const MEditor = defineComponent({
  name: 'VueNextMEditor',
  components: {
    ToolBar,
    Column
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    showLineNum: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'live',
      validator: (value: string) => ['live', 'edit', 'preview'].includes(value)
    },
    theme: {
      type: String,
      default: 'light',
      validator: (value: string) => ['light', 'dark'].includes(value)
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    debounceRender: {
      type: Boolean,
      default: true
    },
    debounceRenderWait: {
      type: Number,
      default: 200
    }
  },
  setup (props, { emit }) {
    const { showLineNum, placeholder, autoScroll, debounceRenderWait, debounceRender } = toRefs(props)
    const iconLength = ref(config.length)
    const columnsLength = ref(1)
    const mode = ref(props.mode)
    const theme = ref(props.theme)
    const fullScreen = ref(props.fullScreen)
    const value = computed({
      get: () => props.modelValue,
      set: (_value) => {
        emit('update:modelValue', _value)
      }
    })
    const markedHtml = ref('')
    const scrollType = ref('edit')
    const mEditor: Ref<HTMLDivElement | null> = ref(null)
    const mTextarea: Ref<HTMLTextAreaElement | null> = ref(null)
    const editWrapper: Ref<HTMLDivElement | null> = ref(null)
    const previewWrapper: Ref<HTMLDivElement | null> = ref(null)
    const inputPre: Ref<HTMLDivElement | null> = ref(null)

    const setHtml = (_value: string) => {
      if (debounceRender.value) {
        debounceMarked(_value)
      } else {
        markedHtml.value = betterMarked(_value)
      }
    }
    const handleModeChange = (_mode: string, oldMode: string) => {
      mode.value = _mode
      emit('on-mode-change', _mode, oldMode)
    }
    const handleFullScreenChange = (_fullScreen: boolean) => {
      fullScreen.value = _fullScreen
      emit('on-fullscreen-change', _fullScreen)
    }
    const debounceMarked = debounce((value) => {
      markedHtml.value = betterMarked(value)
    }, debounceRenderWait.value)
    const handleScroll = autoScroll.value ? throttle(() => { // scroll
      const editWrapperMaxScrollTop = editWrapper.value!.scrollHeight - editWrapper.value!.clientHeight
      const previewWrapperMaxScrollTop = previewWrapper.value!.scrollHeight - previewWrapper.value!.clientHeight
      if (scrollType.value === 'edit') {
        previewWrapper.value!.scrollTop = (editWrapper.value!.scrollTop / editWrapperMaxScrollTop) * previewWrapperMaxScrollTop
      } else if (scrollType.value === 'preview') {
        editWrapper.value!.scrollTop = (previewWrapper.value!.scrollTop / previewWrapperMaxScrollTop) * editWrapperMaxScrollTop
      }
    }, 200) : undefined

    const handleAppendContent = (str: string) => { // append content
      const pos = mTextarea.value!.selectionStart || 0
      if (pos > -1) {
        value.value = `${value.value.slice(0, pos)}${str}${value.value.slice(pos)}`
        mTextarea.value!.blur()
        setTimeout(() => {
          mTextarea.value!.selectionStart = pos + str.length
          mTextarea.value!.selectionEnd = pos + str.length
          mTextarea.value!.focus()
        })
      }
    }
    const handleResize = () => { // resize
      const width = mEditor.value!.clientWidth
      let _length: number = 0
      if (width > 780) {
        _length = config.length
      } else if (width > 680) {
        _length = config.length - 3
      } else if (width > 640) {
        _length = config.length - 6
      } else if (width > 500) {
        _length = 0
        mode.value = 'edit'
      }
      iconLength.value = _length
      getColumnLines()
    }
    const handleThrottleResize = throttle(handleResize, 300)
    const getColumnLines = () => { // get column length
      const textareaHeight = inputPre.value!.scrollHeight
      const length = Math.max(value.value.split('\n').length, (textareaHeight - 20) / 30)
      columnsLength.value = length
    }

    const handleKeyPress = (e: KeyboardEvent) => { // key press event
      const TABKEY = 'Tab'
      if (e.code === TABKEY) { // tab event
        handleAppendContent('    ')
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    }

    watch([fullScreen, mode], () => {
      setTimeout(() => {
        getColumnLines()
      }, 200)
    })

    watchEffect(() => {
      setTimeout(() => {
        getColumnLines()
      }, 200)
      emit('on-change', { content: value.value, htmlContent: betterMarked(value.value) })
      setHtml(value.value)
    })

    onMounted(() => {
      window.addEventListener('resize', handleThrottleResize)
      handleResize()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleThrottleResize)
    })

    return () => (
      <div
        ref={mEditor}
        class={['editor', `${theme.value}-editor`, fullScreen.value && 'editor-fullscreen']}
      >
        <ToolBar
          iconLength={iconLength.value}
          mode={mode.value}
          full-screen={fullScreen.value}
          onMode-change={handleModeChange}
          onFullscreen-change={handleFullScreenChange}
          onAppend-content={handleAppendContent}
        />
        <div class='editor-content'>
          <div
            class={['editor-content-edit', mode.value === 'edit' && 'active', mode.value === 'preview' && 'inactive']}
            ref={editWrapper}
            onMouseenter={() => { scrollType.value = 'edit' }}
            onScroll={handleScroll}
          >
            <div class='editor-content-edit-block'>
              {
                showLineNum.value
                  ? <Column length={columnsLength.value} />
                  : ''
              }
              <div class='editor-content-edit-input'>
                <div ref={inputPre}>{value.value.replace(/\n$/, '\n ')}</div>
                <textarea
                  ref={mTextarea}
                  v-model={value.value}
                  placeholder={placeholder.value}
                  onKeydown={handleKeyPress}
                />
              </div>
            </div>
          </div>
          <div
            class={['editor-content-preview', mode.value === 'preview' && 'active', mode.value === 'edit' && 'inactive']}
            ref={previewWrapper}
            onMouseenter={() => scrollType.value = 'preview'}
            onScroll={handleScroll}
          >
            <div class='m-editor-preview' innerHTML={markedHtml.value} />
          </div>
        </div>
      </div>
    )
  }
})
