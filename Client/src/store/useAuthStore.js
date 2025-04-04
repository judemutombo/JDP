import {create} from 'zustand';
import {axiosInstance} from '../utils/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set, get) => ({
    userAuth : null,
    isSigningIn : false,
    isSigningUp : false,
    isCheckingAuth : true,

    checkAuth : async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({userAuth : res});
        }catch(error){
            set({userAuth : null});
        }finally{
            set({isCheckingAuth : false});
        }
    },

    signup : async (info) => {
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post('/auth/signup', info);
            const {saveUserState} = get()
            saveUserState(res.data)
            set({userAuth : res});
            toast.success("Enjoy");
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp : false});
        }
    },

    signin : async (info) => {
        set({isSigningIn : true});
        try {
            const res = await axiosInstance.post('/auth/signin', info);
            const {saveUserState} = get()
            saveUserState(res.data)
            toast.success("Enjoy");
            set({userAuth : res});
        }catch(error){
            console.log(error);
        }finally{
            set({isSigningIn : false});
        }
    },

    checkUsername : async (info) => {
        
        try {
            const res = await axiosInstance.post('/auth/check-username', info);
            return res.checked
        }catch(error){
        }
    },

    saveUserState : function(data){
        let json = {
            _username : data.username,
            _name : data.name,
            _surname : data.surname,
            user_id : data.id,
        }
        const serializedUser = JSON.stringify(json);
        localStorage.setItem('jdp_userState', serializedUser);
    },

    disconnect : function(){
       /*  let getActive = browser.tabs.query({ active: true, currentWindow: true });
        getActive.then(function(tab){
            let removing = browser.cookies.remove({
                url: tabs[0].url,
                name: "jdp_token",
              });
              removing.then(onRemoved, onError);
        });
        set({
            userAuth : null
        }) */ 
    }
}))
  
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}