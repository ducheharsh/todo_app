
import React, {PropsWithChildren} from 'react';

export interface Props {
    title: string;
  }
export function SubHeading(props:PropsWithChildren<Props>){
    return <div className='text-xs'>
        {props.title}
    </div>
   }