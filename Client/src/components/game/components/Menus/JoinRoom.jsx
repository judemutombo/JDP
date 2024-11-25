import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react';

function JoinRoom({closeJoinRoom, Join}) {

    const [partiedId, setPartiedId] = useState('')

    const Joinroom = () => {
        Join(partiedId)
    }

    return(<div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4 text-secondary ">
            <DialogPanel
            style={{ width: '50rem' }}
            transition
            className="w-full rounded-xl bg-primary p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
               Rejoindre une partie
            </DialogTitle>
            <div className="mt-4">
                <input type="text" placeholder="ID de la partie" value={partiedId} onChange={(e) => setPartiedId(e.target.value)} className="w-full rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700" />
            </div>
            <div className="mt-4">
                <Button onClick={Joinroom} className="inline-flex items-center gap-2 rounded-md bg-background py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                    Rejoindre
                </Button>
            </div>
            </DialogPanel>
        </div>
    </div>)
}


export default JoinRoom;    