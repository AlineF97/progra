import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistraUsuarioPage } from './registra-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistraUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistraUsuarioPageRoutingModule {}
