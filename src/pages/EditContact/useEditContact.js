import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import toast from '../../utils/toast'

import ContactsService from '../../services/ContactsService';

export default function useEditContact(){
    const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null)

  const params = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
   async function loadContact(){
    try {
      const contact = await ContactsService.getContactById(params.id);
      safeAsyncAction(() => {
        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      });
    } catch{
      safeAsyncAction(() => {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!'
        });
      });
    } 
   }
   loadContact()
  }, [params.id, history, safeAsyncAction]);
  async function handleSubmit(contact){
    try {
      
      const contactUpdated = await ContactsService.updateContact(params.id, contact);
      
      setContactName(contactUpdated.name)
      
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!'
      });
      
    }
  }
  return { 
    isLoading, 
    contactName, 
    contactFormRef, 
    handleSubmit 
  }
}