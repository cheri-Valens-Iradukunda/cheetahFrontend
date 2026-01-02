import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { AppLoading } from "../Loading"
import { DamagedNav } from "./DamagedNav"

export const DamagedApproved = () => {

    const dates = new Date()
    const year = dates.getFullYear()
    var month = dates.getMonth() + 1
    month = month < 10? `0${month}`:month
    const [date,setDate] = useState(`${year}-${month}`)
    const [displayFrom,setDisplayFrom] = useState(`${year}-${month}`)
    const [displayTo,setDisplayTo] = useState()
    const [deletedPending,setDeletedPending] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [number,setNumber] = useState(0)
    const [loading,setLoading] = useState(false)
    const [totals,setTotals] = useState(0)

    const getAllPending = () => {
        setLoading(true)
        axios.get(Api.damages.value +"/getAllByDateNotPending/"+date +"/"+number,{headers: Api.Token}).then(res => {
            setDeletedPending(res.data)
            axios.get(Api.damages.value +"/totalDamages",{headers: Api.Token}).then(res => {
                setTotals(res.data)
               
            })
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        setLoading(false)
    }
    useEffect(() => {
        getAllPending()
    },[autoRefresh])
    const handleApprove = (e,id) => {
        setLoading(true)
        axios.get( Api.expenses.value+"/approve/"+ id+ "/approve",{headers: Api.Token}).then(res=> {
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
        axios.get( Api.expenses.value+"/approve/"+ id+ "/denie",{headers: Api.Token}).then(res=> {
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
                <h2 className="h3">{displayFrom} Damages</h2>
                <div className="col-md-6">
                    <form className="form mb-2 d-flex">
                        <input type="month" className="ms-1 form-control" value={date} onChange={e=>setDate(e.target.value)}/>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                        }} className="btn btn-primary btn-sm">search</button>
                    </form>
                    
                </div>
            </div>
            <p style={{fontSize:"14px",backgroundColor:"rgba(255, 255, 0, 0.448)"}}>This search according to date damaged</p>
            <div className="row pb-2">  
                    
                <h4>Total amount of approved damages: {totals}Rwf</h4>
            {
                deletedPending && deletedPending.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={res.status=="rejected"?
                                {background:"rgb(253, 219, 219)"}:res.status=="pending"?{background:"rgb(253, 236, 188)"}:{background:"rgb(216, 233, 248)"}}>

                                    <h5 className="text-capitalize">
                                        {res.product_damaged.price_in_product.product_name} {res.product_damaged.price_in_category.category_name} {res.product_damaged.price_in_type.type_name}
                                    </h5>
                                <p>Quantity: {res.quantity_damaged}</p>
                                <p>amount: {res.amount}</p>
                                <p>Recorded on: {res.date_done}</p>
                                <p>Recorded by: {res.user}</p>
                            </div>

                        </div>
                    
                ))
            }
            </div>

            <div className="buttons">
                <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                    if(number>0){setNumber(number-1)
                    setAutoRefresh(!autoRefresh)}
                }}>prev</div>
                <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                    if(deletedPending.length>=20){setNumber(number+1)
                    setAutoRefresh(!autoRefresh)}
                }}>next</div>
                
            </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}