import { FarmerStatus } from "../enums/farmer-status.enum";
import { Field } from "./field.type";

export type Farmer = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    region: string;
    status: FarmerStatus;
    statusColor: string;
    totalLandHa: number;
    createdAt: Date | string;
    color: string;
    manager: {
        id: number;
        name: string;
        fullName: string
    };
    fields: Field[];
}

export type CreateFarmerDto = {
    fullName: string;
    email: string;
    phone: string;
    region: string;
    Field?: Partial<Field>[];
};