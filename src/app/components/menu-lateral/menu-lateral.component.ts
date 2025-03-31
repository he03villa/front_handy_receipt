import { Component, inject, OnInit } from '@angular/core';
import { IonItem, IonMenu, IonContent, IonList, IonListHeader, IonImg, IonButton } from "@ionic/angular/standalone";
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: true,
  imports: [IonItem, IonMenu, IonContent, IonList, IonListHeader, IonImg, IonButton],
})
export class MenuLateralComponent  implements OnInit {

  _service:ServiceService = inject(ServiceService);

  constructor() { }

  ngOnInit() {}

}
