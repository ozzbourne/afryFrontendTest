/* eslint-disable no-console */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button as ButtonFromMaterialUI, Paper as PaperFromMaterialUI } from '@material-ui/core';
import styled from '@emotion/styled';
import db from '../../config/firebaseConfig';
import Form from '../form/Form';
import { DB_EMPLOYEES } from '../../common/constants';
import { useSubscribeToDatabaseCollection } from '../../common/hooks';
import breakpoints from '../../common/breakpoints';
import Alert from '../../common/Alert';

const EmployeesListWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media only screen and (min-width: ${breakpoints.small}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Employee = styled('div')`
  padding: 0 1rem 2rem;
`;

const HandleEmployeesPage = () => {
  const { loading, data: employees } = useSubscribeToDatabaseCollection(DB_EMPLOYEES);

  const [name, setName] = useState('');
  const [addErrormessage, setAddErrormessage] = useState('');
  const [removeErrorMessage, setRemoveErrorMessage] = useState('');

  const onFormUpdate = (e) => {
    setName(e.currentTarget.value);
  };

  const addEmployee = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    }
    if (employees.find((employee) => employee.name === name)) {
      setAddErrormessage('Employee already exists in the database');
      setTimeout(() => {
        setAddErrormessage('');
      }, 3000);
      return;
    }
    db.collection(DB_EMPLOYEES)
      .add({
        name,
      })
      .then(() => {
        setName('');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const removeEmployee = (documentId) => {
    const employee = db.collection(DB_EMPLOYEES).doc(documentId);
    employee
      .get()
      .then((doc) => {
        const employeeData = doc.data();

        if (employeeData.hiredAt?.length > 0) {
          console.log('ama');
          setRemoveErrorMessage({
            id: documentId,
            message: `Employee can not be removed because he/she is hired at ${employeeData.hiredAt}`,
          });
          setTimeout(() => {
            setRemoveErrorMessage('');
          }, 3000);
          return;
        }
        employee.delete();
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return (
    <div>
      <Link to="/">← Start</Link>
      <h1>Here below you can add employees (if they do not already exist)</h1>
      <Form
        name={name}
        onChange={onFormUpdate}
        onClick={addEmployee}
        message={addErrormessage}
        type="Employee"
      />
      <h2>Already added employees: </h2>
      {loading && <span>Loading....</span>}
      <EmployeesListWrapper>
        {employees?.map((employee) => (
          <PaperFromMaterialUI elevation={3} key={employee.id}>
            <Employee>
              <p>{employee.name}</p>
              <ButtonFromMaterialUI
                data-id={employee.id}
                type="button"
                onClick={() => removeEmployee(employee.id)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Remove
              </ButtonFromMaterialUI>
              {removeErrorMessage && removeErrorMessage.id === employee.id && (
                <Alert message={removeErrorMessage.message} />
              )}
            </Employee>
          </PaperFromMaterialUI>
        ))}
      </EmployeesListWrapper>
    </div>
  );
};

export default HandleEmployeesPage;
