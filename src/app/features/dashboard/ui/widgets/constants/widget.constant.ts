import { InjectionToken } from "@angular/core";

export class WidgetContext<T = any> {
    constructor(public readonly data: T) { }
}
export const WIDGET_DATA = new InjectionToken<WidgetContext>('WIDGET_DATA');