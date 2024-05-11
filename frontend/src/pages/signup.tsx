import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import logo from "../assets/Profsquota (3).png"
import {ReactTyped} from "react-typed";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function SignUp(){
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    
    //Issues Component yet to be created
    const [issues, setIssues] = useState([""])

    const navigate = useNavigate()

    document.body.style.backgroundColor = "#ff914d"

    return <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-screen">

    <div className="flex justify-center h-screen  items-center bg-[#643e2e]  hover:shadow-black ">
    <div className="flex flex-col bg-white shadow-2xl rounded-lg md:w-2/4 h-fit p-5 justify-center ">

        {/* Heading Div  */}
        <div className="flex flex-col mb-3 items-center pt-3 font-pixels"> 
            <div className="animate-bounce-slow"><Heading title="Sign Up"/></div>
            <div className="text-center"><SubHeading title="Enter your details to sign up"/></div>
        </div>

        {/* Inputs Div  */}
        <div className="m-3 font-pixels">
            <InputComp onChange={(e:any)=>{
                setFirstName(e.target.value)
            }} label="First Name" placeholder="John" type="text"/>
            <InputComp onChange={(e:any)=>{
                setLastName(e.target.value)
            }} label="Last Name" placeholder="Doe" type="text"/>
            <InputComp onChange={(e:any)=>{
                setEmail(e.target.value)
            }} label="Email" placeholder="doeji@gmail.com" type="text"/>
            <InputComp onChange={(e:any)=>{
                setPassword(e.target.value)
            }} label="Password" placeholder="shhhhhhh" type="password"/>
        </div>
        
        <div>
        <span>Already Registered?</span><span> </span><a onClick={()=>{
            navigate("/signin")
        }} className="text-[#ff914d] font-bold">  Log in</a>
        </div>
        
        {/* Button & Input Issues Div  */}
        <div className="font-pixels flex justify-center">
            <Button onClick={async()=>{
                    await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=a3cd78f02b70499aa3deae507bf7a17f&email=${email}`)
                    .then(response => {
                        if(response.data.deliverability == "DELIVERABLE"){
                            console.log("Email is valid")
                        }
                        if(response.data.deliverability == "UNDELIVERABLE"){
                            alert("Email is invalid")
                            setIssues([...issues, "Email is invalid"])
                            return
                        }   
                    })
                    .catch(error => {
                        console.log(error);
                    
                    });
                try{
                await axios.post("http://localhost:3000/api/v1/user/signup",{
                    firstName:firstName,
                    lastName:lastName,
                    username:email,
                    password:password
                }).then((res:any)=>{
                    const token = "Bearer "+res.data.token
                    localStorage.setItem("token", token)
                    console.log(res)
                    alert("Signed In Successfully")
                    navigate("/mytodos")
                })
            }catch(error){
                console.log(error)
                

            }
            }} title="Submit"/>
            
        </div>

    </div>
    </div>
        <div className="bg-[#336a71] flex justify-center lg:visible invisible items-center flex-col shadow-2xl shadow-black">
        <img src={logo} className="px-3"/>
        <div className="font-pixels text-[#f2c885] font-thin text-2xl px-2"><ReactTyped strings={["This is a simple Todo application"]} typeSpeed={100}  /></div>
        </div>
    </div>
}