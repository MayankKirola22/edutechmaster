import "./Login.css"
import { useGoogleLogin } from '@react-oauth/google';

export default function Login({setUser}){
    const login = useGoogleLogin({
        onSuccess: (response) => {
            localStorage.setItem("User",JSON.stringify({token:response.access_token,time:Date.now()}))
            setUser({token:response.access_token,time:Date.now()})
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    return(
        <div id="Login">
            <div className="heading">EduTechMaster Login</div>
            <div className="button" onClick={login}>Sign in using Google </div>
        </div>
    )
}