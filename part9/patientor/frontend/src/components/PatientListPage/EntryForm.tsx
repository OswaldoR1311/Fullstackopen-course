import { Typography, TextField, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { Box } from '@mui/material';
import { useState } from 'react';
import type { HealthCheckRating, Diagnosis } from "../../types";

const ratingOptions = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
  { value: 3, label: 'Critical Risk' },
];



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
          <TextField required label='Date' value={date} onChange={({ target }) => setDate(target.value)} />
          <TextField required label='Description' value={description} onChange={({ target }) => setDescription(target.value)} />
          <TextField required label='Specialist' value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
          {/* <TextField required label='Health Check Rating (0-3)' value={hcr} /> */}
          <InputLabel id='hcr'>Health Check Rating</InputLabel>
          <Select label='Health' id='hcr' value={hcr} onChange={({ target }) => setHcr(target.value)}>
            {ratingOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField required label='Diagnosis Codes (comma-separated)' value={diagnosisCodes} />
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