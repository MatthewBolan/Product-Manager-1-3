import React, {useEffect, useState} from 'react';

import { useParams } from "react-router";

import axios from 'axios';

import moment from 'moment';

import { useHistory } from 'react-router-dom';




const ProductDetails = () => {


    const { id } = useParams();

    const history = useHistory();



    const [productInfo, setProductInfo] = useState({})


    useEffect( () => {

        axios.get(`http://localhost:8000/api/product/${id}`)

        .then( response => {

            console.log("response when getting product details!", response)

            setProductInfo(response.data.results)

        })

        .catch(error => console.log(error))

    }, [] )


    const deleteProduct = () => {

        console.log('Deleting Product ID ---->', id)

        axios.delete(`http://localhost:8000/api/product/delete/${id}`)

        .then ( response => {

            console.log("response when deleting product details!", response)

            history.push("/")

        })

        .catch(error => console.log(error))

    }


    return (

        <div>

            <h1 className="my-5" > <u> Product Details! </u> </h1>

            <img src={productInfo.productPicUrl} alt="Product" height="250px" width="250px" />

            <p  className="my-5" >ID: {id}</p>

            <p  className="my-5" >Upload Date: { moment(productInfo.date).format('MMMM Do, YYYY') }</p>

            <div className="card-body bg-dark">

            <h3 className="card-title my-3"> <u> Product</u>: {productInfo.title} </h3>

            <p className="card-text my-5"> <u>A-1 Quality Grade</u>: {productInfo.isAone? "✓": ""}</p>

            <p className="card-text"> <u>Price</u>: ${productInfo.price}</p>

            <p className="card-text"> <u> Description</u>: {productInfo.description}</p>

            <button onClick = {deleteProduct} className="btn btn-danger my-5">Delete Product Details</button>

            </div>

        </div>

    );

};

export default ProductDetails;