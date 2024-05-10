import { useNavigate } from "react-router-dom";
import { SubHeading } from "./SubHeading";

export function Appbar({firstName}:any){
    const navigate = useNavigate()
    return<div>
     <div className="grid grid-cols-2 px-3 py-2  shadow-2xl  bg-[#643e2e] text-white">
     <div className="justify-self-start font-semibold text-lg pt-2">Todofy</div>
     <div className="justify-self-end flex"><div className="">{firstName}
 
     
     
     <div onClick={()=>{
        localStorage.removeItem("token")
        navigate("/signin")
     }
     }><SubHeading title="Logout"/></div>
     </div> <div className="px-2"><div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-300 rounded-full ">
     <span className="font-medium text-black ">{firstName[0]}</span>
 </div>
 </div>
  </div>
     
 
     </div>
     <hr className="border-1 border-[#643e2e]"></hr>
     </div>
 }