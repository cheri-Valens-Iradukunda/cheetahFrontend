import { useEffect, useState } from "react"
import Api from "../Apis"
import axios from "axios"
import { AppLoading } from "../Loading"
import { DamagedNav } from "./DamagedNav"

export const DamagedPending  = () => {

    const [deletedPending,setDeletedPending] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [number,setNumber] = useState(0)
    const [loading,setLoading] = useState(false)

    const getAllPending = () => {
        setLoading(true)
        axios.get(Api.damages.value +"/getAllPendings",{headers: Api.Token}).then(res => {
            setDeletedPending(res.data)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    useEffect(() => {
        getAllPending()
    },[autoRefresh])
    const handleApprove = (e,id) => {
        setLoading(true)
        axios.get( Api.damages.value+"/approve/"+ id+ "/approve",{headers: Api.Token}).then(res=> {
            alert(res.data)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    const handleDenie = (e,id) => {
        setLoading(true)
        e.preventDefault()
        axios.get( Api.damages.value+"/approve/"+ id+ "/denie",{headers: Api.Token}).then(res=> {
            alert(res.data)
            setLoading(false)
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    return <>
        <DamagedNav />
        <div className="mt-2">
            <div className="row">
                <h2 className="h3">Pending Damages</h2>
            </div>
            <div className="row pb-2">  
            {
                deletedPending && deletedPending.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={{background:"rgb(216, 233, 248)"}}>

                                <h5 className="text-capitalize">
                                    {res.product_damaged.price_in_product.product_name} {res.product_damaged.price_in_category.category_name} {res.product_damaged.price_in_type.type_name}
                                    
                                    </h5>
                                <p>Quantity: {res.quantity_damaged}</p>
                                <p>amount: {res.amount}</p>
                                <p>Recorded on: {res.date_done}</p>
                                <p>Recorded by: {res.user}</p>
                                <button className="btn btn-primary w-50 rounded btn-sm"
                                    onClick={(e) => {handleApprove(e,res.id)}}
                                >approve</button>
                                <button className="btn btn-danger w-50 rounded btn-sm"
                                    onClick={(e) => handleDenie(e,res.id)}
                                >reject</button>
                            </div>

                        </div>
                    
                ))
            }
            </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}