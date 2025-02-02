import axios from "axios"
import { Button } from "./Button"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
export const Users = ({usernameToAvoid}) =>{
    const [users,setUsers] = useState([])
    const [filter, setFilter] = useState("");
    const [toggle,setToggle] = useState(0);

    useEffect(() =>{
        const fetchData = async() =>{
            const res =  await axios.get(`http://localhost:3000/api/v1/user/bulk?filterBy=${filter}`)
            console.log(res.data.users);
            console.log("user name to avoid : " + usernameToAvoid);
            const usersExceptMe = res.data.users.filter(user => user.username != usernameToAvoid )
            setUsers(usersExceptMe)
        }
        const debouncer = setTimeout(() => {
            fetchData()
        }, 500);
        return () => clearTimeout(debouncer)
    },[filter])

    return(
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input type="text" placeholder="Search users..." onChange={(e) => {setFilter(e.target.value); setToggle(1) }} 
                    className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </>

    )
}

function User({user}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>    
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstname} {user.lastname}
                    </div>
                </div>

            </div>
            <div className="flex flex-col justify-center h-full">
                    <Button onClick={ e =>
                        navigate(`/send?id=${user._id}&name=${user.firstname}`)
                    }label={"Send Money"} />
            </div>            
        </div>
    )
}