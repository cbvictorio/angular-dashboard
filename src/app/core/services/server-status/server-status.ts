import { Component } from '@angular/core';
import { DataService } from '@/app/data';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatus {
  serverInfo: any;

  constructor(private dataService: DataService) {
    this.serverInfo = this.dataService.getServerHealth();
  }
}
