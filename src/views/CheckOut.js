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


  
function CheckOut(props) {
    const [data, setData] = useState(mock_list_data)
    const [valueShipping, setValueShipping] = useState(0);
    const [valueCheckout, setValueCheckout] = useState(0);

    useEffect(() => {
        getData()
    },[] )

    const getData = async() => {
        props.cartProv.cart = []
        await props.cartProv.getCart()
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

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} md={10} style={{marginTop:30}}>
                <Typography  style={{fontSize:"2rem",fontWeight:"bold"}}>
                    ชำระเงิน
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12} md={8} style={{marginTop:20}}>
                        <Typography  style={{fontSize:"1rem",fontWeight:"bold"}}>
                            ที่อยู่ในการจัดส่ง
                        </Typography>
                        <Divider style={{marginTop:20,marginBottom:30}}/>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            spacing={3}
                        >
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="ชื่อ" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="นามสกุล" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                    {/* <InputLabel >ประเทศ</InputLabel> */}
                                    <Select
                                        value={0}
                                        // onChange={handleChange}
                                        label="ประเทศ"
                                        variant="outlined"
                                        fullWidth
                                    >
                                    <MenuItem value={0}>Thailand</MenuItem>
                                    </Select>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth id="outlined-basic" label="ที่อยู่" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="แขวง/ตำบล" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="เขต/อำเภอ" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="จังหวัด" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="outlined-basic" label="รหัสไปรษณีย์" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth id="outlined-basic" label="เบอร์โทร (กรุณาระบุหมายเลขโทรศัพท์ เฉพาะตัวเลขเท่านั้น)" variant="outlined" />
                            </Grid>
                        </Grid>

                        <Typography  style={{fontSize:"1rem",fontWeight:"bold",marginTop:60}}>
                            เลือกขนส่ง
                        </Typography>
                        <Divider style={{marginTop:20,marginBottom:30}}/>
                        <RadioGroup  name="valueShipping" value={valueShipping} >
                            <Grid item xs={12} md={12}>
                                <Card className="card-container-checkout"  style={{width:"100%",paddingTop:10,marginTop:20}} onClick={e => setValueShipping(0)}>
                                    <CardContent> 
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                            <FormControlLabel value={0} control={<Radio color="primary"/>} />
                                            <Typography  style={{fontSize:"1.2rem"}}>
                                                Free Shipping
                                            </Typography>
                                            <Grid  container direction="row" justify="flex-end" alignItems="flex-start">
                                                <Typography  style={{fontSize:"1.2rem",marginTop:-30}}>
                                                    THB0.00
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Card className="card-container-checkout"  style={{width:"100%",paddingTop:10,marginTop:20}} onClick={e => setValueShipping(1)}>
                                    <CardContent> 
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                            <FormControlLabel value={1} control={<Radio color="primary"/>} />
                                            <Typography  style={{fontSize:"1.2rem"}}>
                                                KERRY EXPRESS
                                            </Typography>
                                            <Grid  container direction="row" justify="flex-end" alignItems="flex-start">
                                                <Typography  style={{fontSize:"1.2rem",marginTop:-30}}>
                                                    THB40.00
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </RadioGroup>

                        <Typography  style={{fontSize:"1rem",fontWeight:"bold",marginTop:60}}>
                            วิธีชำระเงิน
                        </Typography>
                        <Divider style={{marginTop:20,marginBottom:30}}/>
                        <RadioGroup  name="valueCheckout" value={valueCheckout} >
                            <Grid item xs={12} md={12}>
                                <Card className="card-container-checkout"  style={{width:"100%",paddingTop:10,marginTop:20}} onClick={e => setValueCheckout(0)}>
                                    <CardContent> 
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                            <FormControlLabel value={0} control={<Radio color="primary"/>} />
                                            <Typography  style={{fontSize:"1.2rem"}}>
                                                Cash
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Card className="card-container-checkout"  style={{width:"100%",paddingTop:10,marginTop:20}} onClick={e => setValueCheckout(1)}>
                                    <CardContent> 
                                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                            <FormControlLabel value={1} control={<Radio color="primary"/>} />
                                            <Typography  style={{fontSize:"1.2rem"}}>
                                                Credit/Debit
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </RadioGroup>
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
                                        <Button fullWidth variant="contained" color="primary" style={{fontSize:"1.5rem",paddingTop:10,paddingBottom:10,marginTop:10,width:300,marginBottom:20}} >
                                            ชำระเงิน
                                        </Button>
                                </Grid>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv","cartProv")(observer(CheckOut)); 
