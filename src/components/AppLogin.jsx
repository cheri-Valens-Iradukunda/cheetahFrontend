import { useEffect, useState } from "react";
import Api from "./Apis";
import axios from "axios";
import "./css/Login.css"

import { useSignIn, useSignOut } from 'react-auth-kit';

const AppLogin = () => {
    const [userName, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isPassword,setIsPassword] = useState(false)
    const signOut = useSignOut()
    const signIn = useSignIn()

    const [loginStatus, setLoginStatus] = useState(false)

    const [inputs, setInputs] = useState([
        {
            expense_name: "",
            amount: ""
        }
    ]);
    const [currentPage, setCurrentPage] = useState(0);
    const handleInputChange=()=>{

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const AuthRequest = {
            userName: userName,
            password: password
        }
        if (userName) {

            const response = axios.post(Api.server.name +"/authenticate",AuthRequest).then((res) => {
                console.log('Login status below')
                // setLoginClick(true)
                if (res.data.stat !== 'fail') {
                    console.log('---------------------user ---------------------')
                    console.log(res.data.token)
                    localStorage.setItem("category", res.data.category);
                    localStorage.setItem("username", res.data.userName);
                    res.data.userName == "cheetah"? localStorage.setItem("userType","admin"):localStorage.setItem("userType","regular")
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("isLogin", true);
 
                    setLoginStatus(true)
                    signIn({
                        token: res.data,
                        expiresIn: 3600,
                        tokenType: "Bearer",
                        authState: { username: AuthRequest.userName }
                    })
                    const token = localStorage.getItem('token');
                    if (token) {
                        console.log('The use is logged in successfully')
                        window.location.replace('/exportForm')
                    }
                } else {

                    setLoginStatus(false)
                    alert("Username or Password is incorect")

                }
            }).catch(() => {
                alert("there is an error in login. please contact a programmer")
            })
        } else {
            alert('You have to provide the username and password')
        }
    };

    const addInputGroup = () => {
        setInputs([
            ...inputs,
            {
                expense_name: "",
                amount: ""
            }
        ]);
        setCurrentPage(inputs.length);
        // setProductComponents([])
    };

    const removeInputGroup = (index) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        setInputs(updatedInputs);
        setCurrentPage(Math.max(0, currentPage - 1));
    };

    

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
useEffect(()=>{
    try {
        signOut()
    } catch (err) {
        console.log('Error while loggin out' + err)
    }
},[])
    return (<>
        <form onSubmit={handleSubmit} className='form was-validated navbar'>
            <div className='container mt-4 rounded p-3'>
                
                <div className="row">
                    {/* <div className="col-12"> */}
                        <div className="bg-light form_div">
                            <div className="row">
                                {/* <div className="col-md-3"></div> */}
                                <div className="col-md-12 border border-1 shadow border-secondary rounded">
                                    <h2 className='text-center pb-2 title'>log in</h2>
                                    <div className="p-2">
                                        <div className="row d-flex">
                                            <label className="form-label">Username</label>
                                            <div>
                                                <input
                                                    type="text" required
                                                    minLength={5}
                                                    onChange={e => setUsername(e.target.value)}
                                                    className="form-control"

                                                />
                                                <label className="form-label mt-2">Password</label>
                                                <input
                                                    type={isPassword?"text": "password" }
                                                    minLength={3}
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="form-control"
                                                    required
                                                />
                                                <div className="d-flex">
                                                    <input id="seeMe" onChange={()=>{}} className="form-check" type="checkbox" checked={isPassword} onClick={(e)=>{setIsPassword(!isPassword)}} />
                                                    <label htmlFor="seeMe" className="form-label mt-1">See password</label>
                                                </div>
                                            </div>
                                            {/* </div> */}
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-success mt-3"
                                            onClick={() => removeInputGroup()}
                                        >
                                            Log in
                                        </button>
                                    </div>


                                </div>

                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </form>
    </>
    );
}

export default AppLogin