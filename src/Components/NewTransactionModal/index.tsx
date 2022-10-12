import Modal from 'react-modal';
import closeImg from '../../assets/vector.svg';
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';
import { Container, TransactionTypeContainer, TypeButton } from './styles';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose:() => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposito');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposito');
        onRequestClose();
    }

    return(
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close">
                <img src={closeImg} alt="Close" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input type="text" 
                placeholder="Titulo" 
                value={title}
                onChange={event => setTitle(event.target.value)}
                />

                <input type="number" 
                placeholder="Valor" 
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <TypeButton 
                    type="button" 
                    onClick={() => setType("deposito")}
                    onAction={type === 'deposito'}
                    activeColor="green"
                    >
                        <img src={entradasImg} alt="Entrada" />
                        <span>Entrada</span>
                    </TypeButton>
                {/* <button
                    type="button"
                >
                    
                </button> */}
                    <TypeButton 
                    type="button" 
                    onClick={() => setType("saida")}
                    onAction={type === 'saida'}
                    activeColor="red"
                    >
                        <img src={saidasImg} alt="Saída" />
                        <span>Saída</span>
                    </TypeButton>

                </TransactionTypeContainer>

                <input type="text" 
                placeholder="Categoria" 
                value={category}
                onChange={event => setCategory(event.target.value)}/>
                
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}