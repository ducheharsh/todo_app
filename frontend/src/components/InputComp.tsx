import {PropsWithChildren} from 'react';

export interface Props {
    label: string,
    type:string,
    placeholder:string,
    onChange:any
  }

export function InputComp(props:PropsWithChildren<Props>){
    return <div className="flex flex-col">
        <div className="font-semibold pb-2">{props.label}</div>
        <input type={props.type} onChange={props.onChange} placeholder={props.placeholder} className="border-2 rounded-lg p-2 mb-4 w-full"></input>
    </div>

}