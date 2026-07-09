import { Observable } from "rxjs";
import { CreateFarmerDto, Farmer } from "../../../shared/models";

export abstract class FarmerRepository {
    abstract getFarmers(searchTerm?: string): Observable<Farmer[]>;
    abstract getFarmerById(id: number | string): Observable<Farmer>;
    abstract createFarmer(farmer: CreateFarmerDto): Observable<Farmer>;
    abstract updateFarmer(id: number | string, farmer: Farmer): Observable<Farmer>;
    abstract deleteFarmer(id: number | string): Observable<void>;
}   