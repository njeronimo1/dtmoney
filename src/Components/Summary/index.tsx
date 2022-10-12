import { Container } from "./styles";
import entradaImg from '../../assets/entradas.svg';
import saidaImg from '../../assets/saidas.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
    const { transactions } = useTransactions();

    console.log(transactions);
    
    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposito'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }else{
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, { 
        deposits: 0,
        withdraws: 0,
        total:0
    });

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={entradaImg} alt="" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(summary.deposits)}
                                    </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={saidaImg} alt="" />
                </header>
                <strong>-  {new Intl.NumberFormat('pt-BR', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(summary.withdraws)}
                                    </strong>
            </div>
            <div className="destaque_background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(summary.total)}</strong>
            </div>
        </Container>
    )
}