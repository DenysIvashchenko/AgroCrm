import { CropStatus } from "../enums/crops-status.enum";
import { Field } from "./field.type";


export type Crop = {
    id: number;
    cropType: string;
    season: string;
    plantingDate: string;
    expectedYield: number;
    actualYield: number | null;
    status: CropStatus;
    field: Field;
    yieldEfficiency: number | null;
    createdAt: string;
}