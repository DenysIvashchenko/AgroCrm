export type SoilTypeChartResponse = {
    blackSoilCount: number;
    clayCount: number;
    sandyCount: number;
    loamCount: number;
    peatCount: number;
    siltCount: number;
}

export type EquipmentLoadDto = {
    id: number;
    name: string;
    type: string;
    loadPercent: number;
}

export type CropStatusChartResponse = {
    growingCount: number;
    harvestedCount: number;
    plantedCount: number;
    failedCount: number;
}

export type EquipmentStatusChartResponse = {
    availableCount: number;
    inUseCount: number;
    maintenanceCount: number;
    brokenCount: number;
    retiredCount: number;
}

export type DashboardChartsResponse = {
    soilTypeChart: SoilTypeChartResponse;
    cropStatusChart: CropStatusChartResponse;
    equipmentStatusChar: EquipmentStatusChartResponse;
    equipmentLoads: EquipmentLoadDto[];
}

export type NgxChartSeries = {
    name: string;
    value: number;
}