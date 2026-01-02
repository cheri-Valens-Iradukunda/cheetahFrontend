import axios from "axios"
import Api from "../Apis"
import { ExpenseNav } from "./ExpenseNav"
import { useEffect, useState } from "react"
import { MdHeight } from "react-icons/md"
import { AppLoading } from "../Loading"

export const ExpenseTable = () => {

    const [allExpenses,setAllExpenses] = useState([])

    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month

    const [monthDate,setMonthDate] = useState(`${year}-${month}`)
    const [displayDate,setDisplayDate] = useState(monthDate)
    const [number,setNumber] = useState(0)
    const [isLoading,setIsLoading] = useState(false)
    const [autoRefresh,setAutoRefresh] = useState(false)
    const [loading,setLoading] = useState(false)

    const getAll = () => {
        setLoading(true)
        axios.get(Api.expenses.value + "/"+ monthDate + "/" + number,{headers: Api.Token}).then(res=>{
            setAllExpenses(res.data)
            setDisplayDate(monthDate)
            console.log(res.data)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    useEffect(() => {
        getAll()
    },[autoRefresh])

    const handleDelete = (e,id) => {
        setLoading(true)
        axios.delete(Api.expenses.value + "/"+ id,{headers: Api.Token}).then(res=>{
                console.log(res.data)
                alert(res.data)
                setLoading(false)
                setAutoRefresh(!autoRefresh)
            }
        ).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    return<>
        <ExpenseNav />
        <div className="mt-2">
            <h2>{displayDate} expenses</h2>
            <div className="row">
                <div className="col-md-6 col-12">
                    <form className="form d-flex">
                        <input type="month" className="form-control" value={monthDate} onChange={e=> setMonthDate(e.target.value)}/>
                        <button className="btn btn-sm btn-primary" onClick={(e) =>{
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                            
                            }}>search</button>
                    </form>
                </div>
            </div>
            
            <table className="table table-bordered table-sm m-2" >
                <thead className="text-uppercase">
                    <tr>
                        <th>date</th>
                        <th>expense name</th>
                        <th>amount</th>
                        <th>user</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allExpenses && allExpenses.map((data,index) =>(
                            <tr>
                                <td>{data.date_done}</td>
                                <td>{data.expense_name}</td>
                                <td>{data.amount} Rwf</td>
                                <td>{data.user}</td>
                                <td><button
                                    className="btn btn-primary btn-sm"
                                onClick={e =>{handleDelete(e,data.id)}}>Delete</button></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
            <div className="buttons">
                <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                    if(number>0){setNumber(number-1)
                    setAutoRefresh(!autoRefresh)}
                }}>prev</div>
                <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                    if(allExpenses.length>=20){setNumber(number+1)
                    setAutoRefresh(!autoRefresh)}
                }}>next</div>
                
            </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}