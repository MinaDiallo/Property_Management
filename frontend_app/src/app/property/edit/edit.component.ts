import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  id!: number;
  property!: Property;
  form!: FormGroup;

  constructor(
    public propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.propertyService.find(this.id).subscribe((data: Property) => {
      console.log('uuuu', data);
      this.property = data;
    });
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      propertyType: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
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
    console.log(this.form.value);
    this.propertyService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log('Property updated successfully!');
        this.router.navigateByUrl('');
      });
  }
}
