import { useEffect } from 'react'
import {AppBar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import { Users } from '../components/Users'
import { useLocation } from 'react-router-dom';

export function Dashboard(){
    const location = useLocation();
    const username = location.state || '';
    console.log(`profile icon : ${username}`);
    return(
        <div>
            <AppBar profileIcon={username[0].toUpperCase()}/>
            <div className='m-8'>
                <Balance value={10000} />
                <Users usernameToAvoid={username}/>
            </div>

        </div>

    )
}