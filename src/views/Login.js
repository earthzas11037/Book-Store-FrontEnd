import React, { useState, useEffect } from 'react';
// import { API } from '../url';
import { inject, observer } from "mobx-react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { history } from '../history';
import { NavLink } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginfail, setLoginfail] = useState(false);

    useEffect(() => {
        // console.log(props.bookProv.book_list)
        props.bookProv.loginFail = false
    },[] )

    const handleLogin = async(e) => {
        e.preventDefault()
        await  props.authenProv.login(email, password)
    }

    const handleRegister = async(e) => {
        e.preventDefault()
        history.push("/register")
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name == "email"){ setEmail(value) }
        else{ setPassword(value) }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const datalogin = {
            email: email,
            password: password
        }
    }
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={12} md={6} lg={3}style={{backgroundColor:"WHITE",padding:50,marginTop:"5%",borderRadius:5}}>
                <Typography style={{fontSize:"2.0em",textAlign:"center",marginTop:50}}>
                    ลงชื่อเข้าใช้
                </Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        fullWidth
                        label={<div style={{fontSize:"1.5em",marginTop:-6}}>อีเมล์</div>}
                        name="email"
                        style={{marginTop:10}}
                        inputProps={{style: {fontSize: "1.2em"}}}
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField 
                        fullWidth
                        label={<div style={{fontSize:"1.5em",marginTop:-6}}>รหัสผ่าน</div>}
                        type="password"
                        name="password"
                        style={{marginTop:10}}
                        inputProps={{style: {fontSize: "1.2em"}}}
                        variant="outlined"
                        onChange={handleChange}
                    />
                    { props.authenProv.loginFail ? 
                        (
                        <Typography style={{fontSize:"calc(12px + 0.4vw)",color:"RED",marginTop:"15px"}}>
                            ชื่อผู้ใช้หรือรหัสผ่านผิด
                        </Typography>
                        ) : null
                    }
                    <Button 
                        variant="contained" 
                        color="primary"  
                        style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%"}} 
                        onClick={handleLogin}
                    >
                        ลงชื่อเข้าใช้
                    </Button>
                </form>
                
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="outlined"
                        color="primary"  
                        style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%"}} 
                    >
                        กลับสู่หน้าหลัก
                    </Button>
                </NavLink>
                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                    <Button 
                        color="primary"  
                        style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%",marginBottom:50}} 
                    >
                        สมัครสมาชิก
                    </Button>
                </NavLink>
            </Grid>
        </Grid>
    )
}

export default inject("authenProv","bookProv")(observer(Login)); 
