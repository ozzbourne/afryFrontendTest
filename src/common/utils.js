import db from '../config/firebaseConfig';
import { DB_EMPLOYEES, HIRE } from './constants';

export const updateEmploymentStatus = (status, documentId, company) => {
  const employeeRef = db.collection(DB_EMPLOYEES).doc(documentId);
  employeeRef
    .update({
      hiredAt: status === HIRE ? company : '',
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error updating document: ', error);
    });
};
