<template>
    <Modal v-if="modal == 'shoppingCart'"
    :extended="extended"
    >
        <div class="modal__inner" v-if="step == 'viewOrder'">
            <div class="modal__title">Корзина</div>
                <div class="modal__content cartItems">
                    <ShoppingCartItem 
                    v-for="cartItem in cart"
                    :key="cartItem.product.id"
                    :item="cartItem"
                    />

                    <div class="cartItems__empty" v-if="!cartStore.cart.length">
                        Пусто
                    </div>
                </div>
                <div class="modal__bottom">
                    <div class="cart__totalSum">
                        Общая сумма {{ totalSum }} ₽
                    </div>
                    <div class="cart__text">
                        Сумма заказа для доставки курьером должна составлять не менее 500 ₽
                    </div>
                    <div class="cart__buttons">
                        <div class="btn"
                        @click="store.closeModal()"
                        >
                            Вернуться к покупкам
                        </div>
                        <div class="btn brown"
                        :class="{disabled : !cartStore.cart.length}"
                        @click="step='makeOrder'"
                        >
                            Оформить заказ
                        </div>
                    </div>
                    
                </div>
        </div>


        <div class="modal__inner" v-if="step=='makeOrder'">
            <div class="modal__title sm">
                Оформление заказа
            </div>
            <div class="modal__content">
                <div class="createOrder">
                    <div class="createOrder__block">
                        <div class="createOrder__title">
                            <div class="before">
                                1
                            </div>
                            <div class="text">
                                Способ доставки
                            </div>
                        </div>

                        <div class="createOrder__radios">
                            <RadioVue
                            :text="'Курьер'"
                            :onChange="() => setShippingMethod(1)"
                            :defaultSelected="order.shippingMethod == 1"
                            :unavailable="true"
                            >
                            <template v-slot:icon>
                                <img src="~/assets/icons/delivery.svg" alt="check">
                            </template>
                            <template v-slot:after>
                                <div class="red">
                                    Временно недоступно
                                </div>
                            </template>
                            </RadioVue>

                            <RadioVue
                            :text="'Самовывоз'"
                            :defaultSelected="order.shippingMethod == 2"
                            :onChange="() => setShippingMethod(2)"
                            >
                            <template v-slot:icon>
                                <img src="~/assets/icons/shopping-bag (3) 2.svg" alt="bag">
                            </template>
                            <template v-slot:after>
                                <div class="blue">
                                        Скидка -10%<br />
                                        <span class="small">
                                            на стоимость покупки
                                        </span>
                                    </div>
                            </template>
                            </RadioVue>
                        </div>

                        
                        


                    </div>
                    <div class="createOrder__block">
                        <div class="createOrder__title">
                            <div class="before">
                                2
                            </div>
                            <div class="text">
                                Данные для доставки
                            </div>
                        </div>
                        <div class="createOrder__form">
                            <VueInput
                            :placeholder="'Имя'"
                            :warn="Boolean(v$.name.$error)"
                            v-model.trim="form.name"
                            :validator="v$.name"
                            >
                                <template v-slot:before>
                                    <img src="~/assets/icons/icon-user.svg" alt="phone">
                                </template>
                            </VueInput>

                            <VueInput
                            :placeholder="'Телефон'"
                            :warn="Boolean(v$.phone.$error)"
                            v-model.trim="form.phone"
                            :validator="v$.phone"
                            >
                                <template v-slot:before>
                                    <img src="~/assets/icons/icon-phone.svg" alt="phone">
                                </template>
                            </VueInput>

                            <VueInput
                            :placeholder="'Дополнительная информация'"
                            :warn="Boolean(v$.additional.$error)"
                            v-model.trim="v$.additional.$model"
                            :validator="v$.additional"
                            >
                                <template v-slot:before>
                                    <img src="~/assets/icons/icon-additional-information.svg" alt="phone">
                                </template>
                            </VueInput>

                        </div>
                    </div>
                    <div class="createOrder__block">
                        <div class="totalInfo">
                            <div class="totalInfo__items">
                                <div class="totalInfo__item">
                                    <div class="totalInfo__name">
                                        Стоимость товаров
                                    </div>
                                    <div class="totalInfo__price">
                                        {{ productsSum }} ₽
                                    </div>
                                </div>
                            </div>

                            <div class="totalInfo__item" v-if="order.shippingMethod == 1">
                                    <div class="totalInfo__name">
                                        Услуги курьера
                                    </div>
                                    <div class="totalInfo__price">
                                        500 ₽
                                    </div>
                                </div>
                            </div>

                            <div class="totalInfo__total">
                                <div class="totalInfo__item">
                                    <div class="totalInfo__name">
                                        К оплате
                                    </div>
                                    <div class="totalInfo__price">
                                        {{ totalSum }} ₽
                                    </div>
                                </div>
                            </div>

                            <button class="btn" @click="submitForm()">
                                Купить и оплатить
                            </button>
                            <div class="totalInfo__bottom">
                                Создавая заказ, вы соглашаетесь с политикой 
                                <a href="#">обработки персональных данных</a>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
       
    <div class="shoppingCart__nav" v-if="cartStore.cart.length">
        <div class="item" :class="{active : step == 'viewOrder'}" @click="step = 'viewOrder'"></div>
        <div class="item" :class="{active : step == 'makeOrder'}" @click="step ='makeOrder'"></div>
    </div>

            
    </Modal>
</template>

<script setup lang="ts">
import Vue, { reactive, ref, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, between, numeric, helpers } from 'vuelidate/lib/validators'
import { useMainStore } from '~/store'
import Modal from './Modal.vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/store/cart'
import VueInput from '../ui/Input.vue'
import RadioVue from '../ui/Radio.vue'
const step = ref('viewOrder')
const extended = ref(false)

const store = useMainStore()
const cartStore = useCartStore()

const { cart } = storeToRefs(cartStore)
const { modal } = storeToRefs(store)

const emit = defineEmits(["extend"])

const form = reactive({
    name : "",
    phone : "",
    additional : ""
})

const formRules = {
    name : {required},
    phone : {required, numeric},
    additional : {required : false}
}

const order = reactive({
    shippingMethod : 2
})

const v$ = useVuelidate(formRules, form)

const productsSum = computed(() => cartStore.productsSum)
const totalSum = computed(() => productsSum.value + (order.shippingMethod == 1 ? 500 : 0))

const setShippingMethod = (m : number) => {
    order.shippingMethod = m
}

const submitForm = () => {
    v$.value.$touch()
    if (v$.value.$invalid) {
        alert("Invalid")
    } else {
        alert("Form submited!")
    }
}
</script>