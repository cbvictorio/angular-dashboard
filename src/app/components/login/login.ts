import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@/app/core/services/user/user';
import type { CredentialsDTO } from '@/app/core/services/user/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const { email, password } = formData
      const credentials = { email, password } as CredentialsDTO

      this.userService.login(credentials).subscribe({
        next: (response) => {
          console.log(`next: response`)
          console.log(response)
        },
        error: (err) => {
          console.error('there was an error on the login form submission')
          console.error(err)
        }
      });
    }
  }
}
