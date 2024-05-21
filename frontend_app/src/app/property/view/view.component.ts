import { Component } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../property';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  id!: number;
  property!: Property;

  constructor(
    public propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.propertyService.find(this.id).subscribe((data: Property) => {
      this.property = data;
    });
  }
}
