<template>
  <div class="createOrder__input formInput" :class="{ required: warn }">
    <div class="formInput__before">
      <slot name="before"></slot>
    </div>
    <!-- ts-ignore -->
    <input type="text" class="formInput__body" :placeholder="placeholder" @input="onInputHandler($event)"
      :value="value" />
    <div class="formInput__bottom">{{ warnMessage }}</div>
  </div>
</template>
  
<script setup lang="ts">
import { type PropType, watch, computed } from 'vue'

const props = defineProps({
  warn: Boolean,
  placeholder: String,
  onInput: Function as PropType<(value: string) => void>,
  value: String,
  validator: Object,
})

const emit = defineEmits(["input"])

const onInputHandler = (e: any) => {
  emit('input', e.target.value)
}

const warnMessage = computed(() => {
  if (props.validator?.required?.$invalid) {
    return 'Это поле необходимо заполнить'
  }

  if (props.validator?.numeric?.$invalid) {
    return 'Некорректное значение'
  }

  return ''
})
</script>
  