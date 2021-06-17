import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import { NavLink } from "react-router-dom";
import CardProduct from '../components/CardProduct';
import "../asset/css/Card.css";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
    {
        book_id: 7,
        book_name: "หนังสือชีวประวัติ 7",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 3,
        avg_rating: 4
    },
    {
        book_id: 8,
        book_name: "หนังสือชีวประวัติ 8",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 2,
        avg_rating: 3
    },
    {
        book_id: 9,
        book_name: "หนังสือชีวประวัติ 9",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 20.00,
        discount: 0,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 5,
        avg_rating: 3
    },
]

function BestSellerProduct(props) {

    useEffect(() => {
        getData()
    },[] )

    const getData = async() => {
        props.bookProv.book_list_best_seller = []
        await props.bookProv.getBookBestSeller()
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12}  md={10} lg={8}>
                <Breadcrumbs aria-label="breadcrumb" style={{marginTop:40}}>
                    <NavLink to={"/"} style={{ textDecoration: 'none',color:"#C0C0C0",fontSize:"1.4rem"}} >
                        หน้าหลัก
                    </NavLink>
                    <Typography color="textPrimary" style={{fontWeight:"bold",fontSize:"1.4rem"}}>สินค้าขายดี</Typography>
                </Breadcrumbs>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                        <Typography  color="inherit" style={{fontSize:"1rem",marginTop:-10,color:"BLACK"}}>
                            จำนวนสินค้า {props.bookProv.book_list_best_seller.length} รายการ
                        </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={5}
                    style={{marginTop:10}}
                >
                    {
                        props.bookProv.book_list_best_seller.map((item,index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CardProduct data={item}/>
                                </Grid>  
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("bookProv")(observer(BestSellerProduct)); 
