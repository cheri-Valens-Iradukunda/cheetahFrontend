import axios from "axios"
import Api from "../Apis"
import { useEffect, useState } from "react"
import { ReportNav } from "./ReportNav"
import { AppLoading } from "../Loading"

export const DailyReport = () => {

    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    var day = date.getDate()
    day = day<10 ?`0${day}` :day

    const [toDayDate,setToDayDate] = useState(`${year}-${month}-${day}`)
    const [displayDate,setDisplayDate] = useState(`${year}-${month}-${day}`)
    const [dailyReport,setDailyReport] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(true)
    const [loading,setLoading] = useState(false)
    const [number,setNumber] = useState(0)
    const [totalReport,setTotalReport] = useState([])

    const getToDayReport = () => {
        setLoading(true)
        axios.get(Api.report.value + `/dailyReport/${toDayDate}/${number}`,{headers: Api.Token}).then((res)=>{
            setDailyReport(res.data)
            setDisplayDate(toDayDate)
            console.log(dailyReport)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        axios.get(Api.report.value + `/dailyTotals/${toDayDate}`,{headers: Api.Token}).then(res=>{
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
    var totalSales = 0;
    var totalPurchase = 0;
    var totalProfit = 0;
    return <>
        <ReportNav />
        <div className="mt-2">
            <div className="row">
                <div className="col-12">
                <div className="col-md-6 col-12">
                    {/* <h2>report</h2> */}
                    <h2>{displayDate} report</h2>
                    <form className="form d-flex mb-2 mt-2">
                        <input type="date" className="form-control" value={toDayDate} onChange={e=> setToDayDate(e.target.value)}/>
                        <button className="btn btn-sm btn-primary" onClick={(e) =>{
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                            
                            }}>search</button>
                    </form>
                </div>
                    <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-sm overflow-scroll table-bordered">
                            <thead className="text-uppercase">
                                <tr>
                                    <th>purchase</th>
                                    <th>sales</th>
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
                                        <td>{totalReport.openingAmount}</td>
                                        <td>{totalReport.closingAmount}</td>
                                        <td>{totalReport.total}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-12 overflow-scroll">

                        

                    <table className="table table-striped table-sm table-bordered">
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
                        <tbody className="">
                            {
                                dailyReport && dailyReport.map((res,index) => (
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
                    </div>
                    <div className="buttons">
                        <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(number>0){setNumber(number-1)
                            setAutoRefresh(!autoRefresh)}
                        }}>prev</div>
                        <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                            if(dailyReport.length >=20){setNumber(number+1)
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