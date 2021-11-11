import React, {useEffect, useState} from 'react';

import axios from 'axios';

import { useParams } from "react-router";

import moment from 'moment';

import { useHistory } from 'react-router';

const EditProductForm = (props) => { 

    const { id } = useParams();

    const history = useHistory();

    const [formInfo, setFormInfo] = useState ({

        title:"",

        price:"",

        description:"",

        date:"",

        isAone:false,

        productPicUrl:""

    })


    useEffect( () => {

        axios.get(`http://localhost:8000/api/product/${id}`)

        .then( response => {

            console.log("response when editing product details!", response)

            setFormInfo(response.data.results)


        })

        .catch(error => console.log(error))

    }, [] )




    const changeHandler = (event) => {

        console.log("Changing the form!")

        if (event.target.type==="checkbox") {

            setFormInfo({

                ...formInfo,

                [event.target.name]: !formInfo.isAone

            })

        }else{

            setFormInfo({

                ...formInfo,

                [event.target.name]: event.target.value

            })

        }

    }



    const submitHandler = (event) => {

        event.preventDefault()

        axios.put(`http://localhost:8000/api/product/update/${id}`, formInfo)

            .then(response => {

                console.log("response when updating product details", response)

                history.push("/")

            })

            .catch( error => console.log(error))

    }




    return (

        <div>

            <h2 className="my-3" > <u> Edit Product Details </u> </h2>

        <form onSubmit = {submitHandler}>


            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3" >Title:</label>

                <input onChange={changeHandler} type="text" name="title" id="" className="form-control my-3" value={formInfo.title} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3">Price:</label>

                <input onChange={changeHandler} type="number" name="price" id="" className="form-control my-3" value={formInfo.price} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3"> Description: </label>

                <input onChange={changeHandler} type="text" name="description" id="" className="form-control my-3" value={formInfo.description} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3">Date:</label>

                <input onChange={changeHandler} type="date" name="date" id="" className="form-control my-3" value={moment(formInfo.date).format("YYYY-MM-DD")} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-4">Product Image Link:</label>

                <input onChange={changeHandler} type="text" name="productPicUrl" id="" className="form-control my-3" value={formInfo.productPicUrl} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-4">A-1 Quality Grade?</label>

                {

                formInfo.isAone?

                <input onChange={changeHandler} type="checkbox" name="isAone" id="" className="form-checkbox my-3" value={formInfo.isAone} checked /> :

                <input onChange={changeHandler} type="checkbox" name="isAone" id="" className="form-checkbox my-3" value={formInfo.isAone} />

                }

            </div>

            <input type="submit"  value="Update Product" className="btn btn-success my-5" />


        </form>

        </div>


    );

};

export default EditProductForm;