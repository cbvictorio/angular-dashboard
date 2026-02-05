import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '@/app/core/services/user/user';
import { Login } from '@/app/components/login/login';

@Component({
  selector: 'app-home',
  imports: [Login],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  
}
