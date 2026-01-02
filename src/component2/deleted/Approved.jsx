import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { DeletedNav } from "./DeletedNav"
import { AppLoading } from "../Loading"

export const Approved = () => {

    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    const day = date.getDate()
    const day1 = day-1 <10? `0${day-1}`:day-1
    // const fromDate = month-1 <1?year-1+"-12-31":day-1<1?year + "-" + month-1 + "-28":`${year}-${month}-${day1}`;
    const [from,setFrom] = useState(`${year}-${month}-${day<10?`0${day}`:day}`)
    const [to,setTo] = useState(`${year}-${month}-${day<10?`0${day}`:day}`)
    const [displayFrom,setDisplayFrom] = useState()
    const [displayTo,setDisplayTo] = useState()
    const [deletedApproved,setDeletedApproved] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [number,setNumber] = useState(0)
    const [loading,setLoading] = useState(false)

    const getAllApproved = () => {
        setLoading(true)
        axios.get(Api.delete.value +`/${from}/${to}/${number}`,{headers: Api.Token}).then(res => {
            setDeletedApproved(res.data)
            setDisplayFrom(from)
            setDisplayTo(to)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    useEffect(() => {
        getAllApproved()
    },[autoRefresh])
    return <>
        <DeletedNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-sm-12">
                    <h2 className="h3">{displayFrom} to {displayTo} approved deletes</h2>
                    <div className="col-md-6">
                        <form className="form mb-2 d-flex">
                            <input type="date" className="ms-1 form-control" value={from} onChange={e=>setFrom(e.target.value)}/>
                            <input type="date" className="ms-1 me-1 form-control" value={to} onChange={e=>setTo(e.target.value)}/>
                            
                            <button onClick={(e) => {
                                e.preventDefault()
                                setAutoRefresh(!autoRefresh)
                            }} className="btn btn-primary btn-sm">search</button>
                        </form>
                    </div>
                    <p style={{fontSize:"14px",backgroundColor:"rgba(255, 255, 0, 0.448)"}}>This search according to date deleted</p>
                    
                    <div className="row pb-2">  
            {
                deletedApproved && deletedApproved.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={res.status=="rejected"?
                                {background:"rgb(253, 219, 219)"}:{background:"rgb(216, 233, 248)"}}>

                                <h5>{res.product_name} {res.category_name} {res.type_name}</h5>
                                <p>Quantity deleted: {res.quantity}</p>
                                <p>Action: {res.stock_action}</p>
                                <p>Deleted on: {res.date_deleted}</p>
                                <p>Deleted by: {res.user}</p>
                                <p>Reason: {res.reason}</p>
                                <p>decision: {res.status}</p>
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
                            if(deletedApproved.length>=20){setNumber(number+1)
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