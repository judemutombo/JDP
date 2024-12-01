import {create} from 'zustand';
import {axiosInstance} from '../utils/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set) => ({
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
}))
  
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}