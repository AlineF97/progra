import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuario: Usuario[]=[
    {
      user: 'bvega',
      password: '123456',
      pregunta: '¿Color favorito?',
      respuesta: 'azul'
    },
    {
      user: 'afarias',
      password: '987654',
      pregunta: '¿Nombre de mascota infancia?',
      respuesta: 'black'
    }
];
  constructor() {
  }
  getUsuario(usuarioInput: string)
  {
    return {
            ...this.listaUsuario.find(usuario => {return usuario.user === usuarioInput })
           }
    }
  addUsuario( user: string, password: string, pregunta:string, respuesta:string)
  {
    this.listaUsuario.push(
      {    
        user,
        password,
        pregunta,
        respuesta
      }
    );   
  }
  modContrasena(usuarioRecuperaInput: string,nuevaClaveInput: string){
    let salida: boolean;
    salida=false;
    for (var i = 0; i < this.listaUsuario.length; i++) {
      if (this.listaUsuario[i].user===usuarioRecuperaInput){
        this.listaUsuario[i].password = nuevaClaveInput;
        salida=true;
      }      
     }
     return salida
    
  }



}

