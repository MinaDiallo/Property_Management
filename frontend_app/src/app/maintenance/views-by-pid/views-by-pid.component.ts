import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-views-by-pid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './views-by-pid.component.html',
  styleUrl: './views-by-pid.component.scss',
})
export class ViewsByPIdComponent {
  id!: number;
  maintenances: Maintenance[] = [];
  propertyId!: number;

  constructor(
    public taskService: MaintenanceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      var propertyID = params['id'];
      this.propertyId = propertyID;
      this.taskService
        .findByPropertyId(propertyID)
        .subscribe((data: Maintenance[]) => {
          this.maintenances = data;
        });
    });
  }
}
