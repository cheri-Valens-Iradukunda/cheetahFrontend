import axios from "axios"
import { useEffect, useState } from "react"
import Api from "./Apis"
import "./css/Login.css"
import { AppLoading } from "../component2/Loading"

const ManageUsers = () => {

    const [isAddingUser,setIsAddingUser] = useState(false)
    const [isRefresh,setIsRefresh] = useState(true)

    const [users,setUsers] = useState([])
    const [index,setIndex] = useState(0)
    const [isUpdate,setIsUpdate] = useState(false)
    const [names,setNames] = useState()
    const [surname,setSurname] = useState()
    const [username,setUsername] = useState()
    const [telephone,setTelephone] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail] = useState()
    const [isLoading,setIsLoading] = useState(false)

    const getAllUsers = () => {
        setIsLoading(true)
        axios.get(Api.server.name + "/getAllusers",{headers: Api.Token}).then(res => {
            setUsers(res.data)
            console.log(res.data)
            setIsLoading(false)
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("Something went wrong in authentication. please re-login")
        })
    }

    const handleUpdate = (e,i) => {
        e.preventDefault()
        setIsUpdate(true)
        setIndex(i + 1)
        const indexObject = users[i]
        setNames(`${indexObject.name} ${indexObject.sur_name}`)
        setEmail(indexObject.email)
        setUsername(indexObject.username)
        setTelephone(indexObject.telephone);
        
        if(isUpdate){

        }

    }
    useEffect(() => {
        getAllUsers()

    },[index,isRefresh])

    const addUser = () => {
        return(
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 bg-light rounded shaow">
                        <form className="form was-validated p-2">
                            <h3 className="text-center text-capitalize h4 fw-bold" style={{fontFamily:"times-new-roman1"}}>add new user</h3>
                            <div>
                                <label htmlFor="" className="form-label">Names</label>
                                <input type="text" minLength={4} onChange={e => setNames(e.target.value)} required className="form-control" />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">User name</label>
                                <input type="text" minLength={4} onChange={e => setUsername(e.target.value)} required className="form-control" />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text" minLength={4} onChange={e => setEmail(e.target.value)} required className="form-control" />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">Telephone</label>
                                <input type="text" minLength={4} onChange={e => setTelephone(e.target.value)} required className="form-control" />
                            </div>
                            <div className="mt-2" style={{justifyContent:"space-between",display:"flex"}}>
                                <button className="btn btn-primary w-25" onClick={e=>{
                                    e.preventDefault();setIsAddingUser(false);
                                }}>Close</button>
                                <button className="btn btn-primary w-25">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
    const table =() => {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="bg-light">
                            <button className="btn btn-primary m-2" onClick={e=>{
                                e.preventDefault();
                                setIsAddingUser(true)
                            }}>Add User</button>
                            <div className="table-responsive m-2">
                                <table className="table table-sm table-striped table-bordered">
                                    <thead className="bg-dark text-light">
                                        <tr>
                                            <th>Names</th>
                                            <th>Username</th>
                                            <th>Telephone</th>
                                            <th>Email</th>
                                            <th>Category</th>
                                            <th colSpan={2}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users && users.map((res,i) => (
                                                    i == (index-1)?<>
                                                    <tr key={i}>
                                                        {/* <form className="form"> */}
                                                            <td className="">{!isUpdate?
                                                            `${res.name} ${res.sur_name}`:
                                                            <input type="text" value={names} className="w-100" onChange={e=> setNames(e.target.value)}  />
                                                            }</td>
                                                            <td>{!isUpdate?
                                                            `${res.username}`:
                                                            <input type="text" value={username} className="w-100" onChange={e=> setUsername(e.target.value)}  />}</td>
                                                            <td>{!isUpdate?
                                                            `${res.telephone}`:
                                                            <input type="text" value={telephone} className="w-100" onChange={e=> setTelephone(e.target.value)}  />}</td>
                                                            <td>{!isUpdate?
                                                            `${res.email}`:
                                                            <input type="text" value={email} className="w-100" onChange={e=> setEmail(e.target.value)}  />}</td>
                                                            <td>{res.category_name}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={(e)=>handleUpdate(e,i)}
                                                                >update</button>
                                                            </td><td>
                                                                <button className="btn btn-primary btn-sm">delete</button>
                                                            </td>
                                                        {/* </form> */}
                                                    </tr>
                                                    </>:<>
                                                    <tr key={i}>
                                                        <td>{res.name} {res.sur_name}</td>
                                                        <td>{res.username}</td>
                                                        <td>{res.telephone}</td>
                                                        <td>{res.email}</td>
                                                        <td>{res.category_name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-sm m-1"
                                                                onClick={(e)=>handleUpdate(e,i)}
                                                            >update</button>
                                                            <button className="btn btn-primary btn-sm m-1">delete</button>
                                                        </td>
                                                    </tr>
                                                    </>
                                                
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
    const handleAddUser = (e) => {
        e.preventDefault()
        const formData = {
            "name": names,
            "sur_name": surname,
            "email": email,
            "telephone": telephone
        }
        setIsLoading(true)
        axios.post(Api.server.name + "/registNew",formData,{headers: Api.Token}).then(res=>{
            alert(res.data)
            setIsAddingUser(false)
            setIsRefresh(!isRefresh)
            setIsLoading(false)
        })
    }
    // const handleUpdateSave =() => {
    //     alert("done")
    // }
    const handleDelete = (e,id) => {
        e.preventDefault()
        setIsLoading(true)
        axios.delete(Api.server.name + "/delete/"+ id,{headers:Api.Token}).then(res=>{
            alert(res.data)
            setIsRefresh(!isRefresh)
            setIsLoading(false)
        }).catch(()=>{
            window.location.replace("/")
            alert("Something went wrong in authentication. please re-login")
        })
    }
    const dropdownDivStyle ={
        display:"none"
    }
    const dropdownDivStyle2 = {
        display: "block"
    }
    const handleReset = (id) => {
        setIsLoading(true)
        axios.get(Api.server.name + "/forgetPassword/"+ id,{headers:Api.Token}).then(res=>{
            alert(res.data)
            setIsLoading(false)
            setIsRefresh(!isRefresh)
        }).catch(()=>{
            window.location.replace("/")
            alert("Something went wrong in authentication. please re-login")
        })
    }
    return(
        <div>
            <div>
                {
                    isAddingUser ? <>
                        <div className="container mt-2">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6 bg-light rounded shaow">
                                    <form className="form was-validated p-2" onSubmit={e=> handleAddUser(e)}>
                                        <h3 className="text-center text-capitalize h4 fw-bold" style={{fontFamily:"times-new-roman1"}}>add new user</h3>
                                        <div>
                                            <label htmlFor="" className="form-label">Name</label>
                                            <input type="text" minLength={4} onChange={e => setNames(e.target.value)} required className="form-control" />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">Sur-name</label>
                                            <input type="text" minLength={4} onChange={e => setSurname(e.target.value)} required className="form-control" />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">Email</label>
                                            <input type="email" minLength={4} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">Telephone</label>
                                            <input type="text" minLength={10} maxLength={12} pattern="\d{10,12}" title="Enter 10-12 digits" onChange={e => setTelephone(e.target.value)} required className="form-control" />
                                        </div>
                                        <div className="mt-2" style={{justifyContent:"space-between",display:"flex"}}>
                                            <button className="btn btn-primary w-25" onClick={e=>{
                                                e.preventDefault();setIsAddingUser(false);
                                            }}>Close</button>
                                            <button type="submit" className="btn btn-primary w-25">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>:<>
                        <div className="container mt-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="bg-light">
                                        <button className="btn btn-primary m-2" onClick={e=>{
                                            e.preventDefault();
                                            setIsAddingUser(true)
                                        }}>Add User</button>
                                        <div className="table-responsive m-2">
                                            <h2 className="text-center text-capitalize fw-bold" style={{fontFamily:"times-new-roman"}}>Available users</h2>
                                            <table className="table table-sm table-striped table-bordered">
                                                <thead className="bg-dark text-light">
                                                    <tr>
                                                        <th>Names</th>
                                                        <th>Username</th>
                                                        <th>Telephone</th>
                                                        <th>Email</th>
                                                        <th>Category</th>
                                                        <th colSpan={2}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        users && users.map((res,i) => (
                                                                
                                                                <tr key={i}>
                                                                    <td>{res.name} {res.sur_name}</td>
                                                                    <td>{res.username}</td>
                                                                    <td>{res.telephone}</td>
                                                                    <td>{res.email}</td>
                                                                    <td>{res.category_name}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary btn-sm" onClick={(e) => handleReset(res.id)}>Reset password</button>
                                                                        <button className="btn btn-primary btn-sm m-1" onClick={(e) =>handleDelete(e,res.id)}>delete</button>
                                                                    </td>
                                                                </tr>
                                                                // </>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </>
                }
            </div>
            <div style={isLoading? dropdownDivStyle2:dropdownDivStyle}>
                <AppLoading />
            </div>
        </div>
    )
    

}

export default ManageUsers