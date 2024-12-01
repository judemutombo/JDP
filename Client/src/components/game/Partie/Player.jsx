

const Player = function(props) {
    
    const color ="text-["+props.color+"]"
    return (
        <div className="flex  m-2 border-t items-center">
            <div className="h-full w-2/12 mt-1">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span className="uppercase">{props.name[0]}</span>
                    </div>
                </div>
            </div>
            <div className="h-full  w-10/12 flex items-center mt-1">
                <p className={"text-base  " + color}>{props.name}</p>
            </div>
        </div>
    );
}

export default Player;