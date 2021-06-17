import { action, decorate, observable } from "mobx";
import { history } from "../history";
import instanceAPI from './units/instanceAPI';
import axios from "axios";
import moment from "moment"
import cookie from 'react-cookies'

export class CartStore {

    cart = []

    async getCart(){
        try{
            try{
                const res = await instanceAPI.get(`cart/`, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: cookie.load("token"),
                    },
                });
                if(res.data !== null){
                    this.cart = res.data
                }
            }catch(e) {
                console.log(e);
            }
        }catch(e) {
            return false;
        }
    }

    async addToCart(book_id, quantity){
        try{
            try{
                var data = {
                    book_id: book_id,
                    quantity: quantity
                }
                const res = await instanceAPI.post(`cart/`, data, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: cookie.load("token"),
                    },
                });
                if(res.data !== null){
                    await this.getCart()
                }
            }catch(e) {
                console.log(e);
            }
        }catch(e) {
            return false;
        }
    }

    async updateToCart(book_id, quantity){
        try{
            try{
                var data = {
                    book_id: book_id,
                    quantity: quantity
                }
                const res = await instanceAPI.patch(`cart/`, data, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: cookie.load("token"),
                    },
                });
                if(res.data !== null){
                    await this.getCart()
                }
            }catch(e) {
                console.log(e);
            }
        }catch(e) {
            return false;
        }
    }

    async removeFromCart(book_id){
            try{
                const res = await instanceAPI.delete(`cart/${book_id}`,  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: cookie.load("token"),
                    },
                });
                if(res.data !== null){
                    // this.cart = res.data
                    return true
                }
            }catch(e) {
                console.log(e);
                return false;
            }
    }

}

decorate(CartStore, {
    cart: observable,
    getCart: action,
    addToCart: action,
    updateToCart: action,
    removeFromCart: action,
});

export default CartStore;
