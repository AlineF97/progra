import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import{AsistenciaService} from '../asistencias/asistencia.service'
import{Asistencia} from '../asistencias/asistencia.model'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {
  asistencia={
    id:'',
    fecha:'',
    asignatura: '',
    profesor: '',
    hora: ''
  };
  asistenciaService : AsistenciaService;

  campo: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private AsistenciaService: AsistenciaService, public toastController: ToastController) {
      this.asistenciaService = AsistenciaService;
      this.activatedRoute.paramMap.subscribe(paramMap => {
        const idAsistenciaRecibido=paramMap.get('asistenciaId');
          alert(idAsistenciaRecibido);
        this.asistenciaService.getDetalle(idAsistenciaRecibido).then(res => {
          this.asistencia=res;
          this.asistencia.id=idAsistenciaRecibido;
        });
      }
      );
     }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      //de la ruta activa se toma el contactoid declarado en path en app-routing el numero despues del / en el link
      paramMap=>{
        const idAsistenciaRecibido=paramMap.get('asistenciaId'); //recupero el parametro y lo dejo en una constante
        this.asistenciaService.getDetalle(idAsistenciaRecibido).then(res => {
          this.asistencia=res;
          this.asistencia.id=idAsistenciaRecibido;
        }); //declaro en el objeto contacto declarado arriba los detalles de contacto recuperados con la constante 
      }
    );
  }

  

}
