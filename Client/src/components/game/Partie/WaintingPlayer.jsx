import React, { useEffect } from 'react';
import Player from './Player';
import { useGameStore } from '../../../store/gameStore';

const couleurs = ["#042940","#A62B1F","#F2A71B","#F2668B","#034001","#9C3E00","#103778","#A1C7E0","#7A577A","#7A6D31"]
function WaintingPlayer(props) {


    const {joueurs, debuterPartie, partieId} = useGameStore()
    let i = 0
    const players = joueurs.map((joueur) => {
        i++
        return <Player key={i+1} name={joueur} color ={couleurs[i]}/>
    });

    useEffect(()=>{

    },[props.joueurs])
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-3 rounded-md border max-w-md w-4/5 h-3/4 max-h-96 bg-transparent glass overflow-hidden text-secondary">
                
                <div className='h-10 flex justify-center items-center'>
                    <h2>ID de la partie : {partieId}</h2>
                </div>
                <div className="overflow-y-scroll h-3/4 border-b">
                    {players}
                </div>
                <div className='h-14 flex justify-center items-center'>
                    <button className="rounded-3xl bg-background w-72 h-3/4" onClick={debuterPartie}>Lancer la partie</button>
                </div>
            </div>
        </div>
    );
}


export default WaintingPlayer;