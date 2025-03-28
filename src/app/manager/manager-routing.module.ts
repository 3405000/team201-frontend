import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ManagerPage } from './pages/manager/manager.page'
import { MyManagerRequestsPage } from './pages/my-manager-request/my-manager-requests.page'
import { MyStoresPage } from './pages/my-stores/my-stores.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerPage
  },
  {
    path: 'my-manager-requests',
    component: MyManagerRequestsPage
  },
  {
    path: 'my-stores',
    component: MyStoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
