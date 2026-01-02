import axios from "axios"
import { useEffect, useState } from "react"
import Api from "../Apis"
import { ReportNav } from "./ReportNav"
import { AppLoading } from "../Loading"

export const MonthlyReport = () => {


    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    const day = date.getDate()

    const [from,setFrom] = useState(`${year}-${month}`)
    const [to,setTo] = useState(`${year}-${month}`)
    const [monthlyReport,setMonthlyReport] = useState()
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [displayFrom,setDisplayFrom] = useState(from)
    const [displayTo,setDisplayTo] = useState(to)
    const [totalReport,setTotalReport]  = useState()
    const [loading,setLoading] = useState(false)
    const [number,setNumber ] = useState(0)

    const getToDayReport = () => {
        setLoading(true)
        // alert(from)
        axios.get(Api.report.value + `/monthly/${from}/${to}/${number}`,{headers: Api.Token}).then((res)=>{
            setMonthlyReport(res.data)
            console.log(monthlyReport)
            setDisplayFrom(from)
            setDisplayTo(to)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        axios.get(Api.report.value + `/monthlyTotals/${from}/${to}`,{headers: Api.Token}).then(res=>{
            setTotalReport(res.data)
            console.log(totalReport)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
   
    useEffect(()=> {
        getToDayReport()
    },[autoRefresh])

    return <>
        <ReportNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                <div className="col-md-6 col-12">
                    <h2>{displayFrom} to {displayTo} report</h2>
                    <form className="form d-flex mb-2">
                        <input type="month" className="form-control" value={from} onChange={e=> setFrom(e.target.value)}/>
                        <input type="month" className="form-control" value={to} onChange={e=> setTo(e.target.value)}/>
                        <button className="btn btn-sm btn-primary" onClick={(e) =>{
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                            
                            }}>search</button>
                    </form>
                </div>
                    <div className="">
                        <table className="table table-striped table-sm table-bordered">
                            <thead className="text-uppercase">
                                <tr>
                                    <th>purchase</th>
                                    <th>sales</th>
                                    <th>expenses</th>
                                    <th>opening stock</th>
                                    <th>closing stock</th>
                                    <th>total profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalReport &&
                                
                                    <tr>
                                        <td>{totalReport.totalPurchases}</td>
                                        <td>{totalReport.totalSells}</td>
                                        <td>{totalReport.totalExpenses}</td>
                                        <td>{totalReport.openingAmount}</td>
                                        <td>{totalReport.closingAmount}</td>
                                        <td>{totalReport.total}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-scroll">
                    <table className="table table-striped mt-2 table-sm table-bordered">
                        <thead className="text-uppercase">
                            <tr>
                                <th>product</th>
                                <th>category</th>
                                <th>type</th>
                                <th>opening stock</th>
                                <th>quantity purchased</th>
                                <th>amount purchased</th>
                                <th>quantity sold</th>
                                <th>amount sold</th>
                                <th>profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                monthlyReport && monthlyReport.map((res,index) => (
                                    <tr key={index}>
                                        <td>{res.product_name}</td>
                                        <td>{res.category_name}</td>
                                        <td>{res.type_name}</td>
                                        <td>{res.opening_stock}</td>
                                        <td>{res.quantity_purchased}</td>
                                        <td>{res.amount_purchased}</td>
                                        <td>{res.quantity_sold}</td>
                                        <td>{res.amount_sold}</td>
                                        <td>{res.totalProfit}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    <div className="buttons">
                        <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(number>0){setNumber(number-1)
                            setAutoRefresh(!autoRefresh)}
                        }}>prev</div>
                        <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(monthlyReport.length >=20){setNumber(number+1)
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