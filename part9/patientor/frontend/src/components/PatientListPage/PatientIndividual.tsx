import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import EntryDetails from './EntryDetails';
import type { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Button from '@mui/material/Button';

interface PatientDetailProps {
    patients: Patient[]
    diagnosis: Diagnosis[]
}

const PatientDetail = ({ patients, diagnosis }: PatientDetailProps): React.JSX.Element => {
    const { id } = useParams();

    const findedPatient = patients.find(p => p.id === id);

    return (
        <div>
            <Box>
                {findedPatient && <Typography variant='h4' gutterBottom>
                    {findedPatient.name} {findedPatient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
                    <Typography component={'p'}>
                        ssn: {findedPatient.ssn}
                    </Typography>
                    <Typography component={'p'}>
                        occupation: {findedPatient.occupation}
                    </Typography>
                </Typography>}
            </Box>

            {findedPatient?.entries.length === 0 ? null : <Box>
                <Typography variant='h5'>entries</Typography>
                {findedPatient?.entries.map(entry => (
                    <Typography component={'div'}>
                        <EntryDetails entry={entry}/>
                        <ul>
                            {entry.diagnosisCodes?.map((code, index) => {
                              const findedDiagnosis = diagnosis.find(d => d.code === code);
                              return (
                                <li key={index}>
                                  {code} {findedDiagnosis?.name}
                                </li>
                              );
                            })}
                        </ul>
                    </Typography>
                ))}
            <Button variant='contained'>
              New entry
            </Button>
            </Box>}
        </div>
    );
};

export default PatientDetail;