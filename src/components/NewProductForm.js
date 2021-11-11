import React, {useState} from 'react';

import axios from 'axios';

import { useHistory } from 'react-router-dom';


const NewProductForm = (props) => { 

    const history = useHistory();




    const [formInfo, setFormInfo] = useState ({

        title:"",

        price:"",

        description:"",

        date:"",

        isAone:false,

        productPicUrl:""

    })



    const [formErrors, setFormErrors] = useState ({

        title:"",

        price:"",

        description:"",

        date:""

    })



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

        axios.post("http://localhost:8000/api/product/create", formInfo)

        .then(response => {

            console.log(response)

            if(response.data.error){

                setFormErrors(response.data.error.errors)

            }else{

            props.setFormSubmitted(!props.formSubmitted)

            setFormInfo({

                title:"",
        
                price:"",

                description:"",
        
                date:"",
        
                isAone:false,
        
                productPicUrl:""
        
            })

            setFormErrors({

                title:"",
        
                price:"",

                description:"",
        
                date:""
        
            })

            history.push("/")

        }


        })

        .catch(error => console.log("Error submitting the post request --->", error))

    }




    return (

        <div>

        <h2 className="my-3"> <u> Create Product </u> </h2>

        <form onSubmit = {submitHandler}>


            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3" >Title:</label>

                <input onChange={changeHandler} type="text" name="title" id="" className="form-control my-3" value={formInfo.title} />

                <p className="text-danger mx-3" > {formErrors.title?.message} </p>

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3">Price:</label>

                <input onChange={changeHandler} type="number" name="price" id="" className="form-control my-3" value={formInfo.price} />

                <p className="text-danger mx-3" > {formErrors.price?.message} </p>

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3"> Description: </label>

                <input onChange={changeHandler} type="text" name="description" id="" className="form-control my-3" value={formInfo.description} />

                <p className="text-danger mx-3" > {formErrors.description?.message} </p>

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-3">Date:</label>

                <input onChange={changeHandler} type="date" name="date" id="" className="form-control my-3" value={formInfo.date} />

                <p className="text-danger mx-3" > {formErrors.date?.message} </p>

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-4">Product Image Link:</label>

                <input onChange={changeHandler} type="text" name="productPicUrl" id="" className="form-control my-3" value={formInfo.productPicUrl} />

            </div>



            <div className="d-flex form-group my-3 align-items-center">

                <label className="mx-4">A-1 Quality Grade?</label>

                <input onChange={changeHandler} type="checkbox" name="isAone" id="" className="form-checkbox my-3" value={formInfo.isAone} />

            </div>

            <input type="submit"  value="Create Product" className="btn btn-success my-5" />


        </form>

        </div>


    );

};

export default NewProductForm;