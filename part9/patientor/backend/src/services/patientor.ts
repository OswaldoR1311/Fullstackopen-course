import type { sensitivePatientInfo } from "../../types.ts";
import { patientsData } from "../../data/entries.ts";

const getPatientSensitiveData = (): sensitivePatientInfo[] => {
    return patientsData.map(({id, gender, name, dateOfBirth, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {getPatientSensitiveData};