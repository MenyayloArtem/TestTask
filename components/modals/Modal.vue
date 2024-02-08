<template>
    <div class="modal"
    @click="store.closeModal()"
    >
        <div class="modal__body"
        @click.stop=""
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store';
    const store = useMainStore()
</script>