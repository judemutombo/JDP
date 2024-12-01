import { useState } from "react";


const WordField = function(props){
    const [word, setWord] = useState('')
    const handleWord = function(e){
        setWord(e.target.value)
        props.setw(e.target.value, props.column)
    }
    return (
        <input className="w-full h-10 bg-primary outline-0 px-2 text-white" type="text" name="word" id="word" value={word} onChange={handleWord}/>
    )

}

export default WordField;