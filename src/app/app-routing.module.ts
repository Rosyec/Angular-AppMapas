import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'app', loadChildren: () => import('./mapas/mapas.module').then( mapas => mapas.MapasModule ) },
  { path: '**', redirectTo: 'app/mapas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
