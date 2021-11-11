import React, {useState} from 'react';

import './App.css';

import AllProducts from './components/AllProducts';

import NewProductForm from './components/NewProductForm';

import ProductDetails from './components/ProductDetails';

import EditProductForm from './components/EditProductForm copy';

import { BrowserRouter, Switch, Route, Link} from "react-router-dom";



function App() {

  const [formSubmitted, setFormSubmitted] = useState(false)

  return (

    <BrowserRouter>


    <div className="App">
      <header className="App-header">


        <h1 className="my-3" >Product Manager API</h1>

        <Link to="/" className="btn btn-primary my-3" > DashBoard </Link>

        <Link to="/create/product" className="btn btn-info my-3" > Create Product </Link>

        <Switch>


              <Route exact path = "/" >

                  <AllProducts formSubmitted = {formSubmitted} />

              </Route >



              <Route exact path = "/create/product">

              <NewProductForm formSubmitted = {formSubmitted} setFormSubmitted = {setFormSubmitted} />


              </Route>



              <Route exact path = "/product/:id">

                <ProductDetails/>

              </Route>



              <Route exact path = "/edit/:id">

                <EditProductForm/>

              </Route>


        </Switch>


      </header>
    </div>


    </BrowserRouter>

  );

}

export default App;
