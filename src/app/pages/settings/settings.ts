import { Component } from '@angular/core';
import { Button } from '@/app/components/button/button';
import { Dialog } from '@/app/components/dialog/dialog';

@Component({
  selector: 'app-settings',
  imports: [Button, Dialog],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})

export class Settings {}
