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
import { history } from '../history';

const mock_data = {
        book_id: 1,
        book_name: "หนังสือชีวประวัติ 1 ",
        book_desc: "ขายดีอันดับหนึ่ง",
        unit_price: 100.00,
        discount: 10,
        create_at: "2021-06-14T15:45:14.000Z",
        disable: "false",
        owner_id: 9,
        user_name: "lertphan",
        count_reviews: 2,
        avg_rating: 3
}
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
function ProductDetail(props) {
    const [amount, setAmount] = useState(0)
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        getData()
        const unlisten = history.listen(() => {
            var pathArray = history.location.pathname.split("/");
            if(pathArray[1] === "book")
                getData()
        });
        return () => {
        unlisten();
        }
    },[] )
    
    const getData = async() => { 
        await props.bookProv.clearBook_detail()
        var pathArray = window.location.pathname.split("/");
        const target = pathArray[2];
        await props.bookProv.getBookDetail(target)
        props.bookProv.book_list_recommend = []
        await props.bookProv.getBookRecommend ()
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const add_to_cart = async(book_id) =>{
        await props.cartProv.addToCart(book_id,parseInt(amount))
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} md={10}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid xs={12} md={4} style={{marginTop:30}}>
                        <img src={book_img} alt='swiper 1' style={{objectFit:"contain"}} class="center"/>
                    </Grid>
                    <Grid xs={12} md={8} style={{marginTop:30}}>
                        <Typography  style={{fontSize:"2rem",fontWeight:"bold"}}>
                            {props.bookProv.book_detail.book_name}
                        </Typography>
                        <Typography  style={{fontSize:"1.3rem"}}>
                            ผู้เขียน : โซนัมจู
                        </Typography>
                        <Typography  style={{fontSize:"1.3rem"}}>
                            สำนักพิมพ์ : Piccolo
                        </Typography>
                        <Typography  style={{fontSize:"1.3rem"}}>
                            หมวดหมู่ : วรรณกรรม เรื่องสั้น
                        </Typography>
                        <Typography  style={{fontSize:"1.3rem"}}>
                            ประเภทของสินค้า : Books
                        </Typography>
                        <Typography  style={{fontSize:"1.3rem"}}>
                            บาร์โค้ด : 9786161840488
                        </Typography>
                        <Grid container direction="row"s style={{marginTop:30}}>
                            <Typography  style={{fontSize:"2rem"}}>
                                ราคา  
                            </Typography>
                            <Typography  style={{fontSize:"2rem",fontWeight:"bold",marginLeft:10,marginRight:10}}>
                                THB{props.bookProv.book_detail.unit_price-(props.bookProv.book_detail.unit_price*props.bookProv.book_detail.discount/100).toFixed(2)}
                            </Typography>
                            <Typography variant="h6"  color="textSecondary" style={{fontSize:"2rem",fontWeight:"bold",textDecorationLine: 'line-through'}}>
                                THB{props.bookProv.book_detail.unit_price}
                            </Typography>
                        </Grid>
                        <Grid container direction="row"s style={{marginTop:30}} spacing={3}>
                            <Grid item xs={12} md={3} lg={2}>
                                <TextField 
                                    type="number"
                                    fullWidth
                                    InputProps={{
                                        inputProps: { 
                                            min: 0
                                        }
                                    }}
                                    variant="outlined"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} lg={2}>
                                <Button fullWidth className="hide-button" variant="contained" color="primary" style={{paddingTop:15,paddingBottom:15}} onClick={e => add_to_cart(props.bookProv.book_detail.book_id)}>
                                    <ShoppingCartOutlinedIcon/> Add
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3} lg={2}>
                                <Button fullWidth className="hide-button" variant="contained"  style={{paddingTop:15,paddingBottom:15,backgroundColor:"#FF8C00",color:"WHITE"}}>
                                    <FavoriteBorderIcon/> Wishlist
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="row"s style={{marginTop:30}}>
                            <Typography  style={{fontSize:"1.3rem", marginRight:10}}>
                                แชร์ :
                            </Typography>
                            <MailIcon style={{ fontSize: 30, marginRight:10 }}/>
                            <TwitterIcon style={{ fontSize: 30, marginRight:10 }}/>
                            <FacebookIcon style={{ fontSize: 30, marginRight:10 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    style={{marginTop:30}}
                >
                    <Grid xs={12}>
                        <Tabs
                        value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="เกี่ยวกับสินค้า" style={{fontSize:"1.2rem"}}/>
                            <Tab label="รายละเอียด" style={{fontSize:"1.2rem"}}/>
                        </Tabs>
                        <TabPanel value={value} index={0} >
                            <Grid container direction="row"s style={{marginTop:30}}>
                                <Typography  style={{fontSize:"1.2rem",fontWeight:"bold"}}>
                                    รายละเอียด : 
                                </Typography>
                                &nbsp;
                                <Typography  style={{fontSize:"1.2rem"}}>
                                   {props.bookProv.book_detail.book_name}
                                </Typography>
                            </Grid>
                            <Grid container direction="row"s style={{marginTop:20,lineHeight:1}}>
                                <Typography  style={{fontSize:"1.2rem"}} color="textSecondary">
                                   {props.bookProv.book_detail.book_desc}
                                </Typography>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1} >
                            
                        </TabPanel>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    style={{marginTop:50}}
                >
                    <Grid xs={12}>
                        <Typography gutterBottom variant="h6" component="h2" style={{marginTop:10,fontWeight:"bold",fontSize:"1.8rem"}}>
                            สินค้าที่เกี่ยวข้อง
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                        >
                            <NavLink to={"/new"} style={{ textDecoration: 'none' }}>
                                <Typography  color="inherit" style={{fontSize:"1rem",marginTop:-10,textDecoration:"underline",color:"BLACK"}}>
                                    ดูสินค้าทั้งหมด
                                </Typography>
                            </NavLink>
                        </Grid>
                        <SwiperProduct book_list={props.bookProv.book_list_recommend} style={{marginTop:30}}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv","cartProv")(observer(ProductDetail)); 
