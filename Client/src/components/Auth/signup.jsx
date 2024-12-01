import '../../css/style.css';
import { useState, useRef } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';

function SignUpPage() {

    const {signup,isSigningUp} = useAuthStore();
    let errorInd = useRef()
    let userCheck = useRef()

    const [used, setUsed] = useState(false)
    const [info, setInfo] = useState({
        "name" : "",
        "surname" : "",
        "username" : "",
        "mail" : "", 
        "password" : ""
    })

    const validateForm = function (){
        if(!info.name.trim()) return toast.error("Name is required")
        if(!info.surname.trim()) return toast.error("Surname is required")
        if(!info.username.trim()) return toast.error("Username is required")
        if(!info.mail.trim()) return toast.error("Mail is required")
        if(!/\S+@\S+\.\S+/.test(info.mail.trim())) return toast.error("Mail is required")
        if(!info.password.trim()) return toast.error("Password is required")
        if(info.password.trim().length < 6) return toast.error("Password is required")

       return true 

    }
    const handleSubmit = function (e){
        e.preventDefault()
        const success = validateForm()

        if (success === true) signup(info)
    }

    const checkUsername = (e) => {
        e.preventDefault()
        setInfo({...info, "password" : e.target.value})


        setUsed(!used)
        if(used){
            errorInd.current.innerText = "already used"
            userCheck.current.classList.toggle("bg-red-700")
        }
        else{
            errorInd.current.innerText = ""
            userCheck.current.classList.toggle("bg-red-700")
        }
        
    }   

    return (
        <div className="w-full h-full color-green-200 flex items-center justify-center bg-background">
            <div className='relative flex flex-row max-w-screen-lg w-4/5 h-3/4 bg-transparent  rounded-md  glass overflow-hidden text-secondary'>
                <div className='w-1/2'>
                    <form action="" className='w-full h-full px-10 pt-1' onSubmit={handleSubmit}>
                        <h1 className="title mt-4 font-bold">
                            Welcome  
                        </h1>
                        <p className="sub-title mb-9">Please enter your informations</p>
                        <p className='my-2'>Name</p>
                        <input type="text" name="name" id="name" value={info.name}  onChange={(e)=>{setInfo({...info, "name" : e.target.value})}} className='bg-primary rounded-3xl w-full h-12 outline-0 px-7'/>
                        <p className='my-2'>Surname</p>
                        <input type="text" name="surname" id="surname" value={info.surname}  onChange={(e)=>{setInfo({...info, "surname" : e.target.value})}} className='bg-primary rounded-3xl w-full h-12 outline-0 px-7' />
                        <p className='my-2'>Username</p> <span className='text-red-700 size-2' ref={errorInd}></span>
                        <input type="text" name="username" ref={userCheck} id="username" value={info.username}  onChange={checkUsername} className='bg-primary rounded-3xl w-full h-12 outline-0 px-7' />
                        <p className='my-2'>E-mail</p>
                        <input type="mail" name="mail" id="mail"  value={info.mail}  onChange={(e)=>{setInfo({...info, "mail" : e.target.value})}}  className='bg-primary rounded-3xl w-full h-12 outline-0 px-7 '/>
                        <p className='my-2'>Password</p>
                        <input type="password" name="password" id="password"  value={info.password}  onChange={(e)=>{setInfo({...info, "password" : e.target.value})}}  className='bg-primary rounded-3xl w-full h-12 outline-0 px-7 mb-9'/>
                        <button type="submit" onClick={handleSubmit}  className='rounded-3xl bg-background w-full h-12' >
                            { isSigningUp ? <span className="loading loading-spinner text-primary "></span> : "Sign In"}
                        </button>
                        <p className='my-2'>Already have an account? <Link to="/signin" className='text-primary'>Sign in</Link></p>
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



  
export default SignUpPage;
  