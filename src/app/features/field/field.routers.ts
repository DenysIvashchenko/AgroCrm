import { Routes } from "@angular/router";
import { Field } from "./field";

export const FIELD_ROUTES: Routes = [
    {
        path: '',
        component: Field
    },
    // {
    //     // path: ':id',
    //     // loadComponent: () => import('./fields-details/field-details').then(m => m.FieldDetails)
    // }
];