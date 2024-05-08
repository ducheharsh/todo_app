import { PropsWithChildren } from "react";

export interface Props{
    title:string
}

export function Button({onClick, title}:any){

 return <div>
    <button onClick={onClick} type="button" className="text-white h-12 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 w-full">{title}</button>
 </div>
}