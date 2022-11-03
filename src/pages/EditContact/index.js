import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import Loader from '../../components/Loader'
import toast from '../../utils/toast'

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null)

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
   async function loadContact(){
    try {
      const contact = await ContactsService.getContactById(params.id);

      contactFormRef.current.setFieldsValues(contact);

      setIsLoading(false);
      setContactName(contact.name)
    } catch (error) {
      history.push('/');
      toast({
        type: 'danger',
        text: 'Contato não encontrado!'
      });
    } 
   }
   loadContact()
  }, [params.id, history]);
  async function handleSubmit(formData){
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      
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
  return (
    <>
      <Loader isLoading={isLoading}/>
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName }`} />
      <ContactForm buttonLabel="Salvar alterações" onSubmit={handleSubmit} ref={contactFormRef}/>
    </>

  );
}
