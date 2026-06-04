import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { Logo } from '../../../shared/components/logo/logo';
import { Component, inject } from '@angular/core';
import { HasRole } from '../../../shared/directives/has-role';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [Logo, MatIconModule, HasRole, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  public userInfo = inject(AuthService).userInfo;
}
