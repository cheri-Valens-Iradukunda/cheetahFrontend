import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { DashNav } from "./ImportsNav"

export const Dashboard = () =>{

    const [allTools,setAllTools] = useState([])
    const [allTotals,setAllTotals] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const [autoRefresh,setAutoRefresh] = useState(true)

    const getAll = () => {

        setIsLoading(true)

        axios.get(Api.tools.value + "/total",{headers: Api.Token}).then(res=>{
            setAllTotals(res.data)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })

        axios.get(Api.tools.value + "/",{headers: Api.Token}).then(res=>{
            setAllTools(res.data)
            setIsLoading(false)
            // setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })

    }

    useEffect(()=> {
        getAll()
    },[autoRefresh])

    const handleDelete = (id) => {

        setIsLoading(true)
        axios.delete(Api.tools.value + "/" + id,{headers: Api.Token}).then(res=>{
            alert(res.data)
            setIsLoading(false)
            setAutoRefresh(!autoRefresh)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    return <>
        <DashNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                    <table className="table table-sm table-striped table-bordered">
                        <thead className="text-uppercase">
                            <tr>
                                <th>Total tools</th>
                                <th>Total purchased</th>
                                <th>Total sold</th>
                                <th>Total damages</th>
                                <th>Total expenses</th>
                                {/* <th>General total</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{allTotals.totalStartingTools}</td>
                                <td>{allTotals.totalPurchases}</td>
                                <td>{allTotals.totalSales}</td>
                                <td>{allTotals.totalDamages}</td>
                                <td>{allTotals.totalExpenses}</td>
                                {/* <td>{(allTotals.totalSales)-(allTotals.totalPurchases+allTotals.totalStartingTools+allTotals.totalStartingTools+allTotals.totalExpenses)}</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3><u>All recorded equipments</u></h3>
                    <table className="table table-sm table-striped table-bordered">
                        <thead className="text-uppercase">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allTools && allTools.map((res,index)=>(
                                    <tr key={index}>
                                        <td>{res.name}</td>
                                        <td>{res.amount}</td>
                                        <td>
                                            <button
                                            onClick={() => handleDelete(res.id)}
                                             className="btn btn-primary btn-sm">delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}