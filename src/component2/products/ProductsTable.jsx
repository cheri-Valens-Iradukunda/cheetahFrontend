import axios from "axios"
import { useEffect, useState } from "react"
import Api from "../Apis"
import { ProductsNav } from "./ProductsNav"
import { AppLoading } from "../Loading"

export const ProductTable = () => {

    const [products,setProducts] = useState([])
    const [productName,setProductName] = useState("all") 
    const [displayProductName,setDisplayProductName] = useState(productName)
    const [number,setNumber] = useState(0)
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)

    const getProducts = () => {
        setLoading(true)
        axios.get(Api.products.value + "/getAllProducts/" + productName + "/" + number + "/none",{headers: Api.Token}).then(res=>{
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

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete(Api.products.value + "/" + id ,{headers: Api.Token}).then(res=>{
            // setProducts(res.data)
            // setDisplayProductName(productName)
            // setProductName("all")
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
                    <div className="col-md-5">
                        <h2>{displayProductName} products</h2>
                        <form className="form d-flex mb-2">
                            <input type="text"className="form-control" placeholder="Search by product" value={productName} 
                            onChange={e=>setProductName(e.target.value)} />
                            <button onClick={(e)=> {
                                e.preventDefault()
                                setNumber(0)
                                setAutoRefresh(!autoRefresh)
                            }} className="btn btn-primary btn-sm ms-2">
                                {
                                    productName != "all"? <>search</>:<>getAll</>
                                }</button>
                        </form>
                    </div>
                    
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
                                        <td><button onClick={() => {handleDelete(res.price_id)}} className="btn btn-primary btn-sm">delete</button></td>
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