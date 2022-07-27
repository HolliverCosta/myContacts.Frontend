import { StyledSpinner } from './styles';
import PropTypes from 'prop-types';


export default function Spinner({size}){
    return <StyledSpinner size={size} />
}

Spinner.propTypes = {
    size: PropTypes.number
  };
  
  Spinner.defaultProps = {
    size: 32
  };