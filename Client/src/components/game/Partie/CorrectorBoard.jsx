import { useState, useEffect } from "react";
import { useGameStore } from "../../../store/gameStore";
import TagField from './TagField'

const CorrectorBoard = function(props){
    const {correctionData} = useGameStore()
    const handleTerminate = (e) =>{

    }

    const data = []
    const headers = []
    for(let key in correctionData){
        const row = []
        for(let k in correctionData[key]){
            row.push(<td className="border h-12">
                <TagField value={correctionData[key][k]}/>
            </td>)
        }
        data.push(<tr>{row}</tr>)
    }
    return <div className="w-full  h-full flex justify-center px-2">
        <div className="max-w-7xl w-full relative">
            <table className=" w-full  my-6 words-table" >
                <thead>
                    {headers}
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        </div>
        <div className="absolute bottom-4 flex justify-center w-full">
            <button className="rounded-3xl bg-background w-72 h-10 text-white" onClick={handleTerminate}>Soumettre</button>
        </div>

    </div>
}



export default CorrectorBoard;