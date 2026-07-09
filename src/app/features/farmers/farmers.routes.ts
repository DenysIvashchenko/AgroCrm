import { Routes } from "@angular/router";
import { Farmers } from "./ui/farmers/farmers";

export const FARMERS_ROUTES: Routes = [
    {
        path: '',
        component: Farmers
    },
    {
        path: ':id',
        loadComponent: () => import('./ui/farmers-details/farmers-details').then(m => m.FarmersDetails)
    }
];