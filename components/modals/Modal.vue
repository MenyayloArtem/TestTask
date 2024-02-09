<template>
    <div class="modal"
    @click="store.closeModal()"
    >
        

        <Transition name="tr">
            <div class="modal__body"
            @click.stop=""
            v-if="ext"
            >
            <slot ></slot>
             </div>
        </Transition>
            
       
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store';
    const store = useMainStore()

    const props = defineProps({
        extended : {
            type : Boolean,
            required : false
        }
    })

    const ext = ref(false)

    onMounted(() => {
        ext.value = true
    })

    const onExtend = () => {
        console.log("extended")
    }
</script>