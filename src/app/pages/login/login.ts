import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@/app/core/services/user/user-api.service';
import type { CredentialsDTO } from '@/app/core/services/user/user-api.service';
import { UserStore } from '@/app/core/stores/user/user.store';
import { isApiError } from '@/app/core/models/api-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '@/app/components/button/button';
import { finalize, firstValueFrom, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './login.html',
  standalone: true,
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userStore = inject(UserStore);

  public readonly FORM_STYLES = {
    wrapper: `
      flex flex-col
      m-auto p-7 space-y-4
      bg-light-gray dark:bg-dark-gray
      h-8/12 w-full sm:w-8/12 md:w-5/12 lg:w-4/12
      rounded-2xl
    `,
    input: `
      w-full 
      mt-1 p-2
      rounded border-2 border-gray-300 
      focus:outline-none focus:ring-2 focus:ring-purple-500
    `,
  };

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.loginForm.valid) return;

    const credentials = this.loginForm.value as CredentialsDTO;
    this.loginForm.disable()

    try {
      const res = await firstValueFrom(this.userService.login(credentials));

      if (isApiError(res)) {
        console.error('API Error:', res.message);
        return;
      }

      this.userStore.setProfile(res);
      this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/');

    } catch (err) {
      console.error('Something went wrong: ', err);
    } finally {
      this.loginForm.enable()
    }
  }
}
