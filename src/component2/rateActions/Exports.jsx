import axios, { Axios } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../Apis';
import { ImportsNav } from './ImportsNav';
import { AppLoading } from '../Loading';
// import { ResultDisplay } from '../DisplayResults';

export const AddRateExport = () => {

    
    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    const day = date.getDate()

    const [toDayDate,setToDayDate] = useState(`${year}-${month}-${day}`)
    const [imports,setImports] = useState()
    const [number,setNumber ] = useState(0)

    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);
    const timeoutRef = useRef(null);
    const [productComponents,setProductComponents] = useState([])
    const [isClicked,setIsClicked] = useState(true)
    const [searchProduct,setSearchProduct] = useState("")
    const [selectedIndex,setSelectedIndex] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)
    const [returns,setReturns] = useState([])
    const [isDisplayResults,setIsDisplayResults] = useState(false)
    const [inputs, setInputs] = useState([
        {
            "price_id": 0,
            "all_amount": 0,
            "date_done": "",
            "quantity_used": 0,
        }
    ]);
    const [currentPage, setCurrentPage] = useState(0);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        var concatination;
        if(value.includes("T")){
            const newValue = value.split("T")
            concatination = `${newValue[0]} ${newValue[1]}:00`
        }else{
            concatination = value
        }
        updatedInputs[index] = { ...updatedInputs[index], [name]: concatination};
        setInputs(updatedInputs);
    };

    const addInputGroup = () => {
        setInputs([
            ...inputs,
            {
                
                "price_id": 0,
                "all_amount": 0,
                "date_done": "",
                "quantity_used": 0,
            }
        ]);
        setCurrentPage(inputs.length);
        console.log(inputs)
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
        axios.post(Api.lateAction.value + "/export", inputs,{headers: Api.Token}).then(res=>{
            // alert(res.data)
            setLoading(false)
            setReturns(res.data)
            setIsDisplayResults(true)
            setInputs([])
            if(inputs.length<1){
                alert(inputs.length)
                setInputs([])
            setInputs(...inputs,[
                {
                    
                    "price_id": 0,
                    "all_amount": 0,
                    "date_done": "",
                    "quantity_used": 0,
                }
            ])}
            setSearchProduct()
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    };

    const handleKeyPress = () => {
        const currentTime = new Date().getTime();
        setLastKeyPressTime(currentTime);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if(searchProduct && searchProduct.length >2){
                setLoading(true)
                axios.get(Api.products.value + "/getProductsByProductName/" + searchProduct,{headers: Api.Token}).then(res=>{
                    setLoading(false)
                    setProductComponents(res.data)
                }).catch(()=>{
                    localStorage.removeItem("token");
                    window.location.replace("/")
                    alert("back to login")
                })
            
            }
        }, 2000);
    };

    useEffect(() => {
        // getImports()
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

    return (
        <div>
            <ImportsNav />
            {/* {inputs.length<1?addInputGroup:<></>} */}
            <form onSubmit={handleSubmit} className='form was-validated'>
                <div className='mt-2'>
                    <h2 className='text-center'>Export New Rate Products</h2>
                    <div className="row">
                        
                        <div className="col-md-6 bg-light">
                                {inputs && inputs.map((inputGroup, index) => (
                                    index === currentPage && (
                                        <div key={index} >
                                            <div className="row d-flex">
                                                <label className="form-label">Product</label>
                                                    <div>
                                                        <input
                                                            value={searchProduct}
                                                            type="text" required
                                                            onChange={e=>setSearchProduct(e.target.value)}
                                                            onKeyUp={handleKeyPress}
                                                            className="form-control"
                                                            
                                                        />
                                                        <select required name="price_id" value={inputGroup.price_id}  onChange={(e) => handleInputChange(index, e)} className="form-select mt-2" id="">
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
                                                <div className="col-md-6 first_div">
                                                    <label className="form-label">Quantity</label>
                                                    <input required min="1"
                                                        type="number"
                                                        name="quantity_used"
                                                        value={inputGroup.quantity_used}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 second_div">
                                                    
                                                    <label className="form-label">All amount</label>
                                                    <input required min="1"
                                                        type="number"
                                                        name="all_amount"
                                                        value={inputGroup.amount_used}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                    <label className="form-label">Date</label>
                                                    <input required
                                                        type="datetime-local"
                                                        
                                                        name="date_done"
                                                        value={inputGroup.min_price}
                                                        min={10}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                
                                            {/* </div> */}
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

            <div className="container-fluid">
                {isDisplayResults?displayResults():<></>}
            </div>
            <div style={loading?{display:"block"}:{display:"none"}}>
                <AppLoading />
            </div>         
        </div>
    );
};

// export default ImportsForm;
