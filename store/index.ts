import Api from "~/shared/Api"
import type Product from "~/shared/Product"
import Vue from "vue"
import { defineStore } from "pinia"
import type { CartItem, ProductCartItem } from "./cart"

interface State {
    modal : string,
    products : Product[],
    cart : ProductCartItem[]
}

export const useMainStore = defineStore("main", {
    state:() : State => ({
        modal : "",
        products : [],
        cart : []
    }),

    actions : {
        setModal (modal : string) {
            this.modal = modal
        },

        closeModal () {
            this.modal = ""
        },

        changeFavorite (product : Product) {
            let index = this.products.findIndex(c => c.id == product.id)
            if (index > -1) {
                product.favorite = !product.favorite
                Vue.set(this.products,index,product)
            }
        },

        async loadProducts (category : string) {
            let products = await Api.getProducts(category)
            this.products = products
        },
    }
})