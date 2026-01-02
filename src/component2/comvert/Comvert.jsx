import axios, { Axios } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../Apis';
import { AppLoading } from '../Loading';
import { DeletedNav } from './DeletedNav';

export const Comvert = () => {

    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);
    const timeoutRef = useRef(null);
    const [productComponents,setProductComponents] = useState([])
    const [productComponentsTo,setProductComponentsTo] = useState([])
    const [searchProduct,setSearchProduct] = useState("")
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)
    const [returns,setReturns] = useState([])
    const [isDisplayResults,setIsDisplayResults] = useState(false)
    const [fromQuantity,setFromQuantity] = useState(0);
    const [toQuantity,settoQuantity] = useState(0);
    const [toId,setToId] = useState(0);
    const [fromId,setFromId] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        const inputs = {
                "from_quantity":fromQuantity,
                "to_quantity":toQuantity,
                "from_product": fromId,
                "to_product": toId,
                "user": localStorage.getItem("username")
            }
        axios.post(Api.comvert.value + "/", inputs,{headers: Api.Token}).then(res=>{
            alert(res.data)
            setLoading(false)
            setReturns(res.data)
            setIsDisplayResults(true)
            setFromId(0)
            setToId(0)
            setFromQuantity(0)
            settoQuantity(0)
          
            setSearchProduct()
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    };

    const handleKeyPressFrom = () => {
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

    const handleKeyPressTo = () => {
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
                    setProductComponentsTo(res.data)
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

    
    return (
        <div>
            <DeletedNav />
            <form onSubmit={handleSubmit} className='form was-validated'>
                <div className='mt-2'>
                    <h2 className='text-center'>Import New Products</h2>
                    <div className="row">
                        <div className="col-md-6 first_div">
                            <label className="form-label">From Product</label>
                            <div>
                                <input
                                    value={searchProduct}
                                    type="text" required
                                    onChange={e=>setSearchProduct(e.target.value)}
                                    onKeyUp={handleKeyPressFrom}
                                    className="form-control"
                                    
                                />
                                <select required name="price_id" value={fromId}  onChange={(e) => setFromId(e.target.value)} className="form-select mt-2" id="">
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
                            <label className="form-label">Quantity</label>
                            <input required min="1"
                                type="number"
                                name="quantity_used"
                                value={fromQuantity}
                                onChange={(e) => setFromQuantity(e.target.value)}
                                className="form-control"
                            /> 
                        </div>
                        
                        <div className="col-md-6 first_div">
                            <label className="form-label">To Product</label>
                            <div>
                                <input
                                    value={searchProduct}
                                    type="text" required
                                    onChange={e=>setSearchProduct(e.target.value)}
                                    onKeyUp={handleKeyPressTo}
                                    className="form-control"
                                    
                                />
                                <select required name="price_id" value={toId}  onChange={(e) => setToId(e.target.value)} className="form-select mt-2" id="">
                                    <option value="">See results</option>
                                    {
                                        productComponentsTo.length > 0? productComponentsTo.map((comp,index) =>(
                                            <option key={index} value={comp.price_id}>
                                                {comp.product_name}-{comp.category_name}-
                                                {comp.type_name}-{comp.quantity_remain}P-
                                                {comp.min_price}rwf
                                                </option>
                                        )):<option>no product</option>
                                    }
                                </select>
                            </div>
                            <label className="form-label">Quantity</label>
                            <input required min="1"
                                type="number"
                                name="quantity_used"
                                value={toQuantity}
                                onChange={(e) => settoQuantity(e.target.value)}
                                className="form-control"
                            />    
                        </div>
                        <button className="btn btn-primary w-25 m-2 rounded">Send</button>
                    </div>
                </div>
            </form>  

            <div style={loading?{display:"block"}:{display:"none"}}>
                <AppLoading />
            </div>         
        </div>
    );
};

// export default ImportsForm;
