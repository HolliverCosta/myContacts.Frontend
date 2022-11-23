
import { useEffect, useState, useMemo, useCallback } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast'



export default function useHome(){
    const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete,setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()))), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);

      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  },[orderBy])

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleTryAgain(){
    loadContacts();
  }
  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }
  function handleDeleteContact(contact){
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true);
  }
  function handleCloseDeleteModal(){
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }
  async function handleConfirmDeleteContact(){
   try {
    setIsLoadingDelete(true);
     await ContactsService.deleteContact(contactBeingDeleted.id);
     toast({
      type: 'success',
      text: 'Contato deletado com sucesso!'
     });
     setContacts(prevState => prevState.filter(
       (contact) => contact.id !== contactBeingDeleted.id,
       ))
       handleCloseDeleteModal();
      } catch {
    toast({
      type: 'danger',
      text: 'Ocorreu um erro ao deletar um contato!'
     })
   } finally{
    setIsLoadingDelete(false);
   }

  }
  return { 
    isLoading,
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
  }
}