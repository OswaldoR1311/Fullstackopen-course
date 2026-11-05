import BaseEntry from "./Entry";
import type { HospitalEntry } from "../../types";


interface HospitalEntryProps {
  entry: HospitalEntry
}

const HospitalEntry = ({entry}: HospitalEntryProps) => {

  return (
    <>
      <BaseEntry>
        <h2>Some random Value</h2>
      </BaseEntry>
    </>
  );
};

export default HospitalEntry;