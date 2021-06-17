import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import book_img from '../asset/img/Manita-842x1024.jpg'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Hidden from "@material-ui/core/Hidden";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { NavLink } from "react-router-dom";
import { history } from '../history';

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


  
function Store(props) {
    const [data, setData] = useState(mock_list_data)


    useEffect(async() => {
        getData()
    },[] )

    const getData = async() => { 
        props.bookProv.book_list = []
        await props.bookProv.getBookStore()
    }

    const removeItem =  async(book_id, index) => {
        const result = await props.bookProv.deleteBook(book_id)
        if(result){
            var old = [...props.bookProv.book_list]
            old.splice(index,1)
            props.bookProv.book_list = old
        }
    }
    const disableItem = async(book_id, index, status) => {
        const result = await props.bookProv.disableBook(book_id, status)
        if(result){
            var old = [...props.bookProv.book_list]
            old[index] = {
                ...old[index],
                disable: status.toString()
            }
            props.bookProv.book_list = old
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
                    สินค้าในคลัง
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Grid xs={12} md={2}>
                        <NavLink to={`/store/insert`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" disableElevation style={{width:"100%"}}>
                                เพิ่มสินค้า
                            </Button>
                        </NavLink>
                    </Grid>
                </Grid>
                
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12} md={12} style={{marginTop:20}}>
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
                                                        ส่วนลด
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} lg={2}>
                                                    <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold"}}>
                                                        สถานะการมองเห็น
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Hidden>
                        {
                            props.bookProv.book_list.map((item,index) => {
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
                                                {/* <NavLink to={`/book/`+item.book_id} style={{ textDecoration: 'none' }}> */}
                                                    <Grid xs={12} lg={8}>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justify="flex-start"
                                                            alignItems="flex-start"
                                                            style={{marginTop:20}}
                                                        >
                                                            <Grid item xs={12} lg={5} onClick={e => history.push(`/book/`+item.book_id)} style={{cursor:"pointer"}}>
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
                                                                <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold",marginTop:10}}>
                                                                    { item.discount } %
                                                                </Typography>
                                                            </Grid>
                                                            <Grid xs={12} lg={2}>
                                                                <Typography  style={{fontSize:"1.3rem",lineHeight:1,width:"100%",fontWeight:"bold",marginTop:10}}>
                                                                    {
                                                                        item.disable === "false" ? "เปิดการมองเห็น" : "ปิดการมองเห็น"
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                {/* </NavLink> */}
                                                <Grid xs={12} lg={2}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        style={{marginTop:30}}
                                                    >
                                                        <Grid item xs={12}>
                                                            <NavLink to={`/store/edit/`+item.book_id} style={{ textDecoration: 'none' }}>
                                                                <Button variant="contained" color="primary" disableElevation style={{width:"100%"}} >
                                                                    แก้ไข
                                                                </Button>
                                                            </NavLink>
                                                            <Button variant="contained" color="secondary" disableElevation style={{width:"100%",marginTop:20}} onClick={e => removeItem(item.book_id, index)}>
                                                                ลบ
                                                            </Button>
                                                            {
                                                                item.disable === "false" ? (
                                                                    <Button variant="outlined" color="primary" disableElevation style={{width:"100%",marginTop:20}} onClick={e => disableItem(item.book_id, index, true)}>
                                                                        ปิดการมองเห็น
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="outlined" color="primary" disableElevation style={{width:"100%",marginTop:20}} onClick={e => disableItem(item.book_id, index, false)}>
                                                                        เปิดการมองเห็น
                                                                    </Button>
                                                                )
                                                            }
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
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv")(observer(Store)); 
