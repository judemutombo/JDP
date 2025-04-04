import { useState } from "react";


function TagField(props){
    const [selected, setSelected] = useState(false);
    const [className, setClassName] = useState(props.value[1] == "empty" ? "w-full h-full flex flex-row  bg-red-500" : props.value[1] == "repeat" ?"w-full h-full flex flex-row  bg-background" :   "w-full h-full flex flex-row")
    console.log(props.value[1] == "repeat")
    const onChange =(e) =>{
        setSelected(!selected);
        props.check()
    }
    return (
        <div className={className}>
            <div  className="w-3/4 h-full flex justify-center items-center text-white">
                <p>{props.value[0]}</p>
            </div>
            <div  className="w-1/4  flex justify-center items-center">
                <input type="checkbox" onChange={onChange} selected/>
            </div>

        </div>
    )

}

export default TagField;