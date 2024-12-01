import { useGameStore } from "../../../store/gameStore";
import Letter from "./Letter"

const Letters = function(){
    
    const {characters, choixDeLettre} = useGameStore();

    let dec = 65
    let letters = []
    for (let index = 0; index < 26; index++) {
        if(characters.includes(String.fromCharCode(dec + index))) continue
        
        letters.push(<Letter letter={String.fromCharCode(dec + index)}  click={choixDeLettre} key={index}/>) 
        
    }

    
    return(
        <div className="w-full h-full flex justify-center items-center">
        <div className=" max-w-xl w-full">
            <div className="flex justify-center items-center mb-3">
                <h1>Choissez la lettre pour la manche</h1>
            </div>
            <div className="grid grid-cols-9">
                {letters}
            </div>
        </div>
        </div>
    )

}

export default Letters;