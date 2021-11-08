import { Injectable } from '@angular/core';
import {Asistencia} from './asistencia.model'
import { DataBaseService } from '../servicios/data-base.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  

  public registroAsistencia : Asistencia [] = [];
  asistencia: Asistencia;
  db: DataBaseService;
  
  constructor(db :DataBaseService) {
    this.db=db;
    alert('xxxx-0 ');
   }

   getDatabaseState()
   {
     return this.db.getDatabaseState();
   }

  //para mostrar registro de asistencia
  getRegistro(){
    alert('xxxx-6 ');
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.db.getRegistro().subscribe(asistencias => {
          this.registroAsistencia = asistencias;
        });
      }
    });
    return this.registroAsistencia;
  }
  //para retornar detalles de asistencia segun id solicitado
  getDetalle(asistenciaId :string): Promise<Asistencia> 
  {
    alert('xxxx-7');
    return this.db.getAsistencia(asistenciaId).then(data => {
      this.asistencia = data;
      alert('xxxx-8');
      return this.asistencia;
    });

  }

  //agregar registro 
  addRegistro(fecha:string, asignatura :string, profesor:string, hora: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.db.addAsistencia(fecha, asignatura, profesor, hora);
      }
    });
  }

  updateRegistro(id: string, fecha:string, asignatura: string, profesor:string, hora:string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        console.log('Modificar asistencia');
        this.db.updateAsistencia(fecha, asignatura,profesor,hora,id);
      }
    });
  }

  deleteRegistro(id:string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.db.deleteAsistencia(id);
      }
    });
  }
}
