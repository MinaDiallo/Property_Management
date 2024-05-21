import { Component } from '@angular/core';
import { TenantService } from '../tenant.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Tenant } from '../tenant';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent {
  id!: number;
  tenant!: Tenant;
  form!: FormGroup;
  propertyID!: number;

  constructor(
    public tenantService: TenantService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.propertyID = params.propertyId;
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.tenantService.find(this.id).subscribe((data: Tenant) => {
      this.tenant = data;
    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactInfo: new FormControl('', Validators.required),
      leaseTermStart: new FormControl('', Validators.required),
      leaseTermEnd: new FormControl('', Validators.required),
      rentalPayementStatus: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    this.tenantService
      .update(this.id, { ...this.form.value, propertyID: this.propertyID })
      .subscribe((res: any) => {
        console.log('Tenant updated successfully!', res);
        this.router.navigateByUrl('tenant/index');
      });
  }
}
