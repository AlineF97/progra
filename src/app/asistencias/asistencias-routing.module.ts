import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasPage } from './asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasPage
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
  },
  {
    path: 'detalle-asistencia',
    loadChildren: () => import('../detalle-asistencia/detalle-asistencia.module').then( m => m.DetalleAsistenciaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasPageRoutingModule {}
