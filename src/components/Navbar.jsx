import { Link, useHistory, useLocation } from "react-router-dom"
import "./css/NavCss.css"
import { useEffect, useState } from "react"
import { useSignOut } from "react-auth-kit"

const Navbar = () => {
    
    const location = useLocation()
    const path = location.pathname

    const [userName, setUsername] = useState('')
    const [userType, setUserType] = useState('')
    const [navDropDown,setNavDropDown] = useState(false)
    const [page,setPage] = useState(path)

    const signOut = useSignOut()
    const logout = () => {
        localStorage.clear()
       

        window.location.replace('/');

    }

    // console.log(path)

    useEffect(() => {
        const theusername = localStorage.getItem('token')
        const theUserType = localStorage.getItem('category')
        if (theusername) {
            setUsername(localStorage.getItem('username'))
        }
        if (theUserType) {
            setUserType(localStorage.getItem('catname'))
        }
    }, [])

    const activeStyle = {
        border: "1px solid gray",
        backgroundColor:"rgba(7, 136, 136, 0.568)",
        borderRadius:"5px", transition:"0.5s ease"
    }
    return <>
        <div className="container-fluid main-nav-class">
            <div className="main">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <h1 className="head"><span>HARVESTMART</span> Alimentation</h1>
                    </div>
                    <div className="col-lg-9 col-md-12 col-12">
                        <div className="navs mt-3">

                            { localStorage.getItem("token")?<>
                                <div style={page=="/productTable"?activeStyle:{}}
                                    onClick ={() => setPage("/productTable")}
                                >
                                    <Link to="/productTable" className="px-4">Products</Link>
                                </div>

                                <div style={page=="/importForm"?activeStyle:{}}
                                onClick ={() => setPage("/importForm")}>
                                    <Link to="/importForm" className="px-4">Import</Link>
                                </div>
                                <div style={page=="/exportForm"?activeStyle:{}}
                                onClick ={() => setPage("/exportForm")}>
                                    <Link to="/exportForm" className="px-4">Export</Link>
                                </div>
                                <div style={page=="/expenseForm"?activeStyle:{}}
                                onClick ={() => setPage("/expenseForm")}>
                                    <Link to="/expenseForm" className="px-4">Expenses</Link>
                                </div>
                                <div style={page=="/damagedForm"?activeStyle:{}}
                                onClick ={() => setPage("/damagedForm")}>
                                    <Link to="/damagedForm" className="px-4">Damages</Link>
                                </div>
                                <div style={page=="/salesCredit"?activeStyle:{}}
                                onClick ={() => setPage("/salesCreditrr")}>
                                    <Link to="/salesCredit" className="px-4">credits</Link>
                                </div>
                                <div style={page=="/deletedApproved"?activeStyle:{}}
                                onClick ={() => setPage("/deletedApproved")}>
                                    <Link to="/deletedApproved" className="px-4">deleted</Link>
                                </div>
                                <div style={page=="/dailyReport"?activeStyle:{}}
                                onClick ={() => setPage("/dailyReport")}>
                                    <Link to="/dailyReport" className="px-4">Report</Link>
                                </div>
                                <div className="d-block" id="navPrifile" onMouseOver={()=>setNavDropDown(true)} onMouseOut={()=>setNavDropDown(false)}>
                                    <div style={page=="/profile"?activeStyle:{}}
                                    onMouseOver ={() => setPage("/prfile")}>
                                        <Link to="#" className="px-4 text-capitalize">{localStorage.getItem("username")}</Link>
                                    </div>
                                    {
                                        navDropDown?<div className="profileNav" id="profileNav">
                                        
                                        {
                                            localStorage.getItem("category") == "admin"?<div className="ms-4 mt-2">
                                                <Link to="/users" className="display9">Manage Users</Link><br />
                                                <p></p>
                                                <Link to="/insertTool" className="display9">All tools</Link>
                                            </div>
                                            :<></>
                                        }
                                        <div className="ms-4 mt-2 mb-3">
                                            <div className="mb-2">

                                                <Link to="/rateImport" className="mb-5">Rate transactions</Link>
                                            </div>
                                            <Link to="#" onClick={(e) => logout(e)}>Logout</Link>
                                        </div>
                                    </div>:<></>
                                    }
                                
                                </div>:<></>
                            </>:<></>}
                        </div>
                    </div>
                    <div className="col-md-1 col-2">
                        

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Navbar