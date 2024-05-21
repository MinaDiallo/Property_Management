import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TenantService } from '../tenant.service';
import { Tenant } from '../tenant';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-views-by-proprety',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './views-by-proprety.component.html',
  styleUrl: './views-by-proprety.component.scss',
})
export class ViewsByPropretyComponent {
  id!: number;
  tenants: Tenant[] = [];
  propertyId!: number;

  constructor(
    public tenantService: TenantService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      var propertyID = params['id'];
      this.propertyId = propertyID;
      this.tenantService
        .findByPropertyId(propertyID)
        .subscribe((data: Tenant[]) => {
          this.tenants = data;
        });
    });
  }
  removeTenant(id: number) {
    this.tenantService.remove(id).subscribe((res: any) => {
      this.tenants = this.tenants.filter((item) => item.id !== id);
      console.log('Teant deleted successfully!');
    });
  }
}
