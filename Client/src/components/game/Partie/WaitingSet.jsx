import WaintingPlayer from "./WaintingPlayer"


const WaintingSet = function(props){

    return<>
    <div className='w-full h-full flex justify-center items-center'>
        <div>
            <div className='flex justify-center items-center'>
                <span className="loading loading-spinner text-primary w-20 text-center"></span>
            </div>
            <div className='flex justify-center items-center'>
                <h2>En attente du debut de la manche</h2>
            </div>
        </div>
    </div>
</>
}

export default WaintingSet;