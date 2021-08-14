/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubscribeToDatabaseCollection } from '../../common/hooks';
import { DB_EMPLOYEES, DB_COMPANIES, HIRE } from '../../common/constants';
import { updateEmploymentStatus } from '../../common/utils';

const QuickHire = () => {
  const { data: employees, loading } = useSubscribeToDatabaseCollection(DB_EMPLOYEES);
  const { data: companies } = useSubscribeToDatabaseCollection(DB_COMPANIES);

  const [availableForHire, setAvailableForHire] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('Select company');

  useEffect(() => {
    const personsUnemployed = employees?.filter((employee) => {
      return !employee?.hiredAt || employee?.hiredAt.length === 0;
    });
    setAvailableForHire(personsUnemployed);
  }, [employees]);

  return (
    <div>
      <Link to="/">← Start</Link>
      <h1>Quick Hire</h1>
      <h3>Here you get a quick view of all unemployments registered.</h3>
      <p>Got a job for anyone? Just select a company for a person and hit Hire!</p>
      <select
        value={selectedCompany}
        onChange={(e) => {
          setSelectedCompany(e.target.value);
        }}
      >
        <option disabled value="Select company">
          Select company
        </option>
        {companies?.map((company) => (
          <option value={company?.name}>{company?.name}</option>
        ))}
      </select>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {availableForHire?.length > 0 ? (
            availableForHire.map((person) => (
              <>
                <p>{person.name}</p>
                <button
                  type="button"
                  onClick={() => {
                    updateEmploymentStatus(HIRE, person.id, selectedCompany);
                  }}
                >
                  Hire at selected company
                </button>
              </>
            ))
          ) : (
            <p>Such empty. No prospects</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickHire;
