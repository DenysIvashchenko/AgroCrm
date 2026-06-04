import { MatButtonModule } from '@angular/material/button';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [MatButtonModule],
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  public authService = inject(AuthService);
  public title = signal<string>('');
  public url = inject(Router).url;

  private route = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.title.set(this.url.split('/').filter((u) => !!u).join('-'));

    this.route.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.title.set(event.url.split('/').filter((u) => !!u).join('-'));
        }
      });
  }

  public logout() {
    this.authService.logout();
  }
}
