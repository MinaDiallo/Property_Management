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

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
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
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactInfo: new FormControl('', Validators.required),
      leaseTermStart: new FormControl('', Validators.required),
      leaseTermEnd: new FormControl('', Validators.required),
      rentalPayementStatus: new FormControl('', Validators.required),
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  submit() {
    this.tenantService
      .add({ ...this.form.value, propertyID: this.propertyID })
      .subscribe((res: any) => {
        console.log('Tenant add successfully!');
        this.router.navigateByUrl('tenant/index');
      });
  }
}
