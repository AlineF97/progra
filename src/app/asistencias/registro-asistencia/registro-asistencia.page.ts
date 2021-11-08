import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {AsistenciaService} from '../asistencia.service';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage implements OnInit {

  asistencia = {
    fecha: '',
    hora: ''  ,
    profesor: '',
    asignatura: '',
     
  };

  asistenciaService: AsistenciaService; 
  campo: string;

  constructor( private router : Router, public toastController : ToastController, 
    asistenciaService : AsistenciaService) { 
      this.asistenciaService= asistenciaService;
    }

  ngOnInit() {
  }

  registrarAsistencia(){
    const navigationExtras: NavigationExtras = {
      state: {
        asistencia: this.asistencia // Al estado le asignamos un objeto con clave y valor
      }
    };
    
    if(this.validateModel(this.asistencia)){
        this.asistenciaService.addRegistro(this.asistencia.fecha.valueOf(),
          this.asistencia.hora.valueOf(),
          this.asistencia.profesor.valueOf(),
          this.asistencia.asignatura.valueOf());
          this.presentToast('Datos registrados correctamente');
          this.router.navigate(['/asistencias'],navigationExtras);//si se cumplen las validaciones muestra el mensaje y redirecciona a asistencias
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }
   /**
   * Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
    async presentToast(message: string, duration?: number){
      const toast = await this.toastController.create(
        {
          message,
          duration:duration?duration:2000
        }
      );
      toast.present();
    }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
    validateModel(model: any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value==='') {
        // Se asigna el campo faltante
        this.campo=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
}
