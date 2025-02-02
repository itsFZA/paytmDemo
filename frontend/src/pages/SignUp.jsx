import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { WarningComp } from "../components/Warning";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function SignUp(){
    const [username,setUsername] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    async function submitHandler(){
        setIsLoading(true);
        const response = await axios.post(`http://localhost:3000/api/v1/user/signup`,
         {username, firstname, lastname, password})
        localStorage.setItem("signUpToken",response.data.token)
        setTimeout(() => navigate(`/dashboard`,{ state: username }),1000);
    }

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First name"} placeholder={"John"}
                        onChange={(e) =>{setFirstname(e.target.value);}}/>
                    <InputBox label={"Last name"} placeholder={"Doe"}
                        onChange={(e) =>{(setLastname(e.target.value))}}/>
                    <InputBox label={"Username"} placeholder={"john@mycompany.com"} 
                        onChange={(e) =>{(setUsername(e.target.value))}}/>
                    <InputBox label={"Password"} placeholder={"john123"} 
                        onChange={(e) =>{(setPassword(e.target.value))}}/>
                    <Button onClick={submitHandler} label={"Sign Up"}/>
                    {isLoading? "Loading ...":""}
                    <WarningComp label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
        </div>
      </div>
    )
}







