

const Letter = function(props){
    const handleClick = (e) =>{
        e.preventDefault()
        props.click(props.letter)
    }
    return(
        <div className="w-full h-16 flex justify-center items-center text-white">
            <button className="bg-background w-4/5 h-4/5 rounded-md shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700" onClick={handleClick}>
                {props.letter}
            </button>
        </div>
    )
}

export default Letter;