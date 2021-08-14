import { Alert as AlertFromMaterialUI } from '@material-ui/lab';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const AlertWrapper = styled('div')`
  margin-top: 2rem;
`;

const Alert = ({ message }) => {
  return (
    <AlertWrapper>
      <AlertFromMaterialUI severity="error">
        <p>{message}</p>
      </AlertFromMaterialUI>
    </AlertWrapper>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
