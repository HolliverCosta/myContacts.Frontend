import { Container } from './styles';

import Loader from '../../components/Loader';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import Modal from '../../components/Modal';

import ErroStatus from './components/ErroStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

export default function Home() {
  const { isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    searchTerm,
    hasError,
    filteredContacts,
    handleToggleOrderBy,
    handleDeleteContact,
    handleTryAgain,
    contacts,
    handleChangeSearchTerm,
    orderBy
  } = useHome();
  
  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
      <InputSearch 
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      )}
      <Header 
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {hasError && (<ErroStatus onTryAgain={handleTryAgain}/> )}
     {!hasError && (
      <>
      {(contacts.length < 1 && !isLoading) && (<EmptyList />)}
      {(contacts.length > 0 && filteredContacts.length < 1) && (
        <SearchNotFound searchTerm={searchTerm}/>
      )}
      <ContactsList 
        filteredContacts={filteredContacts}
        orderBy={orderBy}
        onToggleOrderBy={handleToggleOrderBy}
        onDeleteContact={handleDeleteContact}
      />
      <Modal
            visible={isDeleteModalVisible}
            danger 
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel='Deletar'
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            isLoading={isLoadingDelete}
            >
              <p>Esta ação não poderá ser desfeita!</p>
            </Modal>
      </>
     )}
    </Container>
  );
}
