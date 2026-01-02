import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { DeletedNav } from "./DeletedNav"
import { AppLoading } from "../Loading"

export const PurchaseCredits = () => {

    const dayDate = new Date()
    const year = dayDate.getFullYear()
    var month = dayDate.getMonth() + 1
    month = month<10? `0${month}`:month

    const [date,setDate] = useState(`${year}-${month}`)
    const [displayDate,setDisplayDate] = useState(date)
    const [number,setNumber] = useState(0)
    const [credits,setCredits] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)
    const [paidId,setPaidId] = useState()
    const [isPayingId,setIsPayingId] = useState(false)
    const [payAmount,setPayAmount] = useState()

    const getCredits = () => {
        setLoading(true)
        axios.get(Api.import.value + `/credits/purchase/credit/${date}/${number}`,{headers: Api.Token}).then(res=>{
            setCredits(res.data)
            console.log(res.data)
            setLoading(false)
            setDisplayDate(date)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    useEffect(()=>{
        getCredits()
    },[autoRefresh])

    const handleUpdate = (id) => {
        setLoading(true)
        axios.put(Api.import.value + "/" + id,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }   
    const handleSendPaymentAmount = () => {
        setLoading(true)
        axios.put(Api.import.value + "/" + paidId + "/" + payAmount,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
            setIsPayingId(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    const AddAmountPaid = () =>{
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
                        <h4>Enter amount to be paid</h4>
                        <form className="form" onSubmit={e=> e.preventDefault()}>
                            <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} required min={10}  className=" mb-2 form-control"/>
                            <button onClick={() => handleSendPaymentAmount()} className="btn btn-primary m-1">Send</button>
                            <button className="btn btn-primary m-1" onClick={() => setIsPayingId(false)}>close</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }

    return<>
        <DeletedNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                    
                <h2>{displayDate} purchases credits</h2>
                    <div className="col-md-6 mb-2">
                        <form className="form mt-2 d-flex">
                            <input type="month" className="form-control" onChange={e=>setDate(e.target.value)} />
                            <button className="btn btn-primary btn-sm ms-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setAutoRefresh(!autoRefresh)
                                    console.log(date)
                                }}
                            >search</button>
                        </form>
                    </div>
                    <div className="row">
                    {
                        credits && credits.map((res,index) => (
                            
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                                    <div className="p-2 border border-dark border-1 rounded">

                                            <h5 style={{backgroundColor: "lightblue"}} className="text-capitalize">
                                                {res.product_name} {res.category_name} {res.type_name}
                                            </h5>
                                        <p>Quantity: {res.quantity_used}</p>
                                        <p>amount paid: {res.amount_used}</p>
                                        <p>Amount to be paid: {res.all_amount}</p>
                                        <p>Recorded on: {res.date_done}</p>
                                        <div className="d-flex">
                                            <button onClick={() => {
                                                setPaidId(res.id)
                                                setIsPayingId(true)
                                            }} className="btn-primary w-50">Pay Litle</button>
                                            <button onClick={()=> handleUpdate(res.id)} className="btn-primary w-50">Pay All</button>

                                        </div>
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
                            if(credits.length >=20){setNumber(number+1)
                            setAutoRefresh(!autoRefresh)}
                        }}>next</div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div style={isPayingId?{display:"block"}:{display:"none"}}>
            {AddAmountPaid()}
        </div> 
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}