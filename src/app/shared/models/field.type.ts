import { Crop } from "./crop.type";
import { Farmer } from "./farmer.type";
import { SoilType } from "./soil-type.enum";

export interface Field {
    id: number;
    name: string;
    areaHa: number;
    soilType: SoilType;
    latitude: number;
    longitude: number;
    boundaryCoordinates: number[][];
    farmer: Farmer;
    crops: Crop[];
    createdAt: string;
}