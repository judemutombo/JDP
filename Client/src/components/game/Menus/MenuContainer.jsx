import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/gameStore';
import {Toaster} from "react-hot-toast"
import Menu from './Menu';
import GameContainer from '../Partie/GameContainer';

function MenuContainer(){
    const {affectedToRoom, checkState, isCheckingState} = useGameStore();

    useEffect(() => {
        checkState();
    },[checkState])

    if(isCheckingState){
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner text-primary w-20"></span>
        </div>
    }

    return(
        <>
        {affectedToRoom ? <GameContainer />: <Menu />}
        </>
    )

}


export default MenuContainer;