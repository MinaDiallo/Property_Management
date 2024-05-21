import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Maintenance } from '../maintenance';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateMaintenanceComponent {
  id!: number;
  task!: Maintenance;
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
    this.id = this.activatedRoute.snapshot.params['id'];

    this.taskService.find(this.id).subscribe((data: Maintenance) => {
      this.task = data;
    });

    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.required),
      scheduledDate: new FormControl('', Validators.required),
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
    this.taskService
      .update(this.id, { ...this.form.value, propertyID: this.propertyID })
      .subscribe((res: any) => {
        console.log('Maintenance updated successfully!', res);
        this.router.navigateByUrl('maintenance/index');
      });
  }
}
