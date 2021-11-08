import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistraUsuarioPageRoutingModule } from './registra-usuario-routing.module';

import { RegistraUsuarioPage } from './registra-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistraUsuarioPageRoutingModule
  ],
  declarations: [RegistraUsuarioPage]
})
export class RegistraUsuarioPageModule {}
