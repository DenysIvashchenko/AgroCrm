import { SoilType } from "../models/enums/soil-type.enum";

export const SOIL_TYPES: { value: SoilType; label: string }[] = [
    { value: SoilType.BLACK_SOIL, label: 'Black Soil' },
    { value: SoilType.CLAY, label: 'Clay' },
    { value: SoilType.SANDY, label: 'Sandy' },
    { value: SoilType.LOAM, label: 'Loam' },
    { value: SoilType.PEAT, label: 'Peat' },
    { value: SoilType.SILT, label: 'Silt' },
];