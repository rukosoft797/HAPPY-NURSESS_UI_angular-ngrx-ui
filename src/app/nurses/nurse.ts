export interface Nurse {
    nurseId: number | null;
    firstName: string;
    lastName: string;
    dob: string;
    numberOfPatients: number;
    createdBy: string;
    createdAt: Date,
    updatedBy: string;
    updatedAt: Date;
}