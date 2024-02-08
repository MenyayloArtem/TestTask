import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useMainStore } from '~/store'

// @ts-ignore
export default defineNuxtPlugin(({ $pinia } : any) => {
  return {
    provide: {
      store: useMainStore($pinia)
    }
  }
})
