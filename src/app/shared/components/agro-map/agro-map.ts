import { AfterViewInit, Component, computed, ElementRef, input, OnDestroy, output, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PolygonCoords } from '../../models/types/poligons.type';

@Component({
  selector: 'app-agro-map',
  imports: [MatIconModule],
  templateUrl: './agro-map.html',
  styleUrl: './agro-map.scss',
})
export class AgroMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapEl') mapEl!: ElementRef<HTMLDivElement>;

  public readonly = input<boolean>(false);
  public initialGeoJson = input<string | null>(null);

  public polygonChange = output<PolygonCoords | null>();

  private map: any = null;
  private polygon: any = null;
  private markers: any[] = [];
  private L: any = null;

  public pointsCount = signal(0);
  public hasPolygon = computed(() => this.pointsCount() >= 4);

  async ngAfterViewInit(): Promise<void> {
    this.L = await import('leaflet');
    this.fixLeafletIcons();
    this.initMap();

    if (this.initialGeoJson()) {
      this.restorePolygon(this.initialGeoJson()!);
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    const L = this.L;
    const el = this.mapEl.nativeElement;

    this.map = L.map(el, { zoomControl: true }).setView([50.45, 30.52], 13);

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

    if (!this.readonly()) {
      this.map.on('click', (e: any) => this.onMapClick(e));
    }
  }

  private onMapClick(e: any): void {
    const L = this.L;
    const latlng = e.latlng;

    const marker = L.circleMarker([latlng.lat, latlng.lng], {
      radius: 5, color: '#3d7a1e', fillColor: '#97C459',
      fillOpacity: 0.9, weight: 2,
    }).addTo(this.map);

    this.markers.push({ marker, latlng });
    this.pointsCount.set(this.markers.length);

    if (this.markers.length >= 4) {
      this.redrawPolygon();
    }
  }

  private redrawPolygon(): void {
    const L = this.L;
    const points = this.markers.map(m => m.latlng);

    if (this.polygon) this.map.removeLayer(this.polygon);

    this.polygon = L.polygon(points, {
      color: '#3d7a1e', fillColor: '#EAF3DE',
      fillOpacity: 0.4, weight: 2,
    }).addTo(this.map);

    const center = this.polygon.getBounds().getCenter();

    const geoJson = JSON.stringify(
      points.map((p: any) => p.toString().replace('LatLng(', '').replace(')', '').split(',').map(Number)),
    );

    this.polygonChange.emit({
      geoJson,
      center: { lat: center.lat, lng: center.lng }
    });
  }

  public clearPolygon(): void {
    this.markers.forEach(m => this.map.removeLayer(m.marker));
    this.markers = [];
    if (this.polygon) {
      this.map.removeLayer(this.polygon); this.polygon = null;
    }
    this.pointsCount.set(0);
    this.polygonChange.emit(null);
  }

  private restorePolygon(geoJsonStr: string): void {
    try {
      const L = this.L;
      const geo = JSON.parse(geoJsonStr);
      const coords = geo.geoJson;
      const latLngs = coords.map((c: number[]) => ({ lat: c[1], lng: c[0] }));

      this.polygon = L.polygon(geo.geoJson, {
        color: '#3d7a1e', fillColor: '#EAF3DE',
        fillOpacity: 0.4, weight: 2,
      }).addTo(this.map);

      this.map.fitBounds(this.polygon.getBounds(), { padding: [20, 20] });
      this.pointsCount.set(latLngs.length);
    } catch (e) {
      console.warn('Cannot restore polygon:', e);
    }
  }

  private fixLeafletIcons(): void {
    (this.L as any).Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }
}
