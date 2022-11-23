import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import useNewContact from './useNewContact';

export default function NewContact() {
  const { handleSubmit, contactFormRef } = useNewContact();
  return (
    <>
      <PageHeader title="Criar novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef}/>

    </>
  );
}
