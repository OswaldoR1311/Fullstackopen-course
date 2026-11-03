import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import type { Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface PatientDetailProps {
    patients: Patient[]
}

const PatientDetail = ({ patients }: PatientDetailProps): React.JSX.Element => {
    const { id } = useParams();

    const findedPatient = patients.find(p => p.id === id);

    console.log(findedPatient);

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
                    <Typography component={'p'}>
                        {entry.date} {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>
                                    {code}
                                </li>
                            ))}
                        </ul>
                    </Typography>
                ))}
            </Box>}
        </div>
    );
};

export default PatientDetail;