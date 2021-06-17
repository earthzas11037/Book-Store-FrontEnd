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

const mock_data =
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
    }


  
function InsertBook(props) {
    const [data, setData] = useState(mock_data)

    useEffect(async() => {
        await props.bookProv.clearBook_detail()
    },[] )

    const handleChange = (event) => {
        const { name, value } = event.target;
        props.bookProv.book_detail = {
            ...props.bookProv.book_detail,
            [name] : value
        }
    }

    const handleInsert = async() => {
        var cur = props.bookProv.book_detail
        if(cur.book_name === "" || cur.book_desc === ""){
            alert("กรุณากรอกข้อมูลให้ครบ!")
            return
        }
        await props.bookProv.insertBook();
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
                    เพิ่มสินค้า
                </Typography>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                    style={{marginTop:30}}
                >
                    <Grid item xs={12} md={8}>
                        <TextField 
                            fullWidth
                            name="book_name" 
                            label="ชื่อหนังสือ" 
                            variant="outlined" 
                            onChange={e => handleChange(e)}
                            value={props.bookProv.book_detail.book_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField 
                            fullWidth
                            name="book_desc" 
                            label="รายละเอียดหนังสือ" 
                            variant="outlined" 
                            multiline 
                            rows={5} 
                            onChange={e => handleChange(e)}
                            value={props.bookProv.book_detail.book_desc}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField 
                            type="number" 
                            InputProps={{inputProps: { min: 0}}} 
                            name="unit_price" 
                            fullWidth
                            label="ราคา" 
                            variant="outlined" 
                            onChange={e => handleChange(e)}
                            value={props.bookProv.book_detail.unit_price}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField 
                            type="number" 
                            InputProps={{inputProps: { min: 0}}} 
                            name="discount" 
                            fullWidth
                            label="ส่วนลด" 
                            variant="outlined" 
                            onChange={e => handleChange(e)}
                            value={props.bookProv.book_detail.discount}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12} md={3}>
                                <Button variant="outlined" color="primary" disableElevation style={{width:"100%",marginTop:20,paddingTop:10,paddingBottom:10,fontSize:"1.2rem"}} onClick={e => props.history.goBack()}>
                                    ย้อนกลับ
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button variant="contained" color="primary" disableElevation style={{width:"100%",marginTop:20,marginLeft:20,paddingTop:10,paddingBottom:10,fontSize:"1.2rem"}} onClick={e => handleInsert()}>
                                    ยืนยัน
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default inject("authenProv","bookProv")(observer(InsertBook)); 
