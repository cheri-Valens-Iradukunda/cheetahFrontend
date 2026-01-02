import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export const LeftSideNav = () => {

    const location = useLocation()
    const path = location.pathname
    
    const [navDropDown,setNavDropDown] = useState(false)
    const [page,setPage] = useState(path)

    const logout = () => {
        localStorage.clear()
       

        window.location.replace('/');

    }

    const activeStyle = {
        border: "1px solid gray",
        backgroundColor:"rgba(7, 136, 136, 0.568)",
        borderRadius:"5px", transition:"0.5s ease"
    }

    return <>
            <div className="inNav">

                { localStorage.getItem("token")?<>
                    <div style={page=="/productTable"?activeStyle:{}}
                        onClick ={() => setPage("/productTable")}
                    >
                        <Link to="/productTable" className="navItem">Products</Link>
                    </div>

                    <div style={page=="/importForm"?activeStyle:{}}
                    onClick ={() => setPage("/importForm")}>
                        <Link to="/importForm" className="navItem">Import</Link>
                    </div>
                    <div style={page=="/exportForm"?activeStyle:{}}
                    onClick ={() => setPage("/exportForm")}>
                        <Link to="/exportForm" className="navItem">Export</Link>
                    </div>

                    <div style={page=="/comvert"?activeStyle:{}}
                    onClick ={() => setPage("/comvert")}>
                        <Link to="/comvert" className="navItem">Convert</Link>
                    </div>
                    <div style={page=="/expenseForm"?activeStyle:{}}
                    onClick ={() => setPage("/expenseForm")}>
                        <Link to="/expenseForm" className="navItem">Expenses</Link>
                    </div>
                    <div style={page=="/damagedForm"?activeStyle:{}}
                    onClick ={() => setPage("/damagedForm")}>
                        <Link to="/damagedForm" className="navItem">Damages</Link>
                    </div>
                    <div style={page=="/salesCredit"?activeStyle:{}}
                    onClick ={() => setPage("/salesCreditrr")}>
                        <Link to="/salesCredit" className="navItem">credits</Link>
                    </div>
                    <div style={page=="/deletedApproved"?activeStyle:{}}
                    onClick ={() => setPage("/deletedApproved")}>
                        <Link to="/deletedApproved" className="navItem">deleted</Link>
                    </div>
                    {/* <div style={page=="/dailyReport"?activeStyle:{}}
                    onClick ={() => setPage("/dailyReport")}>
                        <Link to="/dailyReport" className="navItem">Report</Link>
                    </div> */}
                    {
                        localStorage.getItem("category") == "admin"?
                        <div style={page=="/users"?activeStyle:{}}
                         onClick ={() => setPage("/users")}>
                            <Link to="/users" className="navItem">Manage Users</Link>
                        </div>:<></>
                    }
                    
                    <div style={page=="/insertTool"?activeStyle:{}}
                    onClick ={() => setPage("/insertTool")}>
                        <Link to="/insertTool" className="navItem">All Equipments</Link>
                    </div>
                    <div style={page=="/rateImport"?activeStyle:{}}
                    onClick ={() => setPage("/reteImport")}>
                        <Link to="/rateImport" className="navItem">Passive actions</Link>
                    </div>
                    <div style={page=="/dailyReport"?activeStyle:{}}
                    onClick ={() => setPage("/dailyReport")}>
                        <Link to="/dailyReport" className="navItem">Report</Link>
                    </div>
                   :<></>
                </>:<></>}
            </div>
    </>
}