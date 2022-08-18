import React from "react";

import { Patient, Entry } from "../types";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';

import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailsPage = () => {
    const [{ patients }] = useStateValue();
   // const [{ diagnoses }] = useStateValue();

    //{ id }: { id: string | undefined }

    const { id } = useParams<{ id: string }>();

    const patient = Object.values(patients).find(
      (patient: Patient) => patient.id === id
    );

    console.log("id ", id);
    console.log("patient ", patient);

    if (patient === undefined){
      return(<div>Patient is undefined</div>);
    } else{

    return(
      <div>
        <h2>
          {patient.name}
        </h2>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry, i) => (
          <div key={i}>
            {/* {Object.keys(diagnoses).length === 0 ? null : (
              <EntryDetails entry={entry} />
            )} */}
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
    );
            }

};

export default PatientDetailsPage;