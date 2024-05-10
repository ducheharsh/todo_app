
import { CheckboxChecked } from "./Checkbox"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTodos } from "../pages/mytodos"
import { useRecoilState } from "recoil"
import { checkAtom } from "../store/atoms/atoms"





export function Todos(){
    
    const {todos, firstName, lastName} = useTodos()
   
    
  

    return <div >
        
        {

        todos?.length > 0 ?
       (todos.map((todo:any)=>{return <TodoCard key={todo.id} title={todo.title} description={todo.description} createdAt={todo.createdAt} done={todo.done} id={todo.id}/> }))
        : <div>No Todos Found</div>
        
        }


    </div>
}

interface Props{
    title:string,
    description:string,
    createdAt?:string,
    done:boolean,
    id:number
}


function TodoCard({title, description, createdAt, done, id}:Props){
    const [checkState, setCheckState] = useRecoilState(checkAtom)
    return <div className="bg-white mt-4 p-4 rounded-md shadow-2xl">
    <div className="flex flex-col pb-2">
    
        <div className="flex justify-between"><span className="font-light text-md">Title</span><CheckboxChecked checked={done} onClick={()=>{
            setCheckState(!checkState)
            axios.put(`http://localhost:3000/api/v1/user/mytodos/${id}`,{done:!done},{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }).then((res)=>{
                console.log(res)
            }).catch((error)=>{
                console.log(error)
            })
        }}/></div>
        <div className="text-xl font-bold">{title}</div>
    </div>
    <hr></hr>
    <div className="pt-2">
        <span className="font-light text-md">Description</span>
        <div className="text-md font-bold">{description}</div>
    </div>

    <div>
        {createdAt}
    </div>
   
    </div>

}