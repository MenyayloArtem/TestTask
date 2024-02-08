import { defineStore } from "pinia";
import Vue from "vue";
import type Product from "~/shared/Product";

export interface CartItem<T> {
    product : T,
    count : number
}

export type ProductCartItem = CartItem<Product>

interface State {
    cart : ProductCartItem[]
}

export const useCartStore = defineStore("cart", {
    state : () : State => ({
        cart : []
    }),

    getters : {
        productsSum () : any {
            return this.cart.reduce((a,b) => a + b.product.price * b.count, 0)
        }
    },

    actions : {
        addItem(item : Product) {
            this.cart.push({
                product : item,
                count : 1
            })
        },

        editItem (cartItem : ProductCartItem) {
            let index = this.cart.findIndex(c => c.product.id == cartItem.product.id)
            if (index > -1) {
                Vue.set(this.cart,index,cartItem)
            }
        },
    
        deleteItem (cartItem : ProductCartItem) {
            let index = this.cart.findIndex(c => c.product.id == cartItem.product.id)
            if (index > -1) {
                this.cart.splice(index,1)
            }
        },

        findItemByProductId (product : Product) {
            let item = (this.cart.find((c: any) => c.product.id == product.id) || null) as ProductCartItem | null
            return item
        },

        incrementCount (cartItem : ProductCartItem) {
            this.checkCart({
                product : cartItem.product,
                count : cartItem.count + 1 
            })
        },
        
        decrementCount (cartItem : ProductCartItem) {
            this.checkCart({
                product : cartItem.product,
                count : cartItem.count - 1 
            })
        },

        checkCart (item : ProductCartItem) {
            let productInCart = this.cart.some((p : ProductCartItem) => p.product.id == item.product.id)
    
            if (item.count) {
                this.editItem(item)
            } else {
                if (productInCart) {
                    this.deleteItem(item)
                }
            }
        }
    }
})