import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () =>{
    const [sendersBalance, setSendersBalance] = useState(0)

    useEffect(()=>{
        async function loadBalance(){
            let res =  await axios.get(
                `http://localhost:3000/api/v1/account/balance`,
                {
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem('signUpToken')
                    }
                 }
            );
            // console.log("res " + res);
            // console.log(res);
            let roundedValue =  Math.floor(res.data.balance * 100) / 100; 
            setSendersBalance(roundedValue);
        }
        loadBalance()
    },[])

    
    return(
        <div className="flex">
            <div className="font-bold text-lg">Your balance </div>
            <div className="font-semi-bold ml-4 text-lg"> Rs {sendersBalance}</div>
        </div>
    )
} 