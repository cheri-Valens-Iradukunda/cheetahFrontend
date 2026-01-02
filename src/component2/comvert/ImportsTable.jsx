import axios from "axios"
import { useEffect, useState } from "react"
import Api from "../Apis"
import { ImportsNav } from "./ImportsNav"
import { AppLoading } from "../Loading"

export const ImportTable = () => {
    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10? `0${month}`:month
    var day = date.getDate()
    day = day <10 ? `0${day}`:day

    const [toDayDate,setToDayDate] = useState(`${year}-${month}-${day}`)
    const [displayDate,setDisplayDate] = useState()
    const [imports,setImports] = useState([])
    const [loading,setLoading] = useState(false)
    const [number,setNumber ] = useState(0);
    const [autoRefresh,setAutoRefresh]= useState(true)
    const [message,setMessage] = useState("")
    const [isTextbox,setIsTextbox]  = useState(false)
    const [deletedId,setDeletedId] = useState()

    const getImports = () => {
        setLoading(true)
        axios.get(Api.import.value + "/imports/purchase/"+ toDayDate + "/" + number,{headers: Api.Token}).then(res=>{
            setImports(res.data)
            setDisplayDate(toDayDate)
            setLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    const handleDelete = (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = {
            "deleted_id": deletedId,
            "reason": message,
            "user": localStorage.getItem("username")
        }
        axios.post(Api.delete.value + `/deleteAction`,formData,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
            setMessage("")
            setIsTextbox(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }

    const addReason = () =>{
        return<>
            <div className="mt-2 result_display" style={{
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
                        <form onSubmit={(e) =>{handleDelete(e)}} className="form">
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

    useEffect(() =>{
        getImports()
    },[autoRefresh])

    return<>
        <ImportsNav />
        <div className="container bg-light mt-2 rounded overflow-scroll">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-uppercase" style={{fontFamily:"times new roman"}}>Import actions</h2>
                        <div className="col-md-6">
                            <form className="form d-flex">
                                <input type="date" className="form-control" value={toDayDate} onChange={e=>setToDayDate(e.target.value)}/>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setAutoRefresh(!autoRefresh)
                                }} className="btn btn-primary ms-2 btn-sm">search</button>
                            </form>
                        </div>
                        
                        <h4>On {displayDate}</h4>

                        <table className="table table-sm table-bordered table-striped">
                            <thead className="text-uppercase">
                                <tr>
                                    <th>Date imported</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Amount/one</th>
                                    <th>Total amount</th>
                                    <th>quantity remain</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    imports && imports.map((res,index) => (
                                        <tr key={index}>
                                            <td>{res.date_done}</td>
                                            <td>{res.product_name}</td>
                                            <td>{res.category_name}</td>
                                            <td>{res.type_name}</td>
                                            <td>{res.quantity_used}</td>
                                            <td>{res.amount_used/res.quantity_used}</td>
                                            <td>{res.amount_used}</td>
                                            <td>{res.quantity_remain}</td>
                                            <td><button onClick={() => {
                                                setIsTextbox(true)
                                                setDeletedId(res.id)
                                            }} className="btn btn-primary btn-sm">delete</button></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        <div className="buttons">
                            <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                                if(number>0){setNumber(number-1)
                                setAutoRefresh(!autoRefresh)}else{setNumber(0)}
                            }}>prev</div>
                            <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                                if(imports.length >= 20) {setNumber(number+1)
                                    setAutoRefresh(!autoRefresh)}
                            }}>next</div>
                            
                        </div>
                    </div>
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