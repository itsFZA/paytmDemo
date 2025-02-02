import {useSearchParams} from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
export const SendMoney = () =>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name')
    const [amount,setAmount] = useState(0);
    const [balance,setBalance] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const checkBalance = async () =>{
        let recipient = id;
        let res =  await axios.post(
            `http://localhost:3000/api/v1/account/recipientBalance`,
            {recipient},
        );
        let roundedValue =  Math.floor(res.data.balance * 100) / 100; 
        setBalance(roundedValue)
    }
    
    const transferHandler = async() =>{
        setIsLoading(true);
        const transferringTo = id;
        console.log(`data: ${transferringTo} ${amount}`);
        try {
            const moneyTransferred = await axios.post('http://localhost:3000/api/v1/account/transfer',
            {transferringTo, amount},
             {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('signUpToken')
                }
             }
            );
            alert('money transferred')
            setIsLoading(false)            
        } catch (error) {
            console.log(`error occurred ${error}`);
            
            
        }
        
    }
    return(
        <div class="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96
                bg-white shadow-lg rounded-lg">
                    <div class="flex flex-col space-y-1.5 p-4">
                        <h2 class="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center 
                            justify-center">
                                <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 class="text-2xl font-semibold">{name}</h3>
                            <div className='text-white text-sm font-medium p-2 bg-green-500 hover:bg-green-700 rounded-md border'>
                                <button onClick={checkBalance}>
                                    {balance === null ? `check ${name}'s balance` : 
                                    `${name}'s balance ${balance}`}
                                    </button>
                            </div>
                            
                        </div>
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <label class="text-sm font-medium leading-none 
                                peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70" for="amount">
                                    Amount (in Rs)
                                </label>
                                <input type="number"
                                    onChange={(e) => {setAmount(e.target.value)}}
                                    placeholder="Enter amount"
                                    id="amount"
                                    class="flex h-10 w-full rounded-md border border-input
                                        bg-background px-3 py-2 text-sm" 
                                />
                            </div>
                            <button 
                                onClick={transferHandler}
                                disabled={isLoading}
                                className="justify-center rounded-md text-sm font-medium 
                                       ring-offset-background transition-colors h-10 px-4 py-2 w-full 
                                       bg-green-500 text-white"
                            >
                                {isLoading ? "Transferring..." : "Initiate Transfer"}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}


// <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
//   </svg>
  