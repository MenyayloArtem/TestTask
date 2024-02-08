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

        async loadProducts () {
            let products = await Api.getProducts()
            this.products = products
        },
    }
})



export const state = () : State => ({
    modal : "",
    products : [],
    cart : []
})


export const mutations = {
    openModal (state : State, modal : string) {
        state.modal = modal
    },

    SET_PRODUCTS (state : State, products : Product[]) {
        state.products = products
    },

    ADD_CART_ITEM (state : State, cartItem : ProductCartItem) {
        state.cart.push(cartItem)
    },

    EDIT_CART_ITEM (state : State, cartItem : ProductCartItem) {
        let index = state.cart.findIndex(c => c.product.id == cartItem.product.id)
        if (index > -1) {
            Vue.set(state.cart,index,cartItem)
        }
    },

    DELETE_CART_ITEM (state : State, cartItem : ProductCartItem) {
        let index = state.cart.findIndex(c => c.product.id == cartItem.product.id)
        if (index > -1) {
            state.cart.splice(index,1)
        }
    },

    CHANGE_FAVORITE (state : State, product : Product) {
        let index = state.products.findIndex(c => c.id == product.id)
        if (index > -1) {
            product.favorite = !product.favorite
            Vue.set(state.products,index,product)
        }
    },

}

export const actions = {
    async loadProducts (ctx : any, payload : any) {
        let products = await Api.getProducts()
        ctx.commit("SET_PRODUCTS", products)
    },

    checkCart (ctx : any, payload : ProductCartItem) {
        let productInCart = ctx.state.cart.some((p : ProductCartItem) => p.product.id == payload.product.id)

        if (payload.count) {
            if (!productInCart) {
                console.log("add")
                ctx.commit("ADD_CART_ITEM", payload)
            } else {
                console.log("edit")
                ctx.commit("EDIT_CART_ITEM", payload)
            }
        } else {
            if (productInCart) {
                console.log("delete")
                ctx.commit("DELETE_CART_ITEM", payload)
            }
        }
    },

    getProductCount (ctx : any, product : Product) {
        return ctx.state.cart.find((p : ProductCartItem) => p.product.id == product.id)?.count || 0
    }
}