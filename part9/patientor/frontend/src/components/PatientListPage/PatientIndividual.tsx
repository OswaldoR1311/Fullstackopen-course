import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import EntryDetails from './EntryDetails';
import type { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Transgender } from '@mui/icons-material';
import Button from '@mui/material/Button';
import type { Gender } from '../../types';
import {TextField} from '@mui/material';

interface PatientDetailProps {
    patients: Patient[]
    diagnosis: Diagnosis[]
}

const PatientDetail = ({ patients, diagnosis }: PatientDetailProps): React.JSX.Element => {
    const { id } = useParams();

    const findedPatient = patients.find(p => p.id === id);

    const handleGender = (value: Gender | undefined) => {
      let holder: string | React.JSX.Element = '';

      switch(value) {
        case "male":
          holder = <MaleIcon />;
          break;
        case "female":
          holder = <FemaleIcon/>;
          break;
        case "other":
          holder = <Transgender />;
          break;
        default:
          return '';
      }

      return holder;
    };

    const genderValue = handleGender(findedPatient?.gender);

    const greeting = () => console.log('This is a greeting');

    return (
        <div>
            <Box>
                {findedPatient && <Typography variant='h5' gutterBottom>
                    {findedPatient.name} {genderValue}
                    <Typography component={'p'}>
                        ssn: {findedPatient.ssn}
                    </Typography>
                    <Typography component={'p'}>
                        occupation: {findedPatient.occupation}
                    </Typography>
                <Typography component={'p'}>Date of birth: {findedPatient?.dateOfBirth}</Typography>
                </Typography>}
            </Box>

            {findedPatient?.entries.length === 0 ? null : <Box>
                <Typography variant='h6'>entries</Typography>
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
            </Box>}
            <Box component={'div'} sx={{marginBottom: '16px'}}>
              <Button onClick={greeting} variant='contained'>
              New entry
            </Button>
            </Box>
  
            <Box component={'form'} sx={{padding: '16px', borderWidth: '2px', borderStyle: 'dotted'}}>
                <Typography variant='h6' gutterBottom>New HealthCheck Entry</Typography>
                <Box component={'div'} sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <TextField required label='Date'/>
                  <TextField required label='Description'/>
                  <TextField required label='Specialist'/>
                  <TextField required label='Health Check Rating (0-3)'/>
                  <TextField required label='Diagnosis Codes (comma-separated)'/>
                </Box>
               <Box component={'div'} sx={{display: 'flex', gap: '8px', marginTop: '12px'}}>
                <Button variant='contained'>Add</Button>
                <Button variant='outlined'>Cancel</Button>
               </Box>
            </Box>
        </div>
    );
};

export default PatientDetail;