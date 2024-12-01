
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState, useEffect } from 'react';
import NewRoom from './NewRoom';
import JoinRoom from './JoinRoom';
import { useGameStore } from '../../../store/gameStore';
import toast from 'react-hot-toast';


function Menu() { 

    const {joinRoom, createRoom} = useGameStore();

    const [newRoomState, setNewRoom] = useState(false);
    const [joinRoomState, setJoinRoom] = useState(false);
    
    let handleNewRoom = (checkList, scoreByI, score) => {
        if(checkList.length === 0) return toast.error("You must select at least 6 columns");
        createRoom(checkList, scoreByI, score);
    }

    let handleJoinRoom = (partiedId) => {
            joinRoom(partiedId);
    }

    let openNewRoom = () => {   
        setNewRoom(true);
    }

    let openJoinRoom = () => { 
        setJoinRoom(true);
    }

    let closeNewRoom = () => { 
        setNewRoom(false);
    }

    let closeJoinRoom = () => {
        setJoinRoom(false);
    }

    return (
        <>
        <div className='w-full h-full flex justify-center items-center'>
            <div className=' w-2/4 h-2/4 '>
                <h1 className='text-4xl text-center my-32'>Main Menu</h1>
                <div className='flex'>
                    <div className='w-1/2 flex justify-center items-center'>
                        <button className='bg-primary hover:bg-background text-white font-bold py-2 px-4 rounded mt-4 m-10' onClick={openNewRoom}>New room</button>
                    </div>
                    <div className='w-1/2 flex justify-center items-center'>
                        <button className='bg-primary hover:bg-background text-white font-bold py-2 px-4 rounded mt-4 m-10' onClick={openJoinRoom}>Join a room</button>
                    </div>
                </div>
            </div>

        </div>
        <Dialog open={newRoomState} as="div" className="relative z-10 focus:outline-none bg-black max-w-lg" onClose={closeNewRoom} >
            <DialogBackdrop className="fixed inset-0 bg-background" />
            <NewRoom closeNewRoom={closeNewRoom} create={handleNewRoom}/>
        </Dialog>
        
        <Dialog open={joinRoomState} as="div" className="relative z-10 focus:outline-none bg-black max-w-lg" onClose={closeJoinRoom} >
            <DialogBackdrop className="fixed inset-0 bg-background" />
            <JoinRoom closeJoinRoom={closeNewRoom} Join={handleJoinRoom}/>
        </Dialog>
        </>

    ) 
}

export default Menu;   