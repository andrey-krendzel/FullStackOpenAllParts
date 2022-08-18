
import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const style = { margin: 10 };


const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry;}> = ({ entry }) => (
    <div>
        <Card style={style}>
        <Card.Content>
            {entry.date} <Icon name="user doctor" />
        </Card.Content>
        <Card.Content description={entry.description} />
        <Card.Content>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
        </Card.Content>
        </Card>
    </div>
);

export default OccupationalHealthcare;

