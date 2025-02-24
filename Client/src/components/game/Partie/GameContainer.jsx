import { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/gameStore';
import WaintingPlayer from './WaintingPlayer';
import WaintingLetter from './WaitingLetter';
import WaintingSet from './WaitingSet';
import Letters from './Letters';
import Board from './Board';
import CorrectorBoard from './CorrectorBoard';

function GameContainer() {
    const {organisator, service, partieId, joueurs, currentChooser, isTheCorrector} = useGameStore();

    if(organisator && service === 'setConfiguration'){
        return(
           <WaintingPlayer /> 
        )
    }else if(!organisator && service === 'setConfiguration'){
        return <WaintingSet />
    }else if(service === 'attenteChoixLettre'){
        return <WaintingLetter joueur ={currentChooser} />
    }else if(service === 'choisirLettre'){
        return <Letters  />
    }else if(service === 'enCours'){
        return <Board />
    }else if(service === 'correction'){
        if(isTheCorrector){
            return <CorrectorBoard/>
        }else{
            return <div className='w-full h-full flex justify-center items-center'>
            <div>
                <div className='flex justify-center items-center'>
                    <span className="loading loading-spinner text-primary w-20 text-center"></span>
                </div>
                <div className='flex justify-center items-center'>
                    <h2>Correction</h2>
                </div>
            </div>
        </div>
        }     
    }

    return(
        <div>
            <h1>GameContainer</h1>
        </div>
    )
}

export default GameContainer;