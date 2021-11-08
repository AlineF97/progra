import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from './asistencia.service';



@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  registroAsistencia =[];
  asistenciaService : AsistenciaService;

  constructor( AsistenciaService : AsistenciaService) { 
    this.asistenciaService = AsistenciaService;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    alert("XXX");
   this.registroAsistencia=this.asistenciaService.getRegistro();
  }



}
