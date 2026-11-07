import { Typography, TextField, Button } from "@mui/material";
import { Box } from '@mui/material';
import { useState } from 'react';
import type { HealthCheckRating, Diagnosis } from "../../types";



const EntryForm = () => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [hcr, setHcr] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>();
  return (
    <div>
      <Box component={'form'} sx={{ padding: '16px', borderWidth: '2px', borderStyle: 'dotted' }}>
        <Typography variant='h6' gutterBottom>New HealthCheck Entry</Typography>
        <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField required label='Date' />
          <TextField required label='Description' />
          <TextField required label='Specialist' />
          <TextField required label='Health Check Rating (0-3)' />
          <TextField required label='Diagnosis Codes (comma-separated)' />
        </Box>
        <Box component={'div'} sx={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <Button variant='contained'>Add</Button>
          <Button variant='outlined'>Cancel</Button>
        </Box>
      </Box>
    </div>
  );
};

export default EntryForm;