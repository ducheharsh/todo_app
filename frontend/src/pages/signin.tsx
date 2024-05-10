import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import logo from "../assets/Profsquota (3).png"
import {ReactTyped} from "react-typed";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Alert } from "../components/alert";



export function SignIn(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [customalert, setCustomAlert] = useState(false)
    //Issues Component yet to be created
    const [issues, setIssues] = useState([])
    console.log(issues)
    const navigate = useNavigate()

    document.body.style.backgroundColor = "#ff914d"

    return <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-screen">
        

    <div className="flex justify-center h-screen  items-center bg-[#643e2e]  hover:shadow-black ">
    <div className="flex flex-col bg-white shadow-2xl rounded-lg md:w-2/4 h-fit p-5 justify-center ">

        {/* Heading Div  */}
        <div className="flex flex-col mb-3 items-center pt-3 font-pixels"> 
            <div className="animate-bounce-slow"><Heading title="Sign In"/></div>
            <div className="text-center"><SubHeading title="Welcome back !"/></div>
        </div>

        {/* Inputs Div  */}
        <div className="m-3 font-pixels">
            <InputComp onChange={(e:any)=>{
                setEmail(e.target.value)
            }} label="Email" placeholder="doeji@gmail.com" type="text"/>
            <InputComp onChange={(e:any)=>{
                setPassword(e.target.value)
            }} label="Password" placeholder="shhhhhhh" type="password"/>
        </div>

        {/* Button & Input Issues Div  */}
        <div className="font-pixels flex justify-center">
            <Button onClick={async()=>{
        
                try{
                await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username:email,
                    password:password
                }).then((res:any)=>{
                    const token = "Bearer "+res.data.token
                    localStorage.setItem("token", token)
                    console.log(res)
                    alert("Signed In Successfully")
                    navigate("/mytodos")
                    setIssues([])
                    setCustomAlert(false)
                })
            }catch(error:any){
                if(error.response.data.msg === "User not found"){
                    setCustomAlert(true)
                }
                if (error?.response?.data?.error?.issues) {
                    console.log(error.response.data.error.issues)
                    setIssues(error.response.data.error.issues)
                } else {
                    console.log(error);
                }
            }
            }} title="Submit"/>
            
        </div>
        <div className="py-3">
        

        {(issues.length > 0) ? issues.map((x:any) => <ErrorMessage message={x.message} code={x.path?.[0]}/>) : null}
                
            </div>
        
        {/* Alert Div */}
        <div className="flex justify-center font-pixels font-light">
            {customalert ? <Alert/> : null}
            <span>New here?</span><span>_</span><a href="/signup" className="text-[#ff914d] font-bold"> Create a New Account </a>
        </div>

    </div>
    </div>
        <div className="bg-[#336a71] flex justify-center lg:visible invisible items-center flex-col shadow-2xl shadow-black">
        <img src={logo} className="px-3"/>
        <div className="font-pixels text-[#f2c885] font-thin text-2xl px-2"><ReactTyped strings={["This is a simple Todo application"]} typeSpeed={100}  /></div>
        </div>
    </div>
}