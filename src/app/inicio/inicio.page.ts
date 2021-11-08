import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user: '';

    constructor(private activatedRoute: ActivatedRoute, private router : Router){}

    ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
          this.user = this.router.getCurrentNavigation().extras.state.user.usuario;
      });
    }

    

}
