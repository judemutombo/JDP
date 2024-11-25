import { useState, useEffect } from 'react';


function Selector({name, childrenn, onCheck, checkList}) { 
    const [selected, setSelected] = useState(false);
    const [className, setClassName] = useState('border rounded-lg py-3.5 border-foreground')

    let handleSelect = () => { 
        setSelected(!selected);
        if(!selected){
            setClassName('border rounded-lg py-3.5 border-background')
            let newList = [...checkList, name]
            onCheck(newList)
        }else{
            
            let newList = checkList
            newList.splice(newList.indexOf(name), 1)
            onCheck(newList)
            setClassName('border rounded-lg py-3.5 border-foreground')
        }
    }

    return(
    <> 
        <div className={className} children>
            <input className='ml-3.5 mr-2.5' type="checkbox"  name={name} onChange={handleSelect} checked={selected}/>
            <label htmlFor="option1" onClick={handleSelect}>{name}</label>
        </div>
    </>)
}

export default Selector;