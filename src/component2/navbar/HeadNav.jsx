import { CgProfile } from "react-icons/cg";
export const HeadNav = () => {
    const logout = () => {
        localStorage.clear()
       

        window.location.replace('/');

    }
    return <>
            <div className="row head_nav">
                <div className="col-12">
                    <div className="nav_head">              
                        <h1 className="head">Cheetah Alimentation</h1>
                        {
                            localStorage.getItem("token")?
                            <p onClick={()=> logout()}>Log out</p>:<></>
                        }
                    </div>          
                </div>
            </div>
    </>
}