import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@/app/core/services/user/user-api.service';
import type { CredentialsDTO } from '@/app/core/services/user/user-api.service';
import { UserStore } from '@/app/core/stores/user/user.store';
import { isApiError } from '@/app/core/models/api-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '@/app/components/button/button';
import { firstValueFrom } from 'rxjs';

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
    const response = await this.userService.login(credentials)
    this.loginForm.enable()

    // Validation: what we do on an error scenario
    if (typeof response === "string") {
      return
    }

    this.userStore.setProfile(response);
    this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/');
    localStorage.setItem('userProfile', JSON.stringify(response));
  }
}
