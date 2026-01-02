import { useEffect, useState } from "react"
import Api from "../Apis"
import axios from "axios"
import { AppLoading } from "../Loading"
import { ExpenseNav } from "./ExpenseNav"

export const ExpensesPending  = () => {

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

    const [message,setMessage] = useState("")
    const [isTextbox,setIsTextbox]  = useState(false)
    const [rejectedId,setRejectedId] = useState()

    const getAllPending = () => {
        setLoading(true)
        axios.get(Api.expenses.value +"/byStatus/"+date +"/"+number + "/pending",{headers: Api.Token}).then(res => {
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
        <ExpenseNav />
        <div className="mt-2">
            <div className="row">
                <h2 className="h3">{displayFrom} pending deletes</h2>
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
            <p style={{fontSize:"14px",backgroundColor:"rgba(255, 255, 0, 0.448)"}}>This search according to date deleted</p>
            <div className="row pb-2">  
            {
                deletedPending && deletedPending.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={{background:"rgb(216, 233, 248)"}}>

                                <h5 className="text-capitalize">{res.expense_name}</h5>
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