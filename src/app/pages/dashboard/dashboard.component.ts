import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonIcon, IonTabs, IonLabel } from '@ionic/angular/standalone';
import { menuOutline, homeOutline, personOutline, searchOutline } from 'ionicons/icons';
import { MenuLateralComponent } from 'src/app/components/menu-lateral/menu-lateral.component';
import { routes } from './dashboarad.routes';
import { EchoService } from 'src/app/services/echo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonLabel, IonTabs, IonTabButton, IonTabBar, IonSplitPane, IonApp, IonRouterOutlet, MenuLateralComponent],
})
export class DashboardComponent  implements OnInit {

  arrayRutas = routes.find(route => route.path === '')?.children?.filter(route => route.data).map(route => ({...route, activo: false})) || [];
  //private _echo:EchoService = inject(EchoService);

  constructor() { 
    console.log(this.arrayRutas);
  }

  ngOnInit() {
    /*this._echo.getEcho().channel('chat').listen('MessageSent', (resp:any) => {
      console.log(resp);
    });*/
  }

}
