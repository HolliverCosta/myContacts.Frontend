import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import { useRef } from 'react';

export default function Home() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData){
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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
  return (
    <>
      <PageHeader title="Criar novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef}/>

    </>
  );
}
