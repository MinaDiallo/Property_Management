import { Component } from '@angular/core';
import { MaintenanceService } from '../maintenance.service';
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
export class AddMaintenanceComponent {
  form!: FormGroup;
  propertyID!: number;

  constructor(
    public taskService: MaintenanceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.propertyID = params.propertyId;
    });
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      scheduledDate: new FormControl('', Validators.required),
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
    this.taskService
      .add({ ...this.form.value, propertyID: this.propertyID })
      .subscribe((res: any) => {
        console.log('Maintenance add successfully!');
        this.router.navigateByUrl('maintenance/index');
      });
  }
}
