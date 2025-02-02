import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { WarningComp } from "../components/Warning"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../components/Loading"

export function SignIn(){
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [incorrectCreds, setIncorrectCreds] = useState(false)
    async function signInHandler(){

        try {
            setIsLoading(true);
            console.log(`username: ${username} password ${password}`);
            const res = await axios.post('http://localhost:3000/api/v1/user/signin', 
            {username, password})
            localStorage.setItem("signUpToken", res.data.token)
            
            // setTimeout(() => navigate(`/dashboard`,{ state: username[0].toUpperCase() }),2000);
            navigate(`/dashboard`,{ state: username })
        } catch (error) {
            console.log("error occured " + error);
            if(error.response.status === 411){
                setIncorrectCreds(true)
                setIsLoading(false)
            }
        }

    }
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        onChange={(e) =>{setUsername(e.target.value)}}
                        label={"Email"} placeholder={"john@mycompany.com"}/>
                    <InputBox
                        onChange={(e) =>{setPassword(e.target.value)}} 
                        label={"Password"} />
                    {incorrectCreds ? "Incorrect username or password" : ""}
                    {isLoading ? <LoadingButton /> : <Button label={"Sign In"} 
                        onClick={signInHandler}
                    />}
                    <WarningComp label={"Don't have an account?"} buttonText={"SignUp"} to={"/signup"}/>
                </div>
            </div>
        </div>
        
    )
}

