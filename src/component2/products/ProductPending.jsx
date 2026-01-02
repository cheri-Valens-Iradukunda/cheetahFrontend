import axios from "axios"
import { useEffect, useState } from "react"
import Api from "../Apis"
import { ProductsNav } from "./ProductsNav"
import { AppLoading } from "../Loading"

export const ProductPending = () => {

    const [products,setProducts] = useState([])
    const [productName,setProductName] = useState("all") 
    const [displayProductName,setDisplayProductName] = useState(productName)
    const [number,setNumber] = useState(0)
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)

    const getProducts = () => {
        setLoading(true)
        axios.get(Api.products.value + "/getAllProducts/" + productName + "/" + number + "/deleted",{headers: Api.Token}).then(res=>{
            setProducts(res.data)
            setDisplayProductName(productName)
            setProductName("all")
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        });
    }

    const handleApprove = (id,status) => {
        setLoading(true)
        axios.get(Api.products.value + "/approve/" + status + "/" + id ,{headers: Api.Token}).then(res=>{
            alert(res.data)
            setLoading(false)
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        });
    }

    useEffect(() => {

        getProducts()
    },[autoRefresh])

    return<>
        <ProductsNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                    <h2>Deleted Products</h2>
                    <p className="bg-info ps-2"><strong>Remember!</strong> approve, will erase all related data in a system</p>
                    <table className="table table-sm table-bordered table-striped">
                        <thead className="text-uppercase">
                            <tr>
                                <th>product</th>
                                <th>category</th>
                                <th>type</th>
                                <th>quantity remain</th>
                                <th>min price</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && products.map((res,index) => (
                                    <tr key={index}>
                                        <td>{res.product_name}</td>
                                        <td>{res.category_name}</td>
                                        <td>{res.type_name}</td>
                                        <td>{res.quantity_remain}</td>
                                        <td>{res.min_price}</td>
                                        <td>
                                            <button onClick={() => {handleApprove(res.price_id,"approve")}} className="btn btn-primary btn-sm m-1">Approve</button>
                                            <button onClick={() => {handleApprove(res.price_id,"rejected")}} className="btn btn-danger btn-sm m-1">Reject</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="buttons">
                            <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                                if(number>0){setNumber(number-1)
                                setProductName(displayProductName)
                                setAutoRefresh(!autoRefresh)}else{setNumber(0)}
                            }}>prev</div>
                            <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                                // number>=0?setNumber(number+1):setNumber(0)
                                if(products.length >= 20) {setNumber(number+1)
                                setProductName(displayProductName)
                                setAutoRefresh(!autoRefresh)}
                            }}>next</div>
                            
                        </div>
                </div>
            </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}