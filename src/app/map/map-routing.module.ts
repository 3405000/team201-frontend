import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MapPage } from './pages/map.page'



const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MapRoutingModule { }
