<template>
    <div class="cartItem">
        <div class="cartItem__img">
            <img src="~/assets/images/ролл ясай 1.png" alt="img">
        </div>
        <div class="cartItem__col info">
            <div class="cartItem__row title">
                <div class="cartItem__title">
                    {{ item.product.name }}
                </div>
                <div class="cartItem__fav" @click="changeFavorite()">
                    <RecolorableHeart :favorite="item.product.favorite" />
                </div>
            </div>
            <div class="cartItem__row desc">
                Листья салата, огурец, перец, помидор, сырный соус, чипсы<br />(190 г)
            </div>
        </div>
        <div class="cartItem__col left">
            <div class="cartItem__row">
                <div class="cartItem__price">
                    <div class="cartItem__priceText">
                        Цена:
                    </div>
                    <div class="cartItem__priceValue">
                        {{ item.product.price }} ₽
                    </div>
                </div>
            </div>
            <div class="cartItem__row counter">
                <div class="countBtn" @click="decrement()">
                    <img src="~/assets/icons/минус 1.svg" alt="minus">
                </div>
                <div class="countValue">
                    {{ item.count }}
                </div>
                <div class="countBtn" @click="increment()">
                    <img src="~/assets/icons/плюс 1.svg" alt="plus">
                </div>
            </div>
            <div class="cartItem__row">
                <div class="cartItem__price">
                    <div class="cartItem__priceText">
                        Сумма:
                    </div>
                    <div class="cartItem__priceValue">
                        {{ item.product.price * item.count }} ₽
                    </div>
                </div>
            </div>
        </div>
        <div class="cartItem__remove">
            <img src="~/assets/icons/trash 1.svg" alt="trash">
        </div>
    </div>
</template>

<script setup lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue/types/v3-component-props'
import { useMainStore } from '~/store';
import { useCartStore, type ProductCartItem } from '~/store/cart';
import RecolorableHeart from './ui/RecolorableHeart.vue';
const props = defineProps({
    item: {
        type: Object as PropType<ProductCartItem>,
        required: true
    }
})

const mainStore = useMainStore()
const cartStore = useCartStore()

const increment = () => cartStore.incrementCount(props.item)
const decrement = () => cartStore.decrementCount(props.item)
const changeFavorite = () => mainStore.changeFavorite(props.item.product)
</script>