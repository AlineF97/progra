import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService} from './usuario.service';

@Component({
  selector: 'app-registra-usuario',
  templateUrl: './registra-usuario.page.html',
  styleUrls: ['./registra-usuario.page.scss'],
})
export class RegistraUsuarioPage implements OnInit {
 usuario={
   user: '',
   password: '',
   pregunta: '',
   respuesta: ''

  };

  campo: string;
  constructor(private router: Router,public toastController: ToastController,
    private usuarioService: UsuarioService ) { }

  ngOnInit() {
  }

  registrarUsuario(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario // Al estado le asignamos un objeto con clave y valor
      }
    };
    // Se declara e instancia un elemento de tipo NavigationExtras
    if(this.validateModel(this.usuario)){
        this.usuarioService.addUsuario(this.usuario.user.valueOf(),
          this.usuario.password.valueOf(),
          this.usuario.pregunta.valueOf(),
          this.usuario.respuesta.valueOf());
          this.presentToast('Usuario creado correctamente');
          this.router.navigate(['/home'],navigationExtras);//si se cumplen las validaciones muestra el mensaje y redirecciona a login
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }
   /**
   * Muestra un toast al usuario (mensaje flotante)
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
    // Recorro todas las entradas que me entrega Object.entries y obtengo su valor
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
