import { action, decorate, observable } from "mobx";
import { history } from "../history";
import instanceAPI from './units/instanceAPI';
import cookie from 'react-cookies'

export class BookStore {

    book_list = []
    book_list_new = []
    book_list_best_seller = []
    book_list_on_sale = []
    book_list_recommend = []
    book_detail = {
        book_id: null,
        book_name: "",
        book_desc: "",
        unit_price: 0,
        discount: 0,
        create_at: "",
        disable: "false",
        owner_id: 9,
        user_name: "",
        count_reviews: 0,
        avg_rating: 0,
        quantity: 0
    }

    async getBookNew(){
        try{
            const res = await instanceAPI.get(`book/new`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_list_new = res.data
            }
        }catch(e) {
            console.log(e);
        }
    }
    async getBookBestSeller(){
        try{
            const res = await instanceAPI.get(`book/best_seller`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_list_best_seller = res.data
            }
        }catch(e) {
            console.log(e);
        }
    }
    async getBookOnSale(){
        try{
            const res = await instanceAPI.get(`book/on_sale`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_list_on_sale = res.data
            }
        }catch(e) {
            console.log(e);
        }
    }
    async getBookRecommend(){
        try{
            const res = await instanceAPI.get(`book/recommend`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_list_recommend = res.data
            }
        }catch(e) {
            console.log(e);
        }
    }

    async getBook(){
        try{
            
        }catch(e) {
            console.log(e);
        }
    }

    async getBookDetail(book_id){
        try{
            const res = await instanceAPI.get(`book/${book_id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_detail = {
                    ...this.book_detail,
                    book_id: book_id,
                    book_name: res.data.book_name,
                    book_desc: res.data.book_desc,
                    unit_price: res.data.unit_price,
                    discount:  res.data.discount,
                    create_at: res.data.create_at,
                    disable: res.data.disable,
                    owner_id: res.data.owner_id,
                    user_name: res.data.user_name,
                    count_reviews: res.data.count_reviews,
                    avg_rating: res.data.avg_rating,
                }
            }
        }catch(e) {
            console.log(e);
            history.push("/")
            return
        }
    }

    async getBookDetailEdit(book_id, user_id){
        try{
            const res = await instanceAPI.get(`book/${book_id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                if(res.data.owner_id !== user_id){
                    history.push("/")
                    return
                }
                this.book_detail = {
                    ...this.book_detail,
                    book_id: book_id,
                    book_name: res.data.book_name,
                    book_desc: res.data.book_desc,
                    unit_price: res.data.unit_price,
                    discount:  res.data.discount,
                    create_at: res.data.create_at,
                    disable: res.data.disable,
                    owner_id: res.data.owner_id,
                    user_name: res.data.user_name,
                    count_reviews: res.data.count_reviews,
                    avg_rating: res.data.avg_rating,
                }
            }
        }catch(e) {
            console.log(e);
        }
    }

    async getBookStore(){
        try{
            const res = await instanceAPI.get(`book/store`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                this.book_list = res.data
            }
        }catch(e) {
            console.log(e);
        }
    }

    async insertBook(){
        try{
            var data = {
                book_name: this.book_detail.book_name,
                book_desc: this.book_detail.book_desc,
                unit_price: this.book_detail.unit_price,
                discount: this.book_detail.discount,
            }

            const res = await instanceAPI.post(`book/`, data, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });

            if(res.data !== null){
                alert("เพิ่มข้อมูลสำเร็จ!")
                await this.clearBook_detail()
            }
        }catch(e) {
            alert("เพิ่มข้อมูลไม่สำเร็จ!")
            console.log(e);
        }
    }    

    async editBook(){
        try{
            var data = {
                book_name: this.book_detail.book_name,
                book_desc: this.book_detail.book_desc,
                unit_price: this.book_detail.unit_price,
            }
            const res = await instanceAPI.patch(`book/${this.book_detail.book_id}`, data, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });

            if(res.data !== null){
                alert("แก้ไขข้อมูลสำเร็จ!")
            }
        }catch(e) {
            console.log(e);
            alert("แก้ไขข้อมูลไม่สำเร็จ!")
        }
    }

    async deleteBook(book_id){
        try{
            
            const res = await instanceAPI.delete(`book/${book_id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });
            if(res.data !== null){
                alert("ลบข้อมูลสำเร็จ!")
                return true
            }
        }catch(e) {
            console.log(e);
            alert("ลบข้อมูลไม่สำเร็จ!")
            return false
        }
    }

    async disableBook(book_id, status){
        try{
            var data = {

            }
            const res = await instanceAPI.patch(`book/${book_id}/disable/${status}`, data, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: cookie.load("token"),
                },
            });

            if(res.data !== null){
                alert("แก้ไขข้อมูลสำเร็จ!")
                return true
            }
        }catch(e) {
            console.log(e);
            alert("แก้ไขข้อมูลไม่สำเร็จ!")
            return false
        }
    }

    async clearBook_detail(){
        this.book_detail = {
            book_id: null,
            book_name: "",
            book_desc: "",
            unit_price: 0,
            discount: 0,
            create_at: "",
            disable: "false",
            owner_id: 9,
            user_name: "",
            count_reviews: 0,
            avg_rating: 0,
            quantity: 0
        }
    }
}

decorate(BookStore, {
    book_list: observable,
    book_list_new: observable,
    book_list_best_seller: observable,
    book_list_on_sale: observable,
    book_list_recommend: observable,
    book_detail: observable,
    getBookNew: observable,
    getBookBestSeller: observable,
    getBookOnSale: observable,
    getBookRecommend: observable,
    getBook: action,
    getBookDetail: action,
    getBookDetailEdit: action,
    getBookStore: action,
    insertBook: action,
    editBook: action,
    deleteBook: action,
    clearBook_detail: action
});

export default BookStore;
