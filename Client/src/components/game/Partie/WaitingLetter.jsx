import WaintingPlayer from "./WaintingPlayer"


const WaintingLetter = function(props){

    return<>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='flex items-center'>
                <span className="loading loading-spinner text-primary w-20 text-center"></span>
                <h2>{`En attente que ${props.joueur} choissise une lettre.`}</h2>
            </div>
        </div>
    </>
}

export default WaintingLetter;