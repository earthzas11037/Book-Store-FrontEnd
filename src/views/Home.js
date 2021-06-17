import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import SwiperProduct from '../components/SwiperProduct'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from 'swiper/core';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

import "../asset/css/Swiper.css";
import img1 from '../asset/img/67877071_2759635884121346_6086004907955978240_o.jpg'

const mock_data = [
    {
        book_id: 1,
        book_name: "หนังสือชีวประวัติ 1 หนังสือชีวประวัติหนังสือ",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 100.00,
        discount: 10,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 2,
        avg_rating: 3
    },
    {
        book_id: 2,
        book_name: "หนังสือชีวประวัติ 2",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 100.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 3,
        avg_rating: 4
    },
    {
        book_id: 3,
        book_name: "หนังสือชีวประวัติ 3",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 200.00,
        discount: 20,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 2,
        avg_rating: 5
    },
    {
        book_id: 4,
        book_name: "หนังสือชีวประวัติ 4",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 4,
        avg_rating: 2
    },
    {
        book_id: 5,
        book_name: "หนังสือชีวประวัติ 5",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 8,
        avg_rating: 4
    },
    {
        book_id: 6,
        book_name: "หนังสือชีวประวัติ 6",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 10,
        avg_rating: 4
    },
]

function Home(props) {
    SwiperCore.use([Navigation]);
    useEffect(() => {
        getData()
    },[] )

    const getData = async() => {
        props.bookProv.book_list_best_seller = []
        props.bookProv.book_list_recommend = []
        await props.bookProv.getBookBestSeller()
        await props.bookProv.getBookRecommend()
    }


    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} md={10}>
                <Swiper navigation={true} className="mySwiper" style={{height:450}}>
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
                <br/>

                <Typography gutterBottom variant="h6" component="h2" style={{marginTop:10,fontWeight:"bold",fontSize:"1.8rem"}}>
                    สินค้าขายดี
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <NavLink to={"/best_seller"} style={{ textDecoration: 'none' }}>
                        <Typography  color="inherit" style={{fontSize:"1rem",marginTop:-10,textDecoration:"underline",color:"BLACK"}}>
                            ดูสินค้าขายดีทั้งหมด
                        </Typography>
                    </NavLink>
                </Grid>
                <SwiperProduct book_list={props.bookProv.book_list_best_seller} style={{marginTop:30}}/>


                <Typography gutterBottom variant="h6" component="h2" style={{marginTop:10,fontWeight:"bold",fontSize:"1.8rem"}}>
                    สินค้าแนะนำ
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <NavLink to={"/recommend"} style={{ textDecoration: 'none' }}>
                        <Typography  color="inherit" style={{fontSize:"1rem",marginTop:-10,textDecoration:"underline",color:"BLACK"}}>
                            ดูสินค้าแนะนำทั้งหมด
                        </Typography>
                    </NavLink>
                </Grid>
                <SwiperProduct book_list={props.bookProv.book_list_recommend} style={{marginTop:30}} history={props.history}/>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv")(observer(Home)); 
