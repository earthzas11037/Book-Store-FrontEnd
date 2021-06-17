import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Sidebar from '../components/Sidebar';
import Navibar from '../components/Navibar'
import Footer from '../components/Footer'
import Home from '../views/Home'
import ProductDetail from '../views/ProductDetail'
import NewProduct from '../views/NewProduct'
import BestSellerProduct from '../views/BestSellerProduct'
import OnSaleProduct from '../views/OnSaleProduct'
import RecommendProduct from '../views/RecommendProduct'
import ShippingCart from '../views/ShippingCart'
import CheckOut from '../views/CheckOut'
import Store from '../views/Store'
import InsertBook from '../views/InsertBook'
import EditBook from '../views/EditBook'
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        padding: 20,
        marginTop: 30,
        marginBottom: 60,
        minHeight:800
    }
}));

function User(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }


    useEffect(() => {
    }, [])

    return (
        <div>
            <Sidebar
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <Navibar
                handleDrawerToggle={handleDrawerToggle}
                history={props.history}
            />
            {/* <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                // xs={10}
                // style={{border: "2px solid red"}}
            >
                <Grid xs={10} > */}
                    <main className={classes.content} >
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/book/:book_id" component={ProductDetail} />
                            <Route path="/store/insert" component={InsertBook} />
                            <Route path="/store/edit/:book_id" component={EditBook} />
                            <Route path="/store" component={Store} />
                            <Route path="/new" component={NewProduct} />
                            <Route path="/best_seller" component={BestSellerProduct} />
                            <Route path="/on_sale" component={OnSaleProduct} />
                            <Route path="/recommend" component={RecommendProduct} />
                            <Route path="/cart" component={ShippingCart} />
                            <Route path="/checkout" component={CheckOut} />
                            <Route path="/" component={Home} />
                            <Redirect from="/" to="/" />
                        </Switch>
                    </main>
                {/* </Grid>
                
            </Grid> */}
            <Footer/>
        </div>
    )

}

export default inject("authenProv","bookProv")(observer(User)); 