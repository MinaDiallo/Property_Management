import { Routes } from '@angular/router';
import { IndexComponent } from './property/index/index.component';
import { ViewComponent } from './property/view/view.component';
import { CreateComponent } from './property/create/create.component';
import { EditComponent } from './property/edit/edit.component';
import { IndexTenantComponent } from './tenant/index/index.component';
import { ViewsByPropretyComponent } from './tenant/views-by-proprety/views-by-proprety.component';
import { AddComponent } from './tenant/add/add.component';
import { UpdateComponent } from './tenant/update/update.component';
import { RemoveComponent } from './tenant/remove/remove.component';
import { GetAllComponent } from './maintenance/get-all/get-all.component';
import { ViewsByPIdComponent } from './maintenance/views-by-pid/views-by-pid.component';
import { AddMaintenanceComponent } from './maintenance/add/add.component';
import { UpdateMaintenanceComponent } from './maintenance/update/update.component';

export const routes: Routes = [
  { path: 'properties', redirectTo: '', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: 'properties/:id/view', component: ViewComponent },
  { path: 'properties/create', component: CreateComponent },
  { path: 'properties/:id/edit', component: EditComponent },
  { path: 'tenant/index', component: IndexTenantComponent },
  {
    path: 'property/tenants',
    component: ViewsByPropretyComponent,
  },
  { path: 'properties/tenant/add', component: AddComponent },
  { path: 'properties/tenant/:id/update', component: UpdateComponent },
  { path: 'properties/tenant/remove', component: RemoveComponent },
  { path: 'maintenance/index', component: GetAllComponent },
  {
    path: 'property/maintenances',
    component: ViewsByPIdComponent,
  },
  { path: 'properties/maintenace/add', component: AddMaintenanceComponent },
  {
    path: 'properties/maintenance/:id/update',
    component: UpdateMaintenanceComponent,
  },
];
