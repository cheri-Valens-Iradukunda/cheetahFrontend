import axios, { Axios } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../Apis';
import { AppLoading } from '../Loading';
import { ImportsNav } from './ImportsNav';

export const RateDamagedForm = () => {
    const localDate = new Date();
    let year = localDate.getFullYear();
    let month = localDate.getMonth() + 1;
    month = month < 10 ? `0${month}`:month
    const fullYear = new Date(`${year}-${month}`);

    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);
    const timeoutRef = useRef(null);
    const [productComponents,setProductComponents] = useState([])
    const [isClicked,setIsClicked] = useState(true)
    const [searchProduct,setSearchProduct] = useState("")
    const [selectedIndex,setSelectedIndex] = useState()
    const [returnedSubmition,setReturnedSubmition] = useState()
    const [openCloseSubmitionValues,setOpenCloseSubmitionValues] = useState(0)
    const [loading,setLoading] = useState(false)
    
    const [isForm,setIsForm] = useState(0)
    const [date,setDate] = useState(`${year}-${month}`)
    const [newDate,setNewDate] = useState(`${year}-${month}`)
    // const [autoRefresh,setAutoRefresh] = useState()
    const [allDamages,setAllDamages] = useState()

    const [autoRefresh,setAutoRefresh] = useState(false)
    const [isDisplayResults,setIsDisplayResults] = useState(false)
    const [returns,setReturns] = useState([])
    const [inputs, setInputs] = useState([
        {
            "date_done": "",
            "price_id": 0,
            "quantity_damaged": 0,
            "user": localStorage.getItem("username")
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
                "date_done": "",
                "price_id": 0,
                "quantity_damaged": 0,
                "user": localStorage.getItem("username")
            }
        ]);
        setCurrentPage(inputs.length);
        setProductComponents([])
        setSearchProduct("")
    };

    const removeInputGroup = (index) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        setInputs(updatedInputs);
        setCurrentPage(Math.max(0, currentPage - 1));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        console.log(inputs);

        axios.post(Api.passive.value + "/damages", inputs,{headers: Api.Token}).then(res=> {
            setReturns(res.data)
            setIsDisplayResults(true)
            if(res.data == null){
                alert("done")
            }
            else{
                
                setOpenCloseSubmitionValues(1)
                // alert(returnedSubmition)
            }

            setInputs([
                // {
                //     "price_id": 0,
                //     "quantity_damaged": 0,
                //     "user": localStorage.getItem("username")
                // }
            ]);
            setProductComponents([])
            setSearchProduct("")
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleKeyPress = () => {
        const currentTime = new Date().getTime();
        setLastKeyPressTime(currentTime);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // console.log(searchProduct.length)
            // console.log(searchProduct)
            if(searchProduct && searchProduct.length >2){
                setLoading(true)
                axios.get(Api.products.value + "/getProductsByProductName/" + searchProduct,{headers: Api.Token}).then(res=>{
                    setProductComponents(res.data)
                    setLoading(false)
                }).catch(()=>{
                    localStorage.removeItem("token");
                    window.location.replace("/")
                    alert("back to login")
                })
            }
        }, 2000);
    };
   
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
        };
    },[autoRefresh])
    const dropdownDivStyle ={
        display:"none"
    }
    const dropdownDivStyle2 = {
        display: "block"
    }

    const displayResults = () =>{
        return<>
            <div className="container-fluid result_display" style={{
                position: "absolute",
                top:"0",
                left:"0",
                right:"0",
                bottom:"0",
                background: "linear-gradient(rgba(2, 21, 107, 0.445),rgba(1, 78, 78, 0.445))",
                backdropFilter: "blur(5px)"
            }}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 bg-light">
                        <h4>Results for actions</h4>
                        {returns && returns.map((singleReturn,index)=>(
                            <div key={index}>
                                <ul>{
                                        singleReturn.includes("successfully")?<li style={{background:"rgb(240, 240, 143)"}}>
                                            {singleReturn}
                                        </li>:
                                        <li style={{background:"rgb(194, 194, 194)"}}>
                                            {singleReturn}
                                        </li>
                                    }
                                </ul>
                            </div>
                        ))}
                        <button className="btn btn-primary mb-2" onClick={() => setIsDisplayResults(false)}>close</button>
                    </div>
                </div>
            </div>
        </>
    }    

    return (<>
        <ImportsNav />
        <div className="mt-2">
            <form onSubmit={handleSubmit} className='form was-validated'>
                <div className=' rounded'>
                    <h2 className='text-center'>Damaged Products</h2>
                    <div className="row">
                        
                        <div className="col-md-6 bg-light">
                                {inputs.map((inputGroup, index) => (
                                    index === currentPage && (
                                        <div key={index} >
                                            <div className="row d-flex">
                                                <label className="form-label">Product</label>
                                                    <div>
                                                        <input
                                                            type="text" required
                                                            onChange={e=>setSearchProduct(e.target.value)}
                                                            onKeyUp={handleKeyPress}
                                                            value={searchProduct}
                                                            className="form-control"
                                                            
                                                        />
                                                        {/* value={inputGroup.price_id} */}
                                                        <select name="price_id" required  onChange={(e) => handleInputChange(index, e)} className="form-select mt-2" id="">
                                                            <option value="">See results</option>
                                                            {
                                                                productComponents.length > 0? productComponents.map((comp,index) =>(
                                                                    <option key={index} value={comp.price_id}>
                                                                    {comp.product_name}-{comp.category_name}-
                                                                    {comp.type_name}-{comp.quantity_remain}P-
                                                                    {comp.min_price}rwf
                                                                    </option> 
                                                                )):<option>no product</option>
                                                            }
                                                        </select>
                                                    </div>
                                                <div className="col-md-12 first_div">
                                                    <label className="form-label">Quantity</label>
                                                    <input required min="1"
                                                        type="number"
                                                        name="quantity_damaged"
                                                        value={inputGroup.quantity_damaged}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                    <label className="form-label">Date</label>
                                                    <input required min="1"
                                                        type="date"
                                                        name="date_done"
                                                        value={inputGroup.date_done}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                
                                            {/* </div> */}
                                            </div>
                                            
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-2 mb-2"
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
                    <div className="mt-2 pb-2">
                    {inputs.map((_, index) => (
                        <p
                            key={index}
                            type="button"
                            className={`btn btn-secondary mx-1`}
                            // onClick={() => goToPage(index)}
                        >
                            {index + 1}
                        </p>
                    ))}</div>
                </div>
            </form>
        </div>
        <div className="container-fluid">
            {isDisplayResults?displayResults():<></>}
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
        </>
    );
}