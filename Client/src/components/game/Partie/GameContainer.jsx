import { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/gameStore';
import WaintingPlayer from './WaintingPlayer';
import WaintingLetter from './WaitingLetter';
import WaintingSet from './WaitingSet';
import Letters from './Letters';
import Board from './Board';

function GameContainer() {
    const {organisator, service, partieId, joueurs, currentChooser} = useGameStore();

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
    }

    return(
        <div>
            <h1>GameContainer</h1>
        </div>
    )
}

export default GameContainer;