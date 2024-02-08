<template>
    <div class="card" :class="selected && 'selected'">
        <div class="card__fav" @click="changeFavorite()">
            <recolorable-heart :color="count ? 'white' : 'black'" :favorite="favorite" />
        </div>
        <div class="card__main">

            <div class="card__image">
                <div class="figure"></div>
                <img src="~/assets/images/ролл ясай 1.png" />
            </div>
            <div class="card__row r1">
                <div class="card__name">
                    {{ product.name }}
                </div>
                <span class="card__smallText">
                    185г
                </span>
            </div>
            <div class="card__description">
                {{ product.recipe }}
            </div>

        </div>
        <div class="card__row r2">
            <div class="card__price">
                {{ product.price }} P
            </div>

            <div v-if="selected" class="card__selectCount">
                <div class="countBtn" @click="decrementCount()">
                    <img src="~/assets/icons/minus.svg" alt="minus">
                </div>
                <div class="countValue">
                    {{ count }}
                </div>
                <div class="countBtn" @click="incrementCount()">
                    <img src="~/assets/icons/plus.svg" alt="plus">
                </div>
            </div>

            <button v-else class="card__btn" @click="addToCart()">
                В Корзину
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import RecolorableHeart from './ui/RecolorableHeart.vue';
import type Product from '~/shared/Product'
import { useCartStore } from "~/store/cart"
import { useMainStore } from "~/store/index"

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    }
})

const mainStore = useMainStore()
const cartStore = useCartStore()

const cartItem = computed(() => cartStore.findItemByProductId(props.product))
const count = computed(() => cartItem.value?.count || 0)
const selected = computed(() => Boolean(cartItem.value))
const favorite = computed(() => props.product.favorite)

const addToCart = () => cartStore.addItem(props.product)
const incrementCount = () => cartStore.incrementCount(cartItem.value!)
const decrementCount = () => cartStore.decrementCount(cartItem.value!)
const changeFavorite = () => mainStore.changeFavorite(props.product)
</script>