import { useEffect, useState } from "react"
import Api from "../Apis"
import { DeletedNav } from "./DeletedNav"
import axios from "axios"
import { AppLoading } from "../Loading"

export const ComvertPending  = () => {

    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    const day = date.getDate()
    const day1 = day-1 <10? `0${day-1}`:day-1
    // const fromDate = month-1 <1?year-1+"-12-31":day-1<1?year + "-" + month-1 + "-28":`${year}-${month}-${day1}`;
    const [from,setFrom] = useState(`${year}-${month}-${day<10?`0${day}`:day}`)
    const [displayFrom,setDisplayFrom] = useState()
    const [displayTo,setDisplayTo] = useState()
    const [deletedPending,setDeletedPending] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [number,setNumber] = useState(0)
    const [loading,setLoading] = useState(false)

    const [message,setMessage] = useState("")
    const [isTextbox,setIsTextbox]  = useState(false)
    const [rejectedId,setRejectedId] = useState()

    const getAllPending = () => {
        setLoading(true)
        axios.get(Api.comvert.value +"/"+from+"/pending",{headers: Api.Token}).then(res => {
            setDeletedPending(res.data)
            setDisplayFrom(from)
            // setDisplayTo(to)
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
        axios.get( Api.comvert.value+"/approve/"+ id,{headers: Api.Token}).then(res=> {
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
        axios.delete( Api.comvert.value +"/reject/"+ id,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setLoading(false)
            setIsTextbox(false)
            setMessage("")
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    return <>
        <DeletedNav />
        <div className="mt-2">
            <div className="row">
                <h2 className="h3">{displayFrom} pending deletes</h2>
                <div className="col-md-6">
                    <form className="form mb-2 d-flex">
                        <input type="date" className="ms-1 form-control" value={from} onChange={e=>setFrom(e.target.value)}/>
                        
                        <button onClick={(e) => {
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                        }} className="btn btn-primary btn-sm">search</button>
                    </form>
                    
                </div>
            </div>
            <div className="row pb-2">
                  
            {
                deletedPending && deletedPending.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={{background:"rgb(216, 233, 248)"}}>

                                <h5>From: {res.from_product.price_in_product.product_name} {res.from_product.price_in_category.category_name} {res.from_product.price_in_type.type_name}</h5>
                                <h5>To: {res.to_product.price_in_product.product_name} {res.to_product.price_in_category.category_name} {res.to_product.price_in_type.type_name}</h5>
                                
                                <p>From Quantity: {res.from_quantity}</p>
                                <p>To Quantity: {res.to_quantity}</p>
                                <p>Amount: {res.amount}</p>
                                <p>Comverted on: {res.date_done}</p>
                                <p>Comverted by: {res.user}</p>
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