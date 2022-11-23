import { Container } from "./styles";
import magnifier from '../../../../assets/images/magnifier-question.svg';
import PropTypes from 'prop-types';

export default function SearchNotFound({searchTerm}){
    return(
        <Container>
            <img src={magnifier} alt= "magnifier" />

            <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</span>
        </Container>
        );
}
SearchNotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
}