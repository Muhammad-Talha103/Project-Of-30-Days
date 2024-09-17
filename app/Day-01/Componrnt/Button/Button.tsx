import {ButtonProps} from "../types/types";



export default function Button(props:ButtonProps ){
    return(
  
        <button className={props.color} onClick={props.onclick} >
            {props.title}{props.icon}
         </button>

    )
}