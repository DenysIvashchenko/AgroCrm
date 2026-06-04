import { FarmerStatus } from "../models/enums/farmer-status.enum";

export const FARMER_STATUSES = {
    [FarmerStatus.ACTIVE]: 'var(--color-primary-mid)',
    [FarmerStatus.INACTIVE]: 'var(--color-warning)',
    [FarmerStatus.NEGOTIATION]: 'var(--color-warning-pale)',
    [FarmerStatus.NEW]: 'var(--color-info)'
}