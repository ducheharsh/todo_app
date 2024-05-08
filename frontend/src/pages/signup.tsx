import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import logo from "../assets/Profsquota (3).png"
import {ReactTyped} from "react-typed";
import { useState } from "react";
import axios from "axios";


export function SignUp(){
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    return <div className="grid lg:grid-cols-2 grid-cols-1 h-screen">

    <div className="flex justify-center bg-[#643e2e]">
    <div className="flex flex-col mt-40 bg-white shadow-2xl rounded-lg w-2/4 h-2/3 p-5 justify-center focus:shadow-white hover:shadow-white/100">


        {/* Heading Div  */}
        <div className="flex flex-col mb-3 items-center pt-3 font-pixels"> 
            <div className="animate-bounce-slow"><Heading title="Sign Up"/></div>
            <div><SubHeading title="Enter your details to sign up"/></div>
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

        {/* Button & Input Issues Div  */}
        <div className="font-pixels">
            <Button onClick={async()=>{
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
                })
            }catch(error){
                console.log(error)
                alert("Unable to sign up (Email already exists)")

            }
            }} title="Submit"/>
            
        </div>

    </div>
    </div>
        <div className="bg-[#336a71] flex justify-center lg:visible invisible items-center flex-col shadow-xl">
        <img src={logo} className="px-3"/>
        <div className="font-pixels text-[#f2c885] font-thin text-2xl"><ReactTyped strings={["This is a simple Todo application"]} typeSpeed={100}  /></div>
        </div>
    </div>
}