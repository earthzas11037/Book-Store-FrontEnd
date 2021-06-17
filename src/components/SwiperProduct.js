import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from "mobx-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "../asset/css/Swiper.css";
import "../asset/css/Card.css";
import CardProduct from './CardProduct';
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


function SwiperProduct(props) {
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
    const book_detail = () =>{
    }

    const add_to_cart = () =>{
    }

    useEffect(() => {
    },[] )

    return (
        <div>
            <Swiper 
                {...params} 
                // loop={true} 
                // loopFillGroupWithBlank={true} 
            >
                {
                    props.book_list.map((item,index) => {
                        return (
                            <SwiperSlide style={{backgroundColor:"WHITE",textAlign:"left"}} >
                                <CardProduct data={item} history={props.history}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}

export default inject("authenProv","bookProv")(observer(SwiperProduct)); 