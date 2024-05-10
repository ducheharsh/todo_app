import { useEffect, useState } from "react";
import { AddTodo } from "../components/AddTodos";
import { Appbar } from "../components/Appbar";
import { Todos } from "../components/Todos";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { checkAtom } from "../store/atoms/atoms";
import { SubHeading } from "../components/SubHeading";

export const useTodos = ()=>{
    const [todos, setTodos] = useState([])
    const [firstName, setFirstName] = useState("") 
    const [lastName, setLastName] = useState("")
    const checkState = useRecoilValue(checkAtom)
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/mytodos",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res.data)
            setTodos(res.data.todo)
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
        }).catch((error)=>{
            console.log(error)
        })
    },[checkState])

    console.log(todos)
    return {todos, firstName, lastName}
}

export function MyTodos(){
   const{firstName} = useTodos() 
   return<div>
    <div className="shadow-xl shadow-black z-20"><Appbar firstName={firstName}/></div> 
   <div className="z-10">
    <div className=" bg-[#336a71] h-screen grid grid-cols-3">
       <div className="m-4 p-8 rounded-md bg-white h-fit col-span-1">
            <AddTodo/>
        </div>

        <div className="flex flex-wrap">
            <Todos/>
        </div>
    </div>
</div>
</div>
}