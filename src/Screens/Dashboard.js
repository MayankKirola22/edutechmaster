import { useEffect, useState } from 'react';
import './Dashboard.css'
import { googleLogout } from '@react-oauth/google';
import Loading from "../resources/loading.gif";
export default function Dashboard({user,setUser}){
    const [profile,setProfile]=useState(null)
    useEffect(()=>{
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.token}`,{
            headers:{
                'Authorization': `Bearer ${user.token}`,
                'Accept': 'application/json',
            },
            method:'GET',
            'Access-Control-Allow-Origin':'http://localhost:3000/'
        }).then(response=>{
            response.text().then(result=>setProfile(JSON.parse(result)))
        })}
    ,[user])
    let TimeLeft=900-(Math.fround(Date.now()-user.time)/1000)
    TimeLeft=isNaN(TimeLeft)?900:TimeLeft
    const logOut = () => {
        googleLogout();
        setUser(null);
        localStorage.clear();
    };
    if(TimeLeft<=0){
        logOut();
    }
    else{
        setTimeout(()=>logOut(),TimeLeft*1000)
    }
    return(
        <div id='Dashboard'>
        {profile===null?<img src={Loading} alt='loading'/> :
            <div>
                <div className='heading'>User Logged in</div>
                <img className='profile' src={profile.picture} alt="profile picture"/>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <p>Logging out in {Math.round(TimeLeft/60)} minute(s)</p>
                <div className='button' onClick={logOut}>Log out</div>
            </div>
            }
        </div>
    )
}