import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tenant } from '../tenant';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexTenantComponent {
  tenants: Tenant[] = [];

  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantService.getAll().subscribe((data: Tenant[]) => {
      this.tenants = data;
    });
  }
}
