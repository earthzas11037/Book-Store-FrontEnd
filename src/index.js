import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "mobx-react"
import App from './App';

import AuthenStore from './stores/AuthenStore';
import BookStore from './stores/BookStore';
import CartStore from './stores/CartStore';

ReactDOM.render(
  <Provider 
      authenProv = {new AuthenStore(this)}
      bookProv = {new BookStore(this)}
      cartProv = {new CartStore(this)}
    >
      <App />
    </Provider>,

  document.getElementById('root')
);

