import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../utils/axios';
import io from 'socket.io-client';

export const useGameStore = create((set,get) => ({
    waiting : false,
    user_id : null,
    socket_id : null,
    partieId : null,
    correcteurId : null,
    position : -1,
    joueur_id : null,
    service : null,
    username : null,
    name : null,
    surname : null,
    socket : null,
    affectedToRoom : false,
    isCheckingState : true,
    organisator : false,
    joueurs : [],
    currentChooser : null,
    characters : [],
    columns : [],
    currentCharacter :null,
    currentWords : {},
    isTheCorrector : false,
    correctionData : {},

    saveUserState : function(){
        const {user_id, socket_id, partieId, correcteurId, position, joueur_id, service, username, name, surname, organisator, currentWords, currentCharacter, isTheCorrector} = get();
        let json = {
            _socket_id : socket_id,
            _username :  username,
            _user_id : user_id,
            _partieId : partieId,
            _correcteurId : correcteurId,
            _position :  position,
            _joueur_id : joueur_id,
            _service : service,
            _name : name,
            _surname : surname,
            _organisator : organisator,
            _currentCharacter : currentCharacter,
            _currentWords : currentWords,
            _isTheCorrector : isTheCorrector
        };
        const serializedUser = JSON.stringify(json);
        localStorage.setItem('jdp_userState', serializedUser);
    },

    loadUserState : function(){
        const serializedUser = localStorage.getItem('jdp_userState');
        if(serializedUser){
            const user = JSON.parse(serializedUser);
            set({
                socket_id : user._socket_id,
                username : user._username,
                user_id : user._user_id,
                partieId : user._partieId,
                correcteurId : user._correcteurId,
                position : user._position,
                joueur_id : user._joueur_id,
                service : user._service,
                name : user._name,
                surname : user._surname,
                affectedToRoom : user._partieId ? true : false,
                organisator : user._organisator,
                currentWords : user._currentWords,
                currentCharacter : user._currentCharacter,
                isTheCorrector : user._isTheCorrector
            });
        }
    },
    
    setData : function(data){
        
        const {saveUserState, loadUserState, debug} = get();
        loadUserState();
        set({
            username : data.username,
            name : data.name,
            surname : data.surname,
            user_id : data.user_id,
        });
        saveUserState();
        //debug();
    },
    
    debug : function(){
        console.log(get());
    },

    checkState : async function(){
        try {
            const {setData} = get();
            const res = await axiosInstance.get('/auth/check');
            setData(res.data);

            const {initializeSocket} = get();   
            initializeSocket();

        }catch(error){
            set({affectedToRoom : false});
        }finally{
            set({isCheckingState : false});

            const {retrieveData} = get();
            retrieveData()
        }
        
    },

    joinRoom : async function(partieId){
        try{
            const {socket, username, name} = get();
            console.log(partieId)
            await socket.emit('join_game', {
                'pid' : partieId,
                'jud' : username,
                "jn": name
            });
        }catch(error){
            toast.error(error);
        }
    },

    createRoom : async function(selectedColumns, scoreBy, score){
        try{
            const {socket, username, name} = get();
            
            await socket.emit('new_game', {
                'columns' : selectedColumns,
                'jud' : username,
                'score' : parseInt(score),
                'scoreByI' : scoreBy,
                'jn' : name
            });

        }catch(error){
            toast.error(error);
        }
    },
    reset : function(){
        set({partieId : null, 
            correcteurId : null, 
            position : -1, 
            service : null, 
            affectedToRoom : false, 
            organisator : false, 
            joueurs : [],
            joueur_id : null
        })
        const {saveUserState} = get()
        saveUserState()
    },
    initializeSocket: async function () {
        if (!get().socket) {
            const socket = io('http://localhost:5001');
            set({ socket });

            socket.on('connected', async (data) => console.log('Connected:', data));
            socket.on('disconnect', async () => {
                const {reset} = get()
                reset()
            });

            socket.on('AttentePartie', async (data) => {
                    set({waiting : false})
                    set({organisator : true});
                    set({correcteurId : data.cid});
                    set({partieId : data.pid});
                    set({position : data.tour});
                    set({service : "setConfiguration"});
                    set({affectedToRoom : true});
                    set({joueur_id : data.jid});
                    set({columns : data.colonnes});
                    const {saveUserState} = get();
                    saveUserState();
                    toast.success('Room created');
            });
            
            socket.on('Erreur', async (data) => {
                toast.error('Erreur : ' + data.Erreur);
                const {reset} = get()
                reset()
            });

            socket.on('joueurAjoute', async (data) => {
                toast.success('Player added to game:');
                const {saveUserState} = get();
                saveUserState();
                set({joueurs :[...data.joueurs]});
            });

            socket.on('AttenteDebutPartie', async (data) => {
                set({waiting : false})
                set({organisator : false});
                set({affectedToRoom : true});
                set({correcteurId : data.cid});
                set({partieId : data.pid});
                set({position : data.tour});
                set({joueur_id : data.jid});
                set({service : "setConfiguration"});
                set({columns : data.colonnes});
                const {saveUserState} = get();
                saveUserState();
                toast.success('Player added to game:');
                
            });

            socket.on('retour', async (data) => {
                set({waiting : false})
                const {saveUserState} = get();
                set({service : data.service});
                set({joueurs :[...data.joueurs]});
                set({columns : data.colonnes});
                set({currentCharacter : data.courante});
                set({characters : data.utilisees});
                set({currentChooser : data.choisisseur});
                saveUserState();
                toast.success('Back in the game');
                const {debug} = get()
                debug()
            });

            socket.on('Notification', async (data) => {
                toast.success(data.message);
                console.log(data)
            });

            socket.on('attenteChoixLettre', async (data) => {
                set({waiting : false})
                const {saveUserState} = get();
                set({service : "attenteChoixLettre"});
                set({currentChooser : data.joueur})
                saveUserState();
                toast.success(`En attente que ${data.joueur} choissise une lettre.`);
                
            });

            socket.on('ChoisirLettre', async (data) => {
                set({waiting : false})
                const {saveUserState} = get();
                set({service : "choisirLettre"});
                set({characters : [...data.lettres]})
                saveUserState();
                toast.success(`C'est à vous de choisir une lettre`);
            });

            socket.on('Manche', async (data) => {
                set({waiting : false})
                const {saveUserState} = get();
                if(data.type == "debut"){
                    set({service : data.service, currentCharacter : data.lettre});
                }else if(data.type == "soumettre"){
                    set({service : data.service});
                    const {position, socket, partieId, correcteurId, joueur_id, currentWords} = get()
                    console.log(currentWords)
                    await socket.emit("send_words",{
                        pid : partieId,
                        cid : correcteurId,
                        jid : joueur_id,
                        words : currentWords
                    })
                }
                saveUserState();
            });
            socket.on('correcteur', async (data) =>{
                const {saveUserState} = get()
                set({isTheCorrector : true})
                set({correctionData : data.data})
                saveUserState()
            })
        }
    },

    retrieveData : async function () {
        const {affectedToRoom, socket, partieId, correcteurId, joueur_id, username, name} = get();

        if(affectedToRoom){
            try{
                await socket.emit("retrieve_game_data",{
                    pid: partieId,
                    cid: correcteurId,
                    jid: joueur_id,
                    jud: username,
                    jn : name
                })
            }catch(error){
                toast.error(error);
            }

        }     
    },

    debuterPartie : async function (){
        const {waiting} = get()
        if(waiting) return toast.success("Patientez")

        const {socket, joueurs, partieId, correcteurId} = get()
        
        if(joueurs.length <= 1){
            return toast.error("Au moins deux joueurs sont requis.")
        }

        try{
            set({waiting : true})
            await socket.emit("begin",{
                pid: partieId,
                cid: correcteurId 
            })

        }catch(error){
            toast.error(error);
        }
    },

    choixDeLettre : async function(lettre) {
        const {waiting} = get()
        if(waiting) return toast.success("Patientez")

        const {position, socket, partieId, correcteurId} = get()
        set({waiting : true})
        await socket.emit("lettreChoisi",{
            pid : partieId,
            cid : correcteurId,
            lettre : lettre,
            position : position
        })
    },

    soumettre : async function(){
        const {waiting} = get()
        if(waiting) return toast.success("Patientez")

        const {position, socket, partieId, correcteurId} = get()
        set({waiting : true})
        await socket.emit("soumettre",{
            pid : partieId,
            cid : correcteurId
        })
    },

    updatewords : async function(words) {
        set({currentWords : words})
        const {saveUserState} = get()
        saveUserState()
    } 
}));