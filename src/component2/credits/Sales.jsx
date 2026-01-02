import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { AppLoading } from "../Loading"
import "./Deleted.css"

export const SellCredits = () => {

    const [user,setuser] = useState("regular")
    const [number,setNumber] = useState(0)
    const [credits,setCredits] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)
    const [paidId,setPaidId] = useState()
    const [isPayingId,setIsPayingId] = useState(false)
    const [payAmount,setPayAmount] = useState()
    
    const [summary,setSummary] = useState([0,0])

    const getCredits = () => {
        setLoading(true)
        axios.get(Api.credit.value + `/${number}`,{headers: Api.Token}).then(res=>{
            setCredits(res.data)
            console.log(res.data)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        axios.get(Api.credit.value + `/summary`,{headers: Api.Token}).then(res=>{
            setSummary(res.data)
        }).catch(e=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    useEffect(()=>{
        getCredits()
    },[autoRefresh])
    

    const handlePay = (id) => {
        setLoading(true)
        axios.get(Api.credit.value + `/pay/${id}`,{headers: Api.Token}).then(res=>{
            // setCredits(res.data)
            console.log(res.data)
            setLoading(false)
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    const searchByname = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.get(Api.credit.value + `/search/${user}`,{headers: Api.Token}).then(res=>{
            setCredits(res.data)
            console.log(res.data)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })

    }

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete(Api.credit.value + `/${id}`,{headers: Api.Token}).then(res=>{
            console.log(res.data)
            setLoading(false)
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    return<>
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                <h2> Sales credits</h2>
                <div className="col-md-6">
                        <form className="form mt-2 mb-2 d-flex">
                            <input type="text" className="form-control" onChange={e=>setuser(e.target.value)} />
                            <button className="btn btn-primary ms-2 btn-sm"
                                onClick={(e) => {
                                    searchByname(e)
                                }}
                            >search</button>
                        </form>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <h3 className="card full h4 p-2" style={{ background: "#EAEAEA", textAlign: "center" }}>
                            Total Number of Credits: {summary[0]}
                        </h3>
                        <h3 className="card w-full h4 p-2" style={{ background: "#EAEAEA", textAlign: "center" }}>
                            Total Amount in Credits: {summary[1]}
                        </h3>
                    </div>
                    <div className="row">
                    {
                        credits && credits.map((res,index) => (
                            
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 " key={index}>
                                    <div className="p-2 border border-dark border-1 rounded">

                                            <h5 style={{backgroundColor:"lightblue"}} className="text-capitalize p-1">
                                                {res.product_name} {res.category_name} {res.type_name}
                                            </h5>
                                        <p>Quantity: {res.quantity}</p>
                                        <p>amount: {res.amount_used}</p>
                                        <p>Customer: {res.customer}</p>
                                        <p>Recorded on: {res.date_done}</p>
                                        <div className="d-flex">
                                            <button onClick={()=> handlePay(res.id)} className="btn-primary w-50 me-1 rounded">Pay</button>
                                            <button onClick={()=> handleDelete(res.id)} className="btn-danger w-50 rounded">Delete</button>
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
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}