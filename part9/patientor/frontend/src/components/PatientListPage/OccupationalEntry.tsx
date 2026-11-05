import BaseEntry from "./Entry";
import { Typography } from "@mui/material";
import {Box} from "@mui/material";
import { MedicalInformation } from "@mui/icons-material";
import { OccupationalHealthcareEntry } from "../../types";


interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry
}

const OccupationalEntry = ({entry}: OccupationalEntryProps) => {
  return (
   <div>
      {entry && <BaseEntry>
        <Box>
          <Typography>
            {entry.date} <MedicalInformation/> {entry.employerName}
            <br />
            <i>{entry.description}</i> 
            <br />
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      </BaseEntry>}
   </div>
  );
};

export default OccupationalEntry;