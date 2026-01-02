import { useEffect, useState } from "react";
import { DamagedNav } from "./DamagedNav"
import axios from "axios";
import Api from "../Apis";
import { AppLoading } from "../Loading";

export const DamagedTable = () => {
    const localDate = new Date();
    let year = localDate.getFullYear();
    let month = localDate.getMonth() + 1;
    month = month < 10 ? `0${month}`:month
    const fullYear = new Date(`${year}-${month}`);

    const [date,setDate] = useState(`${year}-${month}`)
    const [newDate,setNewDate] = useState(`${year}-${month}`)
    const [number,setNumber] = useState(0)
    const [allDamages,setAllDamages] = useState([])
    const [autoRefresh,setAutoRefresh] = useState(false)
    const [loading,setLoading] = useState(false)
    const user = localStorage.getItem("username")

    const getAllDamages = () => {
        setLoading(true)
        console.log(date)

        axios.get(Api.damages.value + `/getAllByDate/${newDate}/${number}`,{headers: Api.Token}).then(res=>{
            setAllDamages(res.data)
            setLoading(false);
        }
        ).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    useEffect(() =>{
        getAllDamages()
    },[autoRefresh])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete(Api.damages.value + "/" + id,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setLoading(false)
            setAutoRefresh(!autoRefresh);
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
    }
    return <>
        <DamagedNav />
        <div className="mt-2">

            <h2 className="text-capitalize">{date} damages</h2>
                <form className="form was-validated my-2">
                    <div className="d-flex">
                        <input type="month" value={newDate} onChange={e=>setNewDate(e.target.value)} required minLength={1} className="form-control me-2 w-25" />
                        <button className="btn btn-sm btn-primary" onClick={(e) => {
                            e.preventDefault()
                            setAutoRefresh(!autoRefresh)
                            setDate(newDate)
                        }}>search</button>
                    </div>
                </form>
                <table className="table table-sm pb-2 table-striped table-bordered">
                    <thead className='text-uppercase'>
                        <tr>
                            <th>Date</th>
                            <th>Product name</th>
                            <th>Category name</th>
                            <th>Type name</th>
                            <th>Quantity</th>
                            <th>user</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDamages && allDamages.map((damage,index) => (
                                <tr key={index}>
                                    <td>{damage.date_done}</td>
                                    <td>{damage.product_damaged.price_in_product.product_name}</td>
                                    <td>{damage.product_damaged.price_in_category.category_name}</td>
                                    <td>{damage.product_damaged.price_in_type.type_name}</td>
                                    <td>{damage.quantity_damaged}</td>
                                    <td>{damage.user}</td>
                                    <td>
                                        <button
                                        onClick={(e) => handleDelete(damage.id)}
                                        className="btn btn-primary btn-sm"
                                        >delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="buttons">
                    <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                        if(number>=0){setNumber(number-1)
                        setAutoRefresh(!autoRefresh)}
                    }}>prev</div>
                    <div className="btn m-2 btn-primary btn-sm" onClick={() => {
                        if(allDamages.length >=20){setNumber(number+1)
                        setAutoRefresh(!autoRefresh)}
                    }}>next</div>
                    
                </div>
        </div>
        <div style={loading?{display:"block"}:{display:"none"}}>
            <AppLoading />
        </div> 
    </>
}