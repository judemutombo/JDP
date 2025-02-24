import { useState } from "react";
import { useGameStore } from "../../../store/gameStore";
import WordField from "./WordField";


const Board = function(){
    const {columns, currentCharacter, updatewords, currentWords, soumettre} = useGameStore()
    
    const wds = columns.reduce((acc, column) => {
        acc[column] = ""; 
        return acc;
      }, {});
      
    const [words, setWords] = useState(wds)

    const handleWord = function(word, column){
        setWords(prevWords =>({...prevWords,[column] : word}))
        updatewords(words)
    }

    const handleTerminate = function(e){
        soumettre()
    }
    
    const hd = []
    columns.map(element =>{
        hd.push(<td className="border">{element}</td>)
    })
    const inputs = []
    columns.map(element =>{
        inputs.push(<tr>
            <td className="border px-4 w-1/4">{element}</td>
            <td className="border w-3/4"><WordField  column={element} setw={handleWord}/></td>
            </tr>)

    })

    return(
        <div className="w-full h-full flex justify-center px-2">
            <div className="max-w-7xl w-full relative">
                <div className="flex justify-center w-full">
                    <p>La lettre en cours est <span className="text-background font-bold">{currentCharacter}</span></p>
                </div>
                <table className=" w-full border my-6 words-table" >
                    <tbody>
                        {inputs}
                    </tbody>
                </table>
                <div className="absolute bottom-4 flex justify-center w-full">
                    <button className="rounded-3xl bg-background w-72 h-10 text-white" onClick={handleTerminate}>Soumettre</button>
                </div>
            </div>

        </div>
    )
}


export default Board;