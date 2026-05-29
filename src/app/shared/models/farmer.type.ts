import { FarmerStatus } from "./farmer-status.enum";
import { Field } from "./field.type";

export type Farmer = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    region: string;
    status: FarmerStatus;
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