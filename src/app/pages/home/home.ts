import { Component, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@/app/core/services/user/user-api.service';
import type { CredentialsDTO } from '@/app/core/services/user/user-api.service';
import { UserStore } from '@/app/core/stores/user/user.store';
import type { UserProfile } from '@/app/core/models/user.model';
import { ApiResponse, isApiError } from '@/app/core/models/api-response.model';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  userStore = inject(UserStore)

  public readonly formStyles = {
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
    button: `
      p-3 mt-auto
      cursor-pointer rounded 
      bg-purple-500 text-white 
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  };

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const { email, password } = formData;
      const credentials = { email, password } as CredentialsDTO;

      this.userService.login(credentials).subscribe({
        next: (res) => {
          if (isApiError(res)) {
            const { message } = res
            console.error('Something went wrong while login into the app:')
            return console.error(message)
          }

          this.userStore.setProfile(res)
          console.log('Successfully logged in!')
        },
        error: (err) => console.error('ERROR REACHED COMPONENT:', err),
        complete: () => console.log('STREAM COMPLETED'),
      });
    }
  }
}
