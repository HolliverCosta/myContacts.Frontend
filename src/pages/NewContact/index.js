import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function Home() {
  return (
    <>
      <PageHeader title="Criar novo contato" />
      <ContactForm buttonLabel="Cadastrar" />

    </>
  );
}
