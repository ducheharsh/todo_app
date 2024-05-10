

export interface Props{
    title:string
}

export function Button({onClick, title}:any){

 return <div>

        <div className="pixel pixel-m font-pixels text-md" onClick={onClick}><p>{title}</p></div>
    
 </div>
}