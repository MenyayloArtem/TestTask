<template>
  <div class="createOrder__radio radio" :class="{ unavailable: unavailable }">
    <div class="radio__orb" :class="{ selected: isSelected }" @click="change">
      <img v-if="isSelected" src="~/assets/icons/icon-check-mark.svg" alt="check" />
    </div>
    <div class="radio__icon">
      <slot name="icon"></slot>
    </div>
    <div class="radio__text">{{ text }}</div>
    <div class="radio__after">
      <slot name="after"></slot>
    </div>
  </div>
</template>
  
<script setup lang="ts">
/* __placeholder__ */
import { computed, type PropType } from 'vue'

const props = defineProps({
  defaultSelected: Boolean,
  unavailable: {
    type: Boolean,
    required: false,
  },
  text: String,
  onChange: {
    type: Function as PropType<((selected?: boolean) => void) | undefined>,
    required: false,
  },
})

const data = () => ({
  selected: props.defaultSelected,
})

const change = () => {
  // this.selected = !this.selected
  if (props.onChange && !props.unavailable) {
    props.onChange()
  }
}

const isSelected = computed(() => (props.defaultSelected ? 'selected' : ''))
</script>
  