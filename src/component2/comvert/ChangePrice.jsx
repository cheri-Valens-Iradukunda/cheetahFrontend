import axios, { Axios } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../Apis';
import { AppLoading } from '../Loading';
import { ResultDisplay } from '../DisplayResults';
import { DeletedNav } from './DeletedNav';

export const ChangePrice = () => {

    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);
    const timeoutRef = useRef(null);
    const [productComponents,setProductComponents] = useState([])
    const [searchProduct,setSearchProduct] = useState("")
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)

    const [price,setPrice] = useState(0)
    const [productId, setProductId] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        axios.get(Api.comvert.value + `/price/${productId}/${price}`,{headers: Api.Token}).then(res=>{
            alert(res.data)
            setLoading(false)
            setSearchProduct()
            setProductId(0)
            setPrice(0)
            setSearchProduct("")
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

    return (
        <div>
            <DeletedNav />
            {/* {inputs.length<1?addInputGroup:<></>} */}
            <form onSubmit={handleSubmit} className='form was-validated'>
                <div className='mt-2'>
                    <h2 className='text-center'>Import New Products</h2>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 bg-light">
                                    <div>
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
                                                    <select required name="price_id" value={productId}  onChange={(e) => setProductId(e.target.value)} className="form-select mt-2" id="">
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
                                            <div className="first_div">
                                                <label className="form-label">New Amount</label>
                                                <input required min="1"
                                                    type="number"
                                                    name="quantity_used"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                            
                                            
                                        {/* </div> */}
                                        </div>
                                        
                                        <button type="submit" className="btn mt-5 w-100 btn-success">
                                            Submit
                                        </button>
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

// export default ImportsForm;
