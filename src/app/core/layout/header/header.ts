import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public userInfo = inject(AuthService).userInfo;
}
