import React, {useState, useEffect} from 'react';

import axios from 'axios';

import {Link} from "react-router-dom";





const AllProducts = (props) => {


    const [allProducts, setAllProducts] = useState([])


    const [deleteToggle, setDeleteToggle] = useState(false)




    useEffect( () => {

        axios.get("http://localhost:8000/api/products")

        .then(response => {

            console.log("response when getting all products ---->", response)

            setAllProducts(response.data.results)

        })

        .catch (error => console.log("error --->", error))

    }, [props.formSubmitted, deleteToggle] )



    const deleteProduct = (id) => {

        console.log('Deleting Product ID ---->', id)

        axios.delete(`http://localhost:8000/api/product/delete/${id}`)

        .then ( response => {

            console.log("response when deleting product details!", response)

            setDeleteToggle(!deleteToggle)

        })

        .catch(error => console.log(error))

    }



    return (

        <div>

        <h1> All Products!</h1>

        {

            allProducts.map( (product, x) => {

                return (

                <div key = {x} className="card">

                    <div className="card-header bg-dark">

                    <h1> <Link to = {`/product/${product._id}`} > {product.title} </Link> </h1>

                    <p> <button onClick = {(event) => deleteProduct (product._id) } className="btn btn-danger my-4" >Delete Product</button> | <Link to = {`/edit/${product._id}`} className="btn btn-warning" >Edit Product</Link> </p> 


                    </div>


                    {/* <div className="card-body bg-dark">

                        <h3 className="card-title"> <u> Product Info </u> </h3>
                        
                        <p className="card-text"> Price: ${product.price}</p>

                        <p className="card-text"> <u> Description</u>: {product.description}</p>

                        <img src={product.productPicUrl} alt="Product" height="250px" width="250px" />

                    </div> */}

                </div>

                )

            } )

        }

        </div>




    );

};


export default AllProducts;