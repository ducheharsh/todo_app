import { useState } from "react";
import { Heading } from "./Heading";
import { InputComp } from "./InputComp";
import { SubHeading } from "./SubHeading";
import { Button } from "./Button";
import axios from "axios";


export function AddTodo(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    return <div>
        <div>
        <Heading title="Add Todo"/>
        <SubHeading title="Add your Todos here"/>  
            {/* Title Div  */}    
            <div>

                <InputComp onChange={(e:any)=>{
                    setTitle(e.target.value)
                }} label="Title" placeholder="Title" type="text"/>             
            </div>
                
            {/* Description Div  */}
            <div>
                <InputComp onChange={(e:any)=>{
                    setDescription(e.target.value)
                }} label="Description" placeholder="Description" type="text"/>
            </div>
            
            {/* Button Div  */}
            <div>
                <Button title="Add Todo" onClick={()=>{
                    if (!(title === "" || description === "")){
                    axios.post("http://localhost:3000/api/v1/user/add-todo",{title, description},{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    }).then((res)=>{
                        console.log(res)
                        alert("Todo Added Successfully")
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else{
                    alert("Please fill all the fields")
                }}
                }/>
            </div>
        </div>
    </div>
}