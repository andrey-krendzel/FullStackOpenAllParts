import React from "react";

import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';

const PatientDetailsPage = () => {
    const [{ patients }] = useStateValue();

    //{ id }: { id: string | undefined }

    const { id } = useParams<{ id: string }>();
    console.log( id );


    return(
        <div>
            
          {Object.values(patients).filter(p => p.id === id).map((patient: Patient) => (
            <div key={patient.id}>
            <h2>{patient.name}</h2>
            <br />
            ssn: {patient.ssn} <br />
            occupation: {patient.occupation}
            </div>
          ))}
        
        </div>
    );
};

export default PatientDetailsPage;