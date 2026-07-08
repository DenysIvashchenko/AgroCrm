import { Injectable, Type } from '@angular/core';
import { CropStatusChartResponse, DashboardChartsResponse, EquipmentStatusChartResponse, NgxChartSeries, SoilTypeChartResponse } from '../models/dashboard-chart.type';
import { Chart } from './chart/chart';
import { SoilType } from '../../../shared/models/enums/soil-type.enum';
import { CropStatus } from '../../../shared/models/enums/crops-status.enum';
import { Card } from './card/card';
import { DashboardResponse } from '../models/dashboard.type';
import { EquipmentStatus } from '../../../shared/models/enums/equipment.enum';
import { CROP_STATUS_COLORS, EQUIPMENT_STATUS_COLORS, SOIL_TYPE_COLORS } from './constants/color.constant';

export interface WidgetRenderInstruction<T> {
  componentClass: Type<any>;
  payload: T;
}

export interface ChartRenderInstruction {
  type: string;
  title: string;
  color: string[];
  chartData: NgxChartSeries[];
}

export interface CardRenderInstruction {
  icon: string;
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class WidgetFactoryService {

  public createWidgetInstructions(response: DashboardResponse): WidgetRenderInstruction<CardRenderInstruction>[] {
    return [
      {
        componentClass: Card,
        payload: {
          icon: 'agriculture',
          name: 'Total Number of Equipment',
          value: `${response.totalEquipment.toString()} units`,
        }
      },
      {
        componentClass: Card,
        payload: {
          icon: 'agriculture',
          name: 'Active / Maintenance Equipment',
          value: `${response.activeEquipmentCount.toString()} / ${response.maintenanceEquipmentCount.toString()}`,
        }
      },
      {
        componentClass: Card,
        payload: {
          icon: 'bar_chart',
          name: 'Total Fields Land Area',
          value: `${response.totalLandAreaHa.toString()} ha`,
        }
      },
      {
        componentClass: Card,
        payload: {
          icon: 'map',
          name: 'Total Fields',
          value: response.totalFields.toString(),
        }
      },
      {
        componentClass: Card,
        payload: {
          icon: 'groups',
          name: 'Total Number of Farmers',
          value: response.totalFarmers.toString(),
        }
      },
      {
        componentClass: Card,
        payload: {
          icon: 'eco',
          name: 'Total Number of Crops',
          value: response.totalCrops.toString(),
        }
      },
    ]
  }

  public mapResponseToWidgets(response: DashboardChartsResponse): WidgetRenderInstruction<ChartRenderInstruction>[] {
    return [
      {
        componentClass: Chart,
        payload: {
          type: 'bar-chart',
          title: 'Equipment Status Overview',
          color: EQUIPMENT_STATUS_COLORS,
          chartData: this.mapEquipmentData(response.equipmentStatusChar)
        }
      },
      {
        componentClass: Chart,
        payload: {
          type: 'pie-chart',
          title: 'Soil Type Distribution',
          color: SOIL_TYPE_COLORS,
          chartData: this.mapSoilData(response.soilTypeChart)
        }
      },
      {
        componentClass: Chart,
        payload: {
          type: 'pie-chart',
          title: 'Status of Crops',
          color: CROP_STATUS_COLORS,
          chartData: this.mapCropData(response.cropStatusChart)
        }
      },
    ];
  }

  private mapSoilData(soil: SoilTypeChartResponse): NgxChartSeries[] {
    return [
      { name: SoilType.BLACK_SOIL, value: soil.blackSoilCount },
      { name: SoilType.CLAY, value: soil.clayCount },
      { name: SoilType.SANDY, value: soil.sandyCount },
      { name: SoilType.LOAM, value: soil.loamCount },
      { name: SoilType.PEAT, value: soil.peatCount },
      { name: SoilType.SILT, value: soil.siltCount }
    ].filter(item => item.value > 0);
  }

  private mapCropData(crop: CropStatusChartResponse): NgxChartSeries[] {
    return [
      { name: CropStatus.GROWING, value: crop.growingCount },
      { name: CropStatus.HARVESTED, value: crop.harvestedCount },
      { name: CropStatus.PLANTED, value: crop.plantedCount },
      { name: CropStatus.FAILED, value: crop.failedCount },
    ].filter(item => item.value > 0);
  }

  private mapEquipmentData(equipment: EquipmentStatusChartResponse): NgxChartSeries[] {
    return [
      { name: EquipmentStatus.AVAILABLE.toLocaleLowerCase(), value: equipment.availableCount },
      { name: EquipmentStatus.IN_USE.toLocaleLowerCase(), value: equipment.inUseCount },
      { name: EquipmentStatus.MAINTENANCE.toLocaleLowerCase(), value: equipment.maintenanceCount },
      { name: EquipmentStatus.BROKEN.toLocaleLowerCase(), value: equipment.brokenCount },
      { name: EquipmentStatus.RETIRED.toLocaleLowerCase(), value: equipment.retiredCount },
    ].filter(item => item.value > 0);
  }
}
