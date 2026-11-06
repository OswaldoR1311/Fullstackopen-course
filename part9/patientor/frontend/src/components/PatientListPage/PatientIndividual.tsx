import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import EntryDetails from './EntryDetails';
import type { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Button from '@mui/material/Button';
import TransgenderIcon from '@mui/icons-material/Transgender';
import type { Gender } from '../../types';
import TextField from '@mui/material/TextField';

interface PatientDetailProps {
    patients: Patient[]
    diagnosis: Diagnosis[]
}

const PatientDetail = ({ patients, diagnosis }: PatientDetailProps): React.JSX.Element => {
    const { id } = useParams();

    const findedPatient = patients.find(p => p.id === id);

    const handleGender = (value: Gender | undefined) => {
        let gender: string | React.JSX.Element = '';

        switch (value) {
            case "male":
                gender = <MaleIcon />;
                break;
            case "female":
                gender = <FemaleIcon />;
                break;
            case "other":
                gender = <TransgenderIcon />;
                break;
            default:
                return <p>Gender does not exist</p>;
        }

        return gender;
    };

    const genderValue = handleGender(findedPatient?.gender);

    const greeting = () => console.log('Estamos saludando a ver si funciona');

    return (
        <div>
            <Box>
                {findedPatient && <Typography variant='h4' gutterBottom>
                    {findedPatient.name} {genderValue}
                    <Typography component={'p'}>
                        ssn: {findedPatient.ssn}
                    </Typography>
                    <Typography component={'p'}>
                        occupation: {findedPatient.occupation}
                    </Typography>
                    <Typography component={'p'}>
                        date of birth: {findedPatient.dateOfBirth}
                    </Typography>
                </Typography>}
                {findedPatient?.entries.length === 0 ? <Button onClick={greeting} variant='contained'>new entry</Button> : null}

                <Box component={'form'}>
                    <TextField required label='Required' defaultValue={'HelloWorld'} />
                </Box>
            </Box>

            {findedPatient?.entries.length === 0 ? null : <Box>
                <Typography variant='h5'>entries</Typography>
                {findedPatient?.entries.map(entry => (
                    <Typography component={'div'}>
                        <EntryDetails entry={entry} />
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