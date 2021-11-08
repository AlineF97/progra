import { Component, OnInit } from '@angular/core';
import { UsuarioService}  from '../registra-usuario/usuario.service';
import { Usuario } from '../registra-usuario/usuario.model';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  user={
    usuario:'',
    password:'',
    respuesta : ''
    
  };
   usuario: Usuario;
     //variable para mostrar el campo faltante
   campo: string;

   constructor(private router: Router,
    private usuarioService: UsuarioService, private toastController: ToastController,private activatedRoute: ActivatedRoute) { } // Se debe instanciar
 

  ngOnInit() {
  }

  restablecer() {
    // Se declara e instancia un elemento de tipo NavigationExtras
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Al estado le asignamos un objeto con clave y valor
      }
    };
    if(this.validateModel(this.user)){
      this.usuario=this.usuarioService.getUsuario(this.user.usuario);
      console.log(this.usuarioService.getUsuario(this.user.usuario))
      console.log(this.usuario.password)
      if(this.usuario.respuesta === this.user.respuesta){
        let mod : boolean;
        mod=this.usuarioService.modContrasena(this.usuario.user,this.user.password);
        if(mod){
          this.presentToast('Contraseña modificada');
          console.log(this.usuarioService.getUsuario(this.user.usuario))
        this.router.navigate(['/home'],navigationExtras); // navegamos hacia el inicio y enviamos información adicional
        }else{
          this.presentToast('Error al modificar');
        }  
      }else{
        this.presentToast('Pregunta o respuesta no validos');
      }
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }


  }
 
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
    for (const [key, value] of Object.entries(model)) {
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
