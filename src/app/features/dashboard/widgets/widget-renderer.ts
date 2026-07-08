import { inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { WIDGET_DATA, WidgetContext } from './constants/widget.constant';


@Injectable({
  providedIn: 'root',
})
export class WidgetRenderer {
  private parentInjector = inject(Injector);

  public renderWithData(vcr: ViewContainerRef, componentClass: any, customData: any) {

    const contextInstance = new WidgetContext(customData);

    const customInjector = Injector.create({
      providers: [
        { provide: WIDGET_DATA, useValue: contextInstance }
      ],
      parent: this.parentInjector
    });

    vcr.createComponent(componentClass, { injector: customInjector });
  }

}
