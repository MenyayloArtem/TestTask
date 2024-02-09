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

                        <img src="~/assets/icons/burger-menu.svg"
                        @click="changeMenu()"
                     alt="menu"
                     
                     >
                    
                    <img src="~/assets/icons/logo-md.svg" alt="logo">
                </div>

                <div class="nav__left-sm">
                    <img src="~/assets/icons/burger-menu.svg" alt="menu"
                    @click="changeMenu()"
                    >
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

        <div class="mobileMenu" v-if="store.modal == 'menu'">
            <div class="mobileMenu__section">
                <div class="mobileMenu__item">Меню</div>
                <div class="mobileMenu__item">Доставка</div>
                <div class="mobileMenu__item">Акции</div>
                <div class="mobileMenu__item">Отзывы</div>
                <div class="mobileMenu__item">Контакты</div>
            </div>

            <div class="mobileMenu__section">
                <div class="mobileMenu__item"
                @click="openCart()"
                >Корзина</div>
                <div class="mobileMenu__item">Войти</div>
            </div>
            
            
        </div>

        <main class="main">
            <div class="main__container">
                <div class="main__title">
                    Меню
                </div>
                <div class="main__tabs">
                    <div class="tab" :class="{active : category == 'rolls'}"
                    @click="category = 'rolls'"
                    >Роллы</div>
                    <div class="tab" :class="{active : category == 'sushi'}"
                    @click="category = 'sushi'"
                    >Суши и гуканы</div>
                    <div class="tab" :class="{active : category == 'sets'}"
                    @click="category = 'sets'"
                    >Сеты</div>
                    <div class="tab" :class="{active : category == 'rise'}"
                     @click="category = 'rise'"
                    >Лапша и рис</div>
                    <div class="tab" :class="{active : category == 'salats'}"
                    @click="category = 'salats'"
                    >Салаты</div>
                    <div class="tab" :class="{active : category == 'hot'}"
                    @click="category = 'hot'"
                    >Горячие блюда</div>
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
@use "~/assets/scss/styles/mobileMenu.scss";
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive, ref, onMounted } from 'vue';
import ShoppingCartModal from '~/components/modals/ShoppingCartModal.vue';
import { useMainStore } from '~/store';
import ProductCard from '~/components/ProductCard.vue';

const category = ref("rise")

const store = useMainStore()

const { products, cart } = storeToRefs(store)

const openCart = () => {
    store.setModal("shoppingCart")
}

const changeMenu = () => {
    if (!store.modal) {
        store.setModal("menu")
    } else {
        store.closeModal()
    }
}

watch(() => category.value, () => {
    store.loadProducts(category.value)
})

onMounted(async () => {
    await store.loadProducts(category.value)
})
</script>
