import { Routes } from "@angular/router";
import { Farmers } from "./farmers";

export const FARMERS_ROUTES: Routes = [
    {
        path: '',
        component: Farmers
    },
    {
        path: ':id',
        loadComponent: () => import('./farmers-details/farmers-details').then(m => m.FarmersDetails)
    }
];