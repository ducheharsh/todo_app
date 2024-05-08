
import React, {PropsWithChildren} from 'react';

export interface Props {
    title: string;
  }
export function SubHeading(props:PropsWithChildren<Props>){
    return <div>
        {props.title}
    </div>
   }