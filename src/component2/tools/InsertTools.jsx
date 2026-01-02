import { useEffect, useState } from "react";
import Api from "../Apis";
import axios from "axios";
import { AppLoading } from "../Loading";
import { DashNav } from "./ImportsNav";

export const InsertTools = () => {

    const [productComponents,setProductComponents] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [autoRefresh,setAutoRefresh] = useState(false)
    const [loading,setLoading] = useState(false)
    const [inputs, setInputs] = useState([
        {
            name: "",
            amount: ""
        }
    ]);
    const [currentPage, setCurrentPage] = useState(0);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        updatedInputs[index] = { ...updatedInputs[index], [name]: value };
        setInputs(updatedInputs);
    };

    const addInputGroup = () => {
        setInputs([
            ...inputs,
            {
                name: "",
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

    const handleSubmit = (event) => {
        setIsLoading(true)
        event.preventDefault();
        console.log(inputs);
        setLoading(true)
        axios.post(Api.tools.value + "/", inputs,{headers: Api.Token}).then(res=> {
            alert(res.data)
            setIsLoading(false)
            setAutoRefresh(!autoRefresh)
            setLoading(false)
            setInputs([])
        }).catch(()=>{
            localStorage.removeItem("token");
            window.location.replace("/")
            alert("back to login")
        })
        // Add your form submission logic here
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const dropdownDivStyle ={
        display:"none"
    }
    const dropdownDivStyle2 = {
        display: "block"
    }
    return (
        <div>
            <DashNav />
           <div className="">
            <div className="row">
            <form onSubmit={handleSubmit} className='form was-validated'>
            <div className='mt-4 rounded'>
                <h2 className='text-center'>Equipments</h2>
                <div className="row">
                    {/* <div className="col-md-3"></div> */}
                    <div className="col-md-6">
                        
                            {inputs.map((inputGroup, index) => (
                                index === currentPage && (
                                    <div key={index} >
                                        <div className="row d-flex">
                                            <label className="form-label">Equipment Name</label>
                                                <div>
                                                    <input
                                                        type="text" name="name" required
                                                        onChange={e=>handleInputChange(index,e)}
                                                        className="form-control"
                                                        
                                                        />
                                                    <label className="form-label mt-2">Amount</label>
                                                    <input 
                                                    type="number"
                                                    name="amount"
                                                    onChange={e =>handleInputChange(index,e)}
                                                    className="form-control" 
                                                    required  
                                                    />
                                                </div>
                                        {/* </div> */}
                                        </div>
                                        
                                        <button
                                            type="button"
                                            className="btn btn-danger mt-2"
                                            onClick={() => removeInputGroup(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )
                            ))}
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-3">
                                
                            </div>
                            <div className="col-md-6">
                                <div className='mt-4'>
                                    <button type="button" className="btn btn-primary mt-2 w-100" onClick={addInputGroup}>
                                        Add Input Group
                                    </button><br />
                                    <button type="submit" className="btn mt-2 w-100 btn-success">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="mt-2 pb-2">
                    {inputs.map((_, index) => (
                        <p
                            key={index}
                            type="button"
                            className={`btn btn-secondary mx-1`}
                        >
                            {index + 1}
                        </p>
                    ))}</div>
            </div>

            </form>
            </div>
           </div>
           <div style={loading?{display:"block"}:{display:"none"}}>
                <AppLoading />
            </div> 
        </div>
    );
}