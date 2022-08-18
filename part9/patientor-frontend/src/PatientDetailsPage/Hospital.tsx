import React from 'react';
import { Card } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const style = { margin: 10 };

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <div>
        <Card style={style}>
            <Card.Content>
                {entry.date} 
            </Card.Content>
            <Card.Content description={entry.description} />
            <Card.Content>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
        </Card.Content>
        </Card>
    </div>
    );

export default Hospital;