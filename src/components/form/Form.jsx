import PropTypes from 'prop-types';
import {
  TextField as TextFieldFromMaterialUI,
  Button as ButtonFromMaterialUI,
} from '@material-ui/core';
import styled from '@emotion/styled';
import Alert from '../../common/Alert';

const StyledForm = styled('Form')`
  margin-top: 3rem;
  display: flex;
`;

const ButtonWrapper = styled('div')`
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const TextInput = styled(TextFieldFromMaterialUI)`
  min-width: 300px !important;
`;

const Form = ({ name, onChange, onClick, message, type }) => {
  return (
    <>
      <StyledForm>
        <TextInput
          label={`Name of ${type}`}
          variant="outlined"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <ButtonWrapper>
          <ButtonFromMaterialUI
            variant="contained"
            size="large"
            color="primary"
            onClick={(e) => onClick(e)}
          >
            Add
          </ButtonFromMaterialUI>
        </ButtonWrapper>
        {message && <Alert message={message} />}
      </StyledForm>
    </>
  );
};

Form.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Form;
