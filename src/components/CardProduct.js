import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from "mobx-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { NavLink } from "react-router-dom";
import { history } from '../history';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "../asset/css/Swiper.css";
import "../asset/css/Card.css";
import book_img from '../asset/img/Manita-842x1024.jpg'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// import Swiper core and required modules
import SwiperCore, {
  Pagination,Navigation
} from 'swiper/core';
import { ScatterPlot } from '@material-ui/icons';

// install Swiper modules
SwiperCore.use([Pagination,Navigation]);


const useStyles = makeStyles((theme) => ({
    root: {
        width: 280,
        height: 450,
        '&:hover': {
            transform: "scale3d(1.05, 1.05, 1)",
            boxShadow: "0px 0px 15px -5px",
            opacity: 1
        }
      },
      media: {
        height: 200,
        // paddingTop: '100%'
      },
      img:{
        objectFit:"contain"
      }
}));

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

function CardProduct(props) {
    const classes = useStyles();
    const params = {
        className: 'mySwiper',
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: true,
        breakpoints: {
          1600: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20
          },
          1300: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20
          }
        }
      }
    const book_detail = (e, id) =>{
        e.preventDefault();
        history.push(`/book/`+id)
    }

    const add_to_cart = async(book_id) =>{
        await props.cartProv.addToCart(book_id,1)
    }

    useEffect(() => {
    },[] )

    return (
            <Card className="card-container" 
                // onClick={e => book_detail(e, props.data.book_id)}
            >
                {/* <CardActionArea className={classes.root} onClick={book_detail}> */}
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{marginTop:10,marginLeft:10}}
                    >
                        <CheckCircleIcon style={{color:"#32CD32"}}/>
                        <Typography variant="h6"  style={{color:"#32CD32",marginLeft:5,marginTop:-4}} >
                            มีสินค้า
                        </Typography>
                    </Grid>
                    <FavoriteBorderIcon className="hide-icon" />
                    {/* <NavLink to={`/book/`+props.data.book_id} style={{ textDecoration: 'none' }}> */}
                        <img src={book_img} alt='swiper 1' style={{marginTop:10,height:180,objectFit:"contain"}} class="center" onClick={e => history.push(`/book/`+props.data.book_id)}/>
                    {/* </NavLink> */}

                    <CardContent> 
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Button className="hide-button" variant="outlined" color="primary" onClick={e => add_to_cart(props.data.book_id)}>
                                <ShoppingCartOutlinedIcon/> Add To Cart
                            </Button>
                        </Grid>
                        <Rating name="disabled" value={props.data.avg_rating} disabled style={{marginTop:10}}/>
                        <span style={{marginLeft:10,fontSize:"1rem"}}>Reviews ({props.data.count_reviews})</span>
                        <NavLink to={`/book/`+props.data.book_id} style={{ textDecoration: 'none' }}>
                            <Typography gutterBottom variant="h6" component="h2" style={{marginTop:10,lineHeight:1}}>
                                {props.data.book_name}
                            </Typography>
                        </NavLink>
                        {
                            props.data.discount > 0 ? (
                                <>
                                    <Typography variant="h6"  color="textSecondary" style={{textDecorationLine: 'line-through'}}>
                                        THB{props.data.unit_price}
                                    </Typography>
                                    <Typography gutterBottom variant="h5"   style={{fontWeight:"bold",marginTop:-10}}>
                                        THB{props.data.unit_price-(props.data.unit_price*props.data.discount/100).toFixed(2)}
                                    </Typography>
                                </>
                            ) : (
                                <Typography gutterBottom variant="h5"  style={{fontWeight:"bold"}}>
                                    THB{props.data.unit_price}
                                </Typography>
                            )
                        }
                    </CardContent>
                {/* </CardActionArea> */}
                {/* <CardActions>
                    
                </CardActions> */}
            </Card>
        
                           
    );
}

export default inject("authenProv","bookProv","cartProv")(observer(CardProduct)); 