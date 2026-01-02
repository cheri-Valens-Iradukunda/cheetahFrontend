import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import Api from '../Apis';
import { ProductsNav } from './ProductsNav';
import { AppLoading } from '../Loading'
import { ResultDisplay } from '../DisplayResults';

export const AddProduct = () => {

    const [selectedIndex,setSelectedIndex] = useState()
    const [loading, setLoading] = useState(false)
    const [returns,setReturns] = useState()
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [displayResults,setDisplayResults] = useState(false)
    const [inputs, setInputs] = useState([
        {
            "product_name": "",
            "category_name": "",
            "type_name": ""
        }
    ]);
    const [currentPage, setCurrentPage] = useState(0);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        updatedInputs[index] = { ...updatedInputs[index], [name]: value };
        setInputs(updatedInputs);
    };

    const addInputGroup = () => {
        setInputs([
            ...inputs,
            {
                "product_name": "",
                "category_name": "",
                "type_name": ""
              }
        ]);
        setCurrentPage(inputs.length);
        // setProductComponents([])
    };

    const removeInputGroup = (index) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        setInputs(updatedInputs);
        setCurrentPage(Math.max(0, currentPage - 1));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        setLoading(true)
        axios.post(Api.products.value + "/saveProducts", inputs,{headers: Api.Token}).then(res=>{
            // alert(res.data)
            setReturns(res.data)
            console.log(res.data)
            setLoading(false)
            alert(res.data)
            setDisplayResults(true)
            setInputs([
                {
                    "product_name": "",
                    "category_name": "",
                    "type_name": ""
                  }
            ])
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    };
    const dropdownDivStyle ={
        display:"none"
    }
    const dropdownDivStyle2 = {
        display: "block"
    }
    
    return (
        <div>
            <ProductsNav />
            <form onSubmit={handleSubmit} className='form was-validated'>
                <div className='mt-2'>
                    <h2 className='text-center'>Import New Products</h2>
                    <div className="row">
                        <div className="col-md-6 bg-light">
                                {inputs && inputs.map((inputGroup, index) => (
                                    index === currentPage && (
                                        <div key={index} >
                                            <div className="row d-flex">
                                                <div className="col-md-12 first_div">
                                                    <label className="form-label">Product name</label>
                                                    <input required min="1"
                                                        type="text"
                                                        name="product_name"
                                                        value={inputGroup.product_name}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                    <label className="form-label">Category name</label>
                                                    <input required min-length="1"
                                                        type="text"
                                                        name="category_name"
                                                        value={inputGroup.category_name}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                    <label className='form-label'>Type name</label>
                                                    <input required min-length="1"
                                                        type="text"
                                                        name="type_name"
                                                        value={inputGroup.type_name}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-2"
                                                onClick={() => removeInputGroup(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )
                                ))}
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-6">
                                    <div className=' col-md mt-3 '>
                                        <button type="button" className="btn btn-primary mt-5 w-100" onClick={addInputGroup}>
                                            Add Input Group
                                        </button><br />
                                        <button type="submit" className="btn mt-5 w-100 btn-success">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>  
            <div style={loading?{display:"block"}:{display:"none"}}>
                <AppLoading />
            </div>       
        </div>
    );
};

