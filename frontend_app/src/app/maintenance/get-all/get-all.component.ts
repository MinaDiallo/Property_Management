import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.scss',
})
export class GetAllComponent {
  maintenances: Maintenance[] = [];

  constructor(public maintenanceService: MaintenanceService) {}

  ngOnInit(): void {
    this.maintenanceService.getAll().subscribe((data: Maintenance[]) => {
      console.log('rrr', data);
      this.maintenances = data;
    });
  }
}
