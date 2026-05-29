import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appHasRole]',
})
//*appHasRole="['ADMIN', 'AGRONOMIST']"
//*appHasRole="AGRONOMIST"
export class HasRole {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private isViewCreated = false;

  @Input() set appHasRole(roles: string | string[]) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const hasAccess = this.authService.hasRole(allowedRoles);

    if (hasAccess && !this.isViewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isViewCreated = true;
    } else if (!hasAccess && this.isViewCreated) {
      this.viewContainer.clear();
      this.isViewCreated = false;
    }
  }
}
