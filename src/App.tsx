import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/Header";
import Modal from 'react-modal';
import { useState } from "react";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./Components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(){
      setisNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal(){
      setisNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      
      <GlobalStyle />
    </TransactionsProvider>
  );
}


