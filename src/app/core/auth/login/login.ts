import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private destroyRef = inject(DestroyRef);
  public authService = inject(AuthService);

  public form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public onSubmit() {
    if (this.form.valid) {
      this.authService.login({
        email: this.form.value.email!,
        password: this.form.value.password!
      }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }
}
