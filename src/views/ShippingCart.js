import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import book_img from '../asset/img/Manita-842x1024.jpg'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import SwiperProduct from '../components/SwiperProduct'
import { NavLink } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Hidden from "@material-ui/core/Hidden";

const mock_list_data = [
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
        avg_rating: 3,
        quantity: 1
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
        avg_rating: 4,
        quantity: 2
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
        avg_rating: 5,
        quantity: 2
    },

]

  
function ShippingCart(props) {
    const [data, setData] = useState(mock_list_data)

    useEffect(() => {
        getData()
    },[] )

    const getData = async() => {
        props.cartProv.cart = []
        await props.cartProv.getCart()
    }

    const setAmount = async(e, index,book_id) => {
        await props.cartProv.updateToCart(book_id,parseInt(e.target.value))
        var old = [...props.cartProv.cart]
        old[index] = {
            ...old[index],
            quantity: e.target.value
        }
        props.cartProv.cart = old
    }

    const getTotal = () => {
        var total = 0
        props.cartProv.cart.map((item,index) => {
            total += 
                item.discount > 0 ? 
                item.quantity*(item.unit_price-(item.unit_price*item.discount/100).toFixed(2))
                : item.quantity*item.unit_price
        })
        return total
    }

    const removeItem =  async(book_id, index) => {
        const result = await props.cartProv.removeFromCart(book_id)
        if(result){
            var old = [...props.cartProv.cart]
            old.splice(index,1)
            props.cartProv.cart = old
        }else{

        }
    }


    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} md={10} style={{marginTop:30}}>
                <Typography  style={{fontSize:"2rem",fontWeight:"bold"}}>
                    ตระกร้าสินค้า
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12} md={8} style={{marginTop:20}}>
                        <Hidden mdDown >
                            <Card  style={{width:"100%",height:"auto",minHeight:50,marginTop:20}}>
                                <CardContent> 
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid xs={12} lg={2}>
                                            <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                สินค้า
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} lg={8}>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Grid item xs={12} lg={5}>
                                                    <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                        
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} lg={2}>
                                                    <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                        ราคา
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} lg={2}>
                                                    <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                        จำนวน
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} lg={2}>
                                                    <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                        ยอดรวม
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Hidden>
                        {
                            props.cartProv.cart.map((item,index) => {
                                return (
                                    <Card  style={{width:"100%",height:"auto",minHeight:180,paddingTop:10,marginTop:20}}>
                                        <CardContent> 
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Grid xs={12} lg={2}>
                                                    <img src={book_img} alt='swiper 1' style={{objectFit:"contain",maxHeight:150}} class="center"/>
                                                </Grid>
                                                <Grid xs={12} lg={8}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-start"
                                                        alignItems="flex-start"
                                                        style={{marginTop:20}}
                                                    >
                                                        <Grid item xs={12} lg={5}>
                                                            <Typography  style={{fontSize:"1.1rem",lineHeight:1,width:"100%",marginTop:10}}>
                                                                {item.book_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={12} lg={2}>
                                                            <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold",marginTop:10}}>
                                                                THB
                                                                {
                                                                    item.discount > 0 ? 
                                                                    item.unit_price-(item.unit_price*item.discount/100).toFixed(2) 
                                                                    : item.unit_price
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={12} lg={2}>
                                                            <TextField 
                                                                type="number"
                                                                // fullWidth
                                                                InputProps={{
                                                                    inputProps: { 
                                                                        min: 0
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                value={item.quantity}
                                                                onChange={e => setAmount(e, index, item.book_id)}
                                                                style={{marginTop:10,marginRight:20}}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} lg={2}>
                                                            <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold",marginTop:10}}>
                                                                THB
                                                                {
                                                                    item.discount > 0 ? 
                                                                    item.quantity*(item.unit_price-(item.unit_price*item.discount/100).toFixed(2))
                                                                    : item.quantity*item.unit_price
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} lg={2}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        style={{marginTop:30}}
                                                    >
                                                        <Grid item xs={12}>
                                                            <Button variant="contained" color="secondary" disableElevation style={{width:"100%"}} onClick={e => removeItem(item.book_id, index)}>
                                                                ลบ
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Grid>

                    <Grid item  xs={12} md={4} style={{marginTop:20}}>
                        <Card  style={{width:"100%",paddingTop:10,marginTop:20,backgroundColor:"#F0F8FF"}}>
                            <CardContent> 
                                <Typography  style={{fontSize:"1.8rem",fontWeight:"bold"}}>
                                    สรุปคำสั่งซื้อ
                                </Typography>
                                <Grid container direction="row" justify="flex-end" alignItems="flex-start" style={{marginTop:30,textAlign:"right"}}>
                                    <Typography  style={{fontSize:"1.2rem"}}>
                                        ยอดรวม 
                                    </Typography>
                                    <Typography  style={{fontSize:"1.2rem",fontWeight:"bold",marginLeft:10,marginRight:10,textAlign:"right"}}>
                                        THB{getTotal().toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" justify="flex-end" alignItems="flex-start" style={{marginTop:30,textAlign:"right"}}>
                                    <Typography  style={{fontSize:"1.2rem"}}>
                                        ค่าส่ง
                                    </Typography>
                                    <Typography  style={{fontSize:"1.2rem",fontWeight:"bold",marginLeft:10,marginRight:10,textAlign:"right"}}>
                                        THB1
                                    </Typography>
                                </Grid>
                                <Divider style={{marginTop:20}}/>
                                <Grid container direction="row" justify="flex-end" alignItems="flex-start" style={{marginTop:30,textAlign:"right"}}>
                                    <Typography  style={{fontSize:"1.2rem"}}>
                                        ยอดสุทธิ
                                    </Typography>
                                    <Typography  style={{fontSize:"1.2rem",fontWeight:"bold",marginLeft:10,marginRight:10,textAlign:"right"}}>
                                        THB{(getTotal()+1).toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" justify="center" alignItems="flex-start" style={{marginTop:20}}>
                                    <NavLink to="/checkout" style={{ textDecoration: 'none' }}>
                                        <Button fullWidth variant="contained" color="primary" style={{fontSize:"1.5rem",paddingTop:10,paddingBottom:10,marginTop:10,width:300,marginBottom:20}} >
                                            ไปชำระเงิน
                                        </Button>
                                    </NavLink>
                                </Grid>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv","cartProv")(observer(ShippingCart)); 
