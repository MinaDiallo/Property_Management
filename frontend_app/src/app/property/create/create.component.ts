import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { PropertyService } from '../property.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form!: FormGroup;

  constructor(
    public propertyService: PropertyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      propertyType: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
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
    this.propertyService.create(this.form.value).subscribe((res: any) => {
      console.log('Property created successfully!');
      this.router.navigateByUrl('');
    });
  }
}
