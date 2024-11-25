import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react';
import {infos} from "../../../../data/columns.js"
import Selector from './Selector';


function NewRoom({closeNewRoom, create}) {

    const scoreByI = infos.Motidentique.cote
    const scores = infos.Point
    const [selectedColumns, setSelectedColumns] = useState([])
    const [scoreBy, setScoreBy] = useState(scoreByI[0])
    const [score, setScore] = useState(scores[0])

    const columns = infos.Colonnes
    const listColumns = columns.map((column) => 
        <Selector name={column.nom} key={column.nom} onCheck={setSelectedColumns} checkList={selectedColumns}/>
    )

    const createRoom = () => {
        create(selectedColumns, scoreBy, score)
    }

    const handleScoreBy = (e) => {
        setScoreBy(e.target.value)
    }
    
    const handleScore = (e) => {
        setScore(e.target.value)
    }

    return(
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-secondary ">
                <DialogPanel
                style={{ width: '50rem' }}
                transition
                className="w-full rounded-xl bg-primary p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                   Nouvelle partie
                </DialogTitle>
                <fieldset className='p-4'>
                    <legend>Choissiez les colonnes (minimum 6)</legend>
                    <div className='grid grid-cols-3 gap-2'>
                        {listColumns}
                    </div>
                </fieldset>
                <div className="flex flex-row p-4">
                    <label htmlFor="mid-comboBox" className='flex items-center'>En cas de mot identique </label>
                    <select onChange={handleScoreBy} id="mid-comboBox" name="mid-comboBox" className='pl-1 bg-primary border outline-none ml-1 border-foreground rounded-md w-32 h-10' >
                        {scoreByI.map((score) => 
                                <option value={score} key={score}>{score}</option>
                            )}
                        </select> 
                    </div>
                <div className="flex flex-row p-4">
                    <label htmlFor="mid-comboBox" className='flex items-center'>Point par colonne </label>
                    <select onChange={handleScore} id="mid-comboBox" name="mid-comboBox" className='pl-1 bg-primary border outline-none ml-1 border-foreground rounded-md w-32 h-10'>
                        {scores.map((score) => 
                                <option value={score} key={score}>{score}</option>
                            )}
                        </select> 
                </div>
                <div className="mt-4">
                    <Button onClick={createRoom} className="inline-flex items-center gap-2 rounded-md bg-background py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                        Créer
                    </Button>
                </div>
                </DialogPanel>
            </div>
        </div>
    )

}

export default NewRoom;