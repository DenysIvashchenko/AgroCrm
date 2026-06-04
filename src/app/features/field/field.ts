import { AfterViewInit, Component, effect, inject, OnInit, signal } from '@angular/core';
import * as L from 'leaflet';
import { FieldService } from './field-service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-field',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field implements OnInit, AfterViewInit {

  private service = inject(FieldService);

  private map!: L.Map

  private clickedPoints: L.LatLng[] = [];
  private currentPolygon: L.Polygon | null = null;
  private clickMarkers: L.CircleMarker[] = [];

  private polygons = signal([]);
  private isMapInitialized = signal(false);

  constructor() {
    effect(() => {
      const fields = this.polygons();
      const mapReady = this.isMapInitialized();

      if (mapReady && fields.length > 0) {
        this.drawBackendPolygons(fields);
      }
    });
  }

  ngOnInit(): void {
    this.getFields();
  }

  ngAfterViewInit() {
    this.initMap();
    this.isMapInitialized.set(true);
  }


  private initMap(): void {
    this.map = L.map('map').setView([50.45, 30.52], 13);

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    });

    const satelliteLayer =
      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      });

    satelliteLayer.addTo(this.map);

    const baseMaps = {
      "(OSM)": streetLayer,
      "Google)": satelliteLayer
    };

    L.control.layers(baseMaps).addTo(this.map);

    // L.marker([50.45, 30.52])
    //   .addTo(this.map)
    //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    //   .openPopup();

    const defaultIcon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    L.Marker.prototype.options.icon = defaultIcon;

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.handleMapClick(e.latlng);
    });
  }

  private handleMapClick(latlng: L.LatLng): void {
    if (this.clickedPoints.length === 4) {
      this.resetPolygon();
    }

    this.clickedPoints.push(latlng);

    const marker = L.circleMarker(latlng, {
      radius: 6,
      color: '#ff0000',
      fillColor: '#ff0000',
      fillOpacity: 1
    }).addTo(this.map);

    this.clickMarkers.push(marker);

    if (this.clickedPoints.length === 4) {
      this.drawPolygon();

      const latLng = this.clickedPoints.map(p => [p.toString().replace('LatLng(', '').replace(')', '')])
      console.log('Polygon coordinates:', JSON.stringify(latLng));
    }
  }

  private drawPolygon(): void {
    this.currentPolygon = L.polygon(this.clickedPoints, {
      color: 'blue',
      fillColor: '#00f',
      fillOpacity: 0.3
    }).addTo(this.map);

    this.map.fitBounds(this.currentPolygon.getBounds());
  }

  private resetPolygon(): void {
    this.clickedPoints = [];

    this.clickMarkers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.clickMarkers = [];

    if (this.currentPolygon) {
      this.map.removeLayer(this.currentPolygon);
      this.currentPolygon = null;
    }
  }

  private getFields(): void {
    this.service.getFields().subscribe(fields => {
      this.polygons.set(fields.map((f) => ({ color: f.colorField, polygon: JSON.parse(f.boundaryCoordinates) })) as []);
    });
  }

  private drawBackendPolygons(polygons: any[]): void {
    if (!this.map || polygons.length === 0) return;

    const polygonLayers: L.Polygon[] = [];

    polygons.forEach((p, i) => {
      const polygon = L.polygon(p.polygon, {
        color: p.color,
        fillColor: 'rgb(209, 209, 209)',
        fillOpacity: 0.3
      })
        .addTo(this.map)
        .bindPopup(`Поле №${i + 1}`).on('click', () => { console.log('Marker clicked at:', i); });

      L.circleMarker(p.polygon[0], {
        radius: 4,
        color: '#6d0e0e',
        fillColor: '#f50f0f',
        fillOpacity: 1
      })
        .addTo(this.map)

      polygonLayers.push(polygon);
    });
  }
}
