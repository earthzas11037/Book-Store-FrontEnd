import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Avatar from '@material-ui/core/Avatar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { history } from '../history';
import book_img from '../asset/img/Manita-842x1024.jpg'

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

const useStyles = makeStyles((theme) => ({
      
    appBar: {
        backgroundColor:"WHITE",
        color:"BLACK",
        height:100
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
            display: "none"
        }
    },
    icon: {
        '&:hover': {
            cursor: "pointer"
        }
    },
    customWidth: {
        '& div': {
            width: '400px',
        }
    }
}));

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);

function Navibar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isSearch, setIsSearch] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        getData()
    },[] )

    const getData = async() => {
        props.cartProv.cart = []
        await props.cartProv.getCart()
    }

    const login = (event) => {
        history.push("/login");
    }

    const logout = async(event) => {
        event.preventDefault();
        await props.authenProv.logout()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

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

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{marginTop:20}}>
                    {/* <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid  xs={12} lg={10}> */}
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={props.handleDrawerToggle}
                                className={classes.menuButton}
                                xs={1}
                                // style={{border: "2px solid red"}}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                // style={{border: "2px solid red"}}
                                xs={1} md={12}
                            >
                                <Hidden mdDown >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                        xs={12}
                                        // style={{border: "2px solid red"}}
                                    >   
                                        <Grid xs={1}>
                                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                                <ListItem button style={{borderRadius:10}} >
                                                    <Typography style={{color:"BLACK",fontSize:"2em",fontWeight:"bold"}}>
                                                        Book
                                                    </Typography>
                                                </ListItem>
                                            </NavLink>
                                        </Grid>
                                        {
                                            isSearch? (
                                                <Grid xs={11}>
                                                    <TextField 
                                                        fullWidth   
                                                        id="outlined-search" 
                                                        placeholder="ค้นหาสินค้า"
                                                        type="text" 
                                                        variant="outlined" 
                                                        style={{ borderRadius: 50 }}
                                                    />
                                                </Grid>
                                            ) : (
                                                <>
                                                <NavLink to="/new" style={{ textDecoration: 'none' }}>
                                                    <ListItem button style={{borderRadius:10}} >
                                                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                                                            สินค้าใหม่
                                                        </Typography>
                                                    </ListItem>
                                                </NavLink>
                                                <NavLink to="/best_seller" style={{ textDecoration: 'none' }}>
                                                    <ListItem button style={{borderRadius:10}} >
                                                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                                                            สินค้าขายดี
                                                        </Typography>
                                                    </ListItem>
                                                </NavLink>
                                                <NavLink to="/on_sale" style={{ textDecoration: 'none' }}>
                                                    <ListItem button style={{borderRadius:10}} >
                                                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                                                            สินค้าลดราคา
                                                        </Typography>
                                                    </ListItem>
                                                </NavLink>
                                                <NavLink to="/recommend" style={{ textDecoration: 'none' }}>
                                                    <ListItem button style={{borderRadius:10}} >
                                                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                                                            สินค้าแนะนำ
                                                        </Typography>
                                                    </ListItem>
                                                </NavLink>
                                                </>
                                            )
                                        }
                                        
                                    </Grid>
                                </Hidden>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                                // style={{border: "2px solid red"}}
                                lg={2}
                            >
                                {
                                    isSearch? (
                                        <CloseIcon
                                            style={{ fontSize: 30, marginRight:30 }}
                                            onClick={e => setIsSearch(false)} 
                                            className={classes.icon}                               
                                        />
                                    ) : (
                                        <SearchOutlinedIcon 
                                            style={{ fontSize: 30, marginRight:30 }}
                                            onClick={e => setIsSearch(true)} 
                                            className={classes.icon}                               
                                        />
                                    )
                                }
                                {
                                    props.cartProv.cart[0]? (
                                        <Badge badgeContent={props.cartProv.cart.length} color="primary" style={{ fontSize: 30, marginRight:30 }}>
                                            <ShoppingCartOutlinedIcon 
                                                style={{ fontSize: 30}}
                                                onClick={handleClick}
                                                className={classes.icon}
                                            />
                                        </Badge>
                                    ) : (
                                        <ShoppingCartOutlinedIcon 
                                            style={{ fontSize: 30, marginRight:30 }}
                                            onClick={handleClick}
                                            className={classes.icon}
                                        />
                                    )
                                }
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{  
                                        style: {  
                                          width: 400,  
                                        },  
                                     }} 
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        <Typography style={{color:"BLACK",fontSize:"1.2em",fontWeight:"bold",textAlign:"center",marginTop:20}}>
                                            ตระกร้าของฉัน
                                        </Typography>
                                        <Typography style={{color:"BLACK",fontSize:"1em",textAlign:"center",marginTop:10}}>
                                            {props.cartProv.cart.length} สินค้าในตระกร้า
                                        </Typography>
                                        <Grid xs={12}>
                                            <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                                                <Button fullWidth variant="outlined" color="primary" style={{marginTop:10,width:300}} onClick={handleClose}>
                                                    ดูหรือแก้ไขตระกร้าของฉัน
                                                </Button>
                                            </NavLink>
                                        </Grid>
                                    </Grid>

                                    <List component="nav" aria-label="secondary mailbox folders" style={{marginTop:10}}>
                                        {
                                            props.cartProv.cart.map((item,index) => {
                                                return (
                                                    index < 3 ? 
                                                        <>
                                                        <Divider />
                                                        <NavLink to={`/book/`+item.book_id} style={{ textDecoration: 'none' }} onClick={handleClose}>
                                                            <ListItem button>
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justify="flex-start"
                                                                    alignItems="flex-start"
                                                                >
                                                                    <Typography  style={{fontSize:"1rem",lineHeight:1,marginRight:10,marginTop:20}}>
                                                                        {item.quantity+" x"}
                                                                    </Typography>
                                                                    <img src={book_img} alt='swiper 1' style={{width:30,height:60,objectFit:"contain",marginRight:10}} />
                                                                    <Typography  style={{fontSize:"1rem",lineHeight:1,marginTop:10}}>
                                                                        {item.book_name}
                                                                    </Typography>
                                                                </Grid>
                                                            </ListItem>
                                                            </NavLink>
                                                        <Divider />
                                                        </> : null
                                                )
                                            })
                                        }
                                    </List>

                                    <Grid
                                        container
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        <Typography style={{color:"BLACK",fontSize:"1.2em",fontWeight:"bold",textAlign:"center",marginTop:10}}>
                                            ยอดรวม: THB{getTotal().toFixed(2)}
                                        </Typography>
                                        <Grid xs={12}>
                                            <NavLink to="/checkout" style={{ textDecoration: 'none' }}>
                                                <Button fullWidth variant="contained" color="primary" style={{marginTop:10,width:300,marginBottom:20}} onClick={handleClose}>
                                                    ไปชำระเงิน
                                                </Button>
                                            </NavLink>
                                        </Grid>
                                    </Grid>
                                </StyledMenu>

                                {
                                    props.authenProv.token? (
                                        <>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.icon} onClick={handleClickUser}/>
                                            <StyledMenu
                                                id="customized-menu"
                                                anchorEl={anchorElUser}
                                                keepMounted
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUser}
                                                PaperProps={{  
                                                    style: {  
                                                      width: 250,  
                                                    },  
                                                 }} 
                                            >
                                                <NavLink to={"/store"} style={{ textDecoration: 'none' }}>
                                                    <StyledMenuItem onClick={handleCloseUser}>
                                                            <ListItemText primary="คลังสินค้าของฉัน" />
                                                    </StyledMenuItem>
                                                </NavLink>
                                                <StyledMenuItem onClick={handleCloseUser}>
                                                        <ListItemText primary="ลงชื่อออก" onClick={logout}/>
                                                </StyledMenuItem>
                                            </StyledMenu>
                                        </>
                                    ) : (
                                        <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" color="primary"  style={{padding:"10px 25px 10px 25px"}}>
                                                ลงชื่อเข้าใช้
                                            </Button>
                                        </NavLink>
                                    )
                                }
                            </Grid>
                        {/* </Grid>
                    </Grid> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default inject("authenProv","bookProv","cartProv")(observer(Navibar)); 