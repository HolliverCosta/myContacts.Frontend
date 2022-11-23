import { Container } from "./styles";
import Button from '../../../../components/Button';
import sad from '../../../../assets/images/sad.svg'
import PropTypes from 'prop-types';

export default function ErroStatus({ onTryAgain }) {
    return(
        <Container>
          <img src={sad} alt='Sad'/>
          <div className='details'>
            <strong> 
              Ocorreu um erro ao obter os seus contatos!
            </strong>
            <Button type='button' onClick={onTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </Container>
    );
}

ErroStatus.propTypes = {
    onTryAgain: PropTypes.func.isRequired,
}