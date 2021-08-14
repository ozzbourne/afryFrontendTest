/* eslint-disable no-console */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../../config/firebaseConfig';
import Form from '../../form/Form';
import { DB_COMPANIES } from '../../../common/constants';
import { useSubscribeToDatabaseCollection } from '../../../common/hooks';

const CompaniesPage = () => {
  const { loading, data: companies } = useSubscribeToDatabaseCollection(DB_COMPANIES);

  const [name, setName] = useState('');
  const [addErrormessage, setAddErrormessage] = useState('');

  const onFormUpdate = (e) => {
    setName(e.currentTarget.value);
  };

  const addCompany = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    }
    if (companies.find((company) => company.name === name)) {
      setAddErrormessage('Company already exists in the database');
      setTimeout(() => {
        setAddErrormessage('');
      }, 3000);
      return;
    }
    db.collection(DB_COMPANIES)
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

  return (
    <div>
      <Link to="/">← Start</Link>
      <h1>Here below you can add companies if they do not already exist</h1>
      <Form
        name={name}
        onChange={onFormUpdate}
        onClick={addCompany}
        message={addErrormessage}
        type="Company"
      />
      <h2>Companies: </h2>
      <h4>Click a company to handle employees</h4>
      {loading && <span>Loading....</span>}
      {companies?.map((company) => (
        <Link to={`/companies/${company.id}`} key={company.id}>
          <div key={company.id}>
            <span>{company?.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CompaniesPage;
