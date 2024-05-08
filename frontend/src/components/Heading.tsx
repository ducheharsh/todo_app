
import React, {PropsWithChildren} from 'react';

export interface Props {
    title: string;
  }
export function Heading(props:PropsWithChildren<Props>){
    return <div>
        <h3 className="text-3xl font-bold">{props.title}</h3>
   
    </div>
   }