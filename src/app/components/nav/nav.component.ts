import { Component, OnInit } from '@angular/core';
import { notifications, menuOutline, homeOutline, personOutline, searchOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonButtons, IonImg, IonButton, IonIcon, IonMenuButton, IonSearchbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonImg, IonButtons, IonToolbar, IonHeader, IonMenuButton],
})
export class NavComponent  implements OnInit {

  constructor() { 
    addIcons({ personOutline, homeOutline });
    addIcons({ notifications, menuOutline, searchOutline });
  }

  ngOnInit() {}

}
