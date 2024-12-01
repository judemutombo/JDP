import { useState } from 'react';
import '../../css/style.css';
import { useAuthStore } from '../../store/useAuthStore';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';


function SignInPage() {

    const {signin,isSigningIn} = useAuthStore();

    const [info, setInfo] = useState({
        "username" : "", 
        "password" : ""
    }) 

    const validateForm = function (){
        if(!info.username.trim()) return toast.error("Username is required")
        if(!info.password.trim()) return toast.error("Password is required")
        
        return true
    }
    const handleSubmit = function (e){
        e.preventDefault()
        const success = validateForm()
        if (success === true) signin(info)
    }

    return (
        <div className="w-full h-full color-green-200 flex items-center justify-center bg-background">
            <div className='relative flex flex-row max-w-screen-lg w-4/5 h-3/4 bg-transparent  rounded-md  glass overflow-hidden text-secondary'>
                <div className='w-1/2'>
                    <form action="" className='w-full h-full px-10 pt-40' onSubmit={handleSubmit}>
                        <h1 className="title mt-9 font-bold">
                            Welcome Back
                        </h1>
                        <p className="sub-title mb-9">Please enter your account details</p>
                        <p className='my-2'>Username</p>
                        <input type="text" name="username" onChange={(e)=>{setInfo({...info, "username" : e.target.value})}} id="name" className='bg-primary rounded-3xl w-full h-12 outline-0 px-7' />
                        <p className='my-2'>Password</p>
                        <input type="password" name="password" onChange={(e)=>{setInfo({...info, "password" : e.target.value})}} id="password"  className='bg-primary rounded-3xl w-full h-12 outline-0 px-7'/>
                        <a className='my-2 block w-full text-right' href=''>Forgot password</a>
                        <button type="submit" onClick={handleSubmit}  className='rounded-3xl bg-background w-full h-12' >
                            { isSigningIn ? <span className="loading loading-spinner text-primary "></span> : "Sign In"}
                        </button>
                        <p className='my-2'>Don't have an account? <Link to="/signup" className='text-primary'>Sign up</Link></p>
                    </form>
                </div>
                <div className='w-1/2'>
                    <div className='w-full h-full p-8 bg-primary'>
                        <p className='w-full text-center text-xl'>World of the day</p>
                        <p className='w-full mt-60 text-center text-7xl'>Random</p>

                    </div>
                </div>
            </div>
            
        </div>
    );
  }



  
export default SignInPage;
  