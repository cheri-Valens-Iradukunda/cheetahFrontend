import { useEffect, useState } from "react"
import Api from "../Apis"
import { DeletedNav } from "./DeletedNav"
import axios from "axios"
import { AppLoading } from "../Loading"

export const Pending  = () => {

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
    const [deletedPending,setDeletedPending] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [number,setNumber] = useState(0)
    const [loading,setLoading] = useState(false)

    const [message,setMessage] = useState("")
    const [isTextbox,setIsTextbox]  = useState(false)
    const [rejectedId,setRejectedId] = useState()

    const getAllPending = () => {
        setLoading(true)
        axios.get(Api.delete.value +"/pending/"+from+"/"+to+"/"+number,{headers: Api.Token}).then(res => {
            setDeletedPending(res.data)
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
        getAllPending()
    },[autoRefresh])
    const handleApprove = (e,id) => {
        setLoading(true)
        axios.delete( Api.delete.value+"/approveDelete/approved/"+ id+ "/none",{headers: Api.Token}).then(res=> {
            alert(res.data)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    const handleDenie = (e) => {
        setLoading(true)
        e.preventDefault()
        axios.delete( Api.delete.value +"/approveDelete/rejected/"+ rejectedId+"/"+message,{headers: Api.Token}).then(res=> {
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

    const addReason = () =>{
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
                        <form onSubmit={(e) =>{handleDenie(e)}} className="form">
                            <label htmlFor="reason" className="form-label w-100">Reason:</label>
                            <textarea id="reason" className="form-text w-75" value={message} onChange={e=>setMessage(e.target.value)}></textarea>
                            <br /><button className="btn btn-primary btn-sm mb-2">Save</button>
                            <button onClick={e=>{
                                e.preventDefault()
                                setIsTextbox(false)
                            }} className="btn btn-primary btn-sm mb-2 ms-2">Close</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    }

    return <>
        <DeletedNav />
        <div className="mt-2">
            <div className="row">
                <h2 className="h3">{displayFrom} to {displayTo} pending deletes</h2>
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
            </div>
            <p style={{fontSize:"14px",backgroundColor:"rgba(255, 255, 0, 0.448)"}}>This search according to date deleted</p>
            <div className="row pb-2">  
            {
                deletedPending && deletedPending.map((res,index) => (
                    
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                            <div className="p-2 border border-dark border-1 rounded" style={{background:"rgb(216, 233, 248)"}}>

                                <h5>{res.product_name} {res.category_name} {res.type_name}</h5>
                                <p>Quantity deleted: {res.quantity}</p>
                                <p>Action: {res.stock_action}</p>
                                <p>Deleted on: {res.date_deleted}</p>
                                <p>Deleted by: {res.user}</p>
                                <p>Reason: {res.reason}</p>
                                <button className="btn btn-primary w-50 rounded btn-sm"
                                    onClick={(e) => {handleApprove(e,res.deleted_id)}}
                                >approve</button>
                                <button className="btn btn-danger w-50 rounded btn-sm"
                                    onClick={(e) => {
                                        setRejectedId(res.deleted_id)
                                        setIsTextbox(true)}}
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

        <div>
            {isTextbox?addReason():<></>}
        </div> 
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}