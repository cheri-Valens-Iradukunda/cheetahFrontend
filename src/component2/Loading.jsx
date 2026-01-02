// import { TrophySpin } from "react-loading-indicators"
import { ThreeDot } from "react-loading-indicators";
import "./Loading.css"

export const AppLoading = () => {
    return <>

        <div className="container-fluid dropdownLoading">
            <div className="row">
                <div className="col-lg-4 col-md-2 col-1"></div>
                <div className="col-lg-4 col-md-8 col-sm-10 col-12">
                    <div className="container w-100 dropDivLoading">{
                        // <ThreeDot variant="brick-stack" color="rgb(3, 7, 53)" size="medium" text="" textColor="" />
                        <ThreeDot color="rgb(3, 7, 53)" size="medium" text="Loading" textColor="" />
                    }</div>
                </div>
            </div>                
        </div>
            
    </>
}