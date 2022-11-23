import { Container } from "./styles";
import PropTypes from 'prop-types';

export default function InputSearch({value, onChange}){
    return (
        <Container>
        <input 
        value={value} 
        type="text" 
        placeholder="Pesquisar Contatos" 
        onChange={onChange} />
      </Container>
      );
}
InputSearch.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}