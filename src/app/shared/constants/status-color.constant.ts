import { CropStatus } from "../models/enums/crops-status.enum";
import { EquipmentStatus } from "../models/enums/equipment.enum";
import { SoilType } from "../models/enums/soil-type.enum";

export const CROP_STATUS_COLORS: Record<CropStatus, string> = {
    [CropStatus.PLANTED]: '#A0AEC0',
    [CropStatus.GROWING]: '#4299E1',
    [CropStatus.HARVESTED]: '#48BB78',
    [CropStatus.FAILED]: '#F56565'
};

export const EQUIPMENT_STATUS_COLORS: Record<EquipmentStatus, string> = {
    [EquipmentStatus.AVAILABLE]: '#38A169',
    [EquipmentStatus.IN_USE]: '#3182CE',
    [EquipmentStatus.MAINTENANCE]: '#ED8936',
    [EquipmentStatus.BROKEN]: '#E53E3E',
    [EquipmentStatus.RETIRED]: '#718096'
};

export const SOIL_TYPE_COLORS: Record<SoilType, string> = {
    [SoilType.BLACK_SOIL]: '#1A202C',
    [SoilType.CLAY]: '#C05621',
    [SoilType.SANDY]: '#ECC94B',
    [SoilType.LOAM]: '#744210',
    [SoilType.PEAT]: '#4A5568',
    [SoilType.SILT]: '#718096'
};