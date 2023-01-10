import { Container } from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? "flex-end"
    : qtyOfContacts > 0
    ? "space-between"
    : "center";
  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyOfContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? " contato" : " contatos"}
        </strong>
      )}
      <Link to="/new"> Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  contacts: PropTypes.number.isRequired,
  filteredContacts: PropTypes.number.isRequired,
};
