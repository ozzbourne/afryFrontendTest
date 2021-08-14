/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../../config/firebaseConfig';
import { DB_COMPANIES, DB_EMPLOYEES, HIRE, FIRE } from '../../../common/constants';
import { useSubscribeToDatabaseCollection } from '../../../common/hooks';
import { updateEmploymentStatus } from '../../../common/utils';

const HandleCompanyPage = (props) => {
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const { id: documentId } = props.match.params;
  const { data: employees, loading } = useSubscribeToDatabaseCollection(DB_EMPLOYEES);

  const [company, setCompany] = useState('');
  const [employeesAtThisCompany, setEmployeesAtThisCompany] = useState('');
  const [availableForHire, setAvailableForHire] = useState('');

  useEffect(() => {
    const companyFromDataBase = db.collection(DB_COMPANIES).doc(documentId);
    companyFromDataBase
      .get()
      .then((doc) => {
        const companyData = doc.data();
        setCompany(companyData);

        const personsHiredHere = employees?.filter((employee) => {
          return employee?.hiredAt?.includes(companyData.name);
        });
        setEmployeesAtThisCompany(personsHiredHere);

        const personsUnemployed = employees?.filter((employee) => {
          return !employee?.hiredAt || employee?.hiredAt.length === 0;
        });
        setAvailableForHire(personsUnemployed);
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [employees, documentId]);

  return (
    <div>
      <Link to="/companies">← Back</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{company?.name}</p>
          <p>Below is a list of all current employees for this current company:</p>
          {employeesAtThisCompany?.length > 0 ? (
            employeesAtThisCompany.map((employee) => (
              <div key={employee.id}>
                <span>{employee.name}</span>
                <button type="button" onClick={() => updateEmploymentStatus(FIRE, employee.id)}>
                  Did not perform on deadline? Fire them!
                </button>
              </div>
            ))
          ) : (
            <p>Very empty. No employees. </p>
          )}
          <p>
            Below is a list of persons who has not yet been employed. Hurry up! Hire them
            immediately.
          </p>
          {availableForHire?.length > 0 ? (
            availableForHire.map((employee) => (
              <div key={employee.id}>
                <span>{employee.name}</span>
                <button
                  type="button"
                  onClick={() => updateEmploymentStatus(HIRE, employee.id, company.name)}
                >
                  Hire!
                </button>
              </div>
            ))
          ) : (
            <p>Such empty. No prospects</p>
          )}
        </>
      )}
    </div>
  );
};

export default HandleCompanyPage;
