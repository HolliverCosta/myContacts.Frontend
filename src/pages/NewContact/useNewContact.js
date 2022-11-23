import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import { useRef } from 'react';

export default function useNewContact(){
    const contactFormRef = useRef(null);

  async function handleSubmit(contact){
    try {
      await ContactsService.createContact(contact); 

      contactFormRef.current.resetFields();
  
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!'
      }); 
    }
  }
  return { handleSubmit, contactFormRef } ;
}