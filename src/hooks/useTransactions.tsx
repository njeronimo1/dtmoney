import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface TransationProps{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransationInput = Omit<TransationProps, 'id' | 'createdAt'>;

interface TransationProviderProps{
    children: ReactNode
}

interface TransationContextData {
    transactions: TransationProps[];
    createTransaction: (TransationProps:TransationInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransationContextData>(
    {} as TransationContextData);

export function TransactionsProvider({children}:TransationProviderProps){
    const [transactions, setTransactions] = useState<TransationProps[]>([]);

    useEffect(()=>{
        api.get('transactions')
        .then(response =>{setTransactions(response.data.transactions);});
    }, []);

    async function createTransaction(transactionInput: TransationInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });

        const { transaction } = response.data; 

        setTransactions([
            ...transactions, 
            transaction,
        ]);
    }
    
    
    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}