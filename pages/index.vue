<template>
    <div class="app">
        <ShoppingCartModal />
        <!-- @@include("./components/blocks/header.html", {}) -->
        <nav class="nav">
            <div class="nav__container">
                <div class="nav__left-lg">
                    <img class="logo" src="~/assets/icons/logo-elipse.png" alt="logo">
                </div>

                <div class="nav__left-md">
                    <img src="~/assets/icons/burger-menu.svg" alt="menu">
                    <img src="~/assets/icons/logo-md.svg" alt="logo">
                </div>

                <div class="nav__left-sm">
                    <img src="~/assets/icons/burger-menu.svg" alt="menu">
                </div>

                <img class="logo-sm" src="~/assets/icons/logo-md.svg" alt="logo">

                <ul class="nav__items">
                    <li class="nav__item">Меню</li>
                    <li class="nav__item">Доставка</li>
                    <li class="nav__item">Акции</li>
                    <li class="nav__item">Отзывы</li>
                    <li class="nav__item">Контакты</li>
                </ul>

                <div class="telephone">
                    <img src="~/assets/icons/phone.svg" alt="">
                    <span>
                        8 800 555 35 35
                    </span>

                </div>

                <div class="nav__right">
                    <div class="nav__cart" @click="openCart()">
                        <img src="~/assets/icons/icon-cart.svg" alt="">
                    </div>
                    <button class="nav__login">
                        Войти
                    </button>
                </div>
            </div>
        </nav>

        <main class="main">
            <div class="main__container">
                <div class="main__title">
                    Меню
                </div>
                <div class="main__tabs">
                    <div class="tab">Роллы</div>
                    <div class="tab">Суши и гуканы</div>
                    <div class="tab">Сеты</div>
                    <div class="tab active">Лапша и рис</div>
                    <div class="tab">Салаты</div>
                    <div class="tab">Горячие блюда</div>
                </div>

                <div class="main__cards">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </div>
            </div>
        </main>
        <footer class="footer">

        </footer>
    </div>
</template>

<style lang="scss">
@use "~/assets/scss/styles/index.scss";
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive, ref, onMounted } from 'vue';
import ShoppingCartModal from '~/components/modals/ShoppingCartModal.vue';
import { useMainStore } from '~/store';
import ProductCard from '~/components/ProductCard.vue';

const store = useMainStore()

const { products, cart } = storeToRefs(store)

const openCart = () => {
    store.setModal("shoppingCart")
}

onMounted(async () => {
    await store.loadProducts()
})
</script>
