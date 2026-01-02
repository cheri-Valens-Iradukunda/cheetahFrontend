import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { DeletedNav } from "./DeletedNav"
import { AppLoading } from "../Loading"

export const SearchByUser = () => {

    const [user,setUser] = useState("regular")
    const [displayUser,setDisplayUser] = useState(user)
    const [number,setNumber] = useState(0)
    const [credits,setCredits] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)

    const getCredits = () => {
        setLoading(true)
        axios.get(Api.import.value + `/byUser/${user}/${number}`,{headers: Api.Token}).then(res=>{
            setCredits(res.data)
            console.log(res.data)
            setLoading(false)
            setDisplayUser(user)
            setUser("")
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        
    }

    useEffect(()=>{
        getCredits()
    },[autoRefresh])

    return<>
        <DeletedNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                    
                <h2><span className="text-success">{displayUser}</span> actions</h2>
                    <div className="col-md-6 mb-2">
                        <form className="form mt-2 d-flex">
                            <input type="text" placeholder="Enter user name" minLength={3} className="form-control" onChange={e=>setUser(e.target.value)} />
                            <button className="btn btn-primary btn-sm ms-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setAutoRefresh(!autoRefresh)
                                    // console.log(date)
                                }}
                            >search</button>
                        </form>
                    </div>
                    <table className="table table-sm table-bordered table-striped">
                        <thead className="text-uppercase">
                            <tr>
                                <th>date</th>
                                <th>product name</th>
                                <th>category</th>
                                <th>type</th>
                                <th>quantity</th>
                                <th>amount</th>
                                <th>pay action</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                credits && credits.map((res, index) =>(
                                    <tr key={index}>
                                        <td>{res.date_done}</td>
                                        <td>{res.product_name}</td>
                                        <td>{res.category_name}</td>
                                        <td>{res.type_name}</td>
                                        <td>{res.quantity_used}</td>
                                        <td>{res.amount_used}</td>
                                        <td>{res.pay_action}</td>
                                        <td>{res.action}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(number>0){setNumber(number-1)
                            setAutoRefresh(!autoRefresh)}
                        }}>prev</button>
                        <button className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(credits.length >=20){setNumber(number+1)
                            setAutoRefresh(!autoRefresh)}
                        }}>next</button>
                        
                    </div>
                </div>
            </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}