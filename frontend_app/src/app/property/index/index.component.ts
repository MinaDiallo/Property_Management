import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../property.service';
import { Property } from '../property';
import { NavbarComponent } from '../../partial/navbar/navbar.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  properties: Property[] = [];

  constructor(public propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getAll().subscribe((data: Property[]) => {
      this.properties = data;
      console.log(this.properties);
    });
  }
  deleteProperty(id: number) {
    this.propertyService.delete(id).subscribe((res) => {
      this.properties = this.properties.filter((item) => item.id !== id);
      console.log('Property deleted successfully!');
    });
  }
}
