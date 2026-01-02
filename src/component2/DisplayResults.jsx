import { useState } from "react"

export const ResultDisplay = (props) => {

    const [results,setResults] = useState(props.returns)
    // setResults(props.returns)

    return <>
        <div className="container bg-success result_display">
            <div className="row">
                <div className="col-md-12">
                    <h4>Results for actions</h4>
                    {results && results.map((singleReturn,index)=>(
                        <div key={index}>
                            <ul>{
                                    singleReturn.includes("successfully")?<li style={{background:"rgb(135, 247, 135)"}}>
                                        {singleReturn}
                                    </li>:
                                    <li style={{background:"rgb(201, 198, 198)"}}>
                                        {singleReturn}
                                    </li>
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}