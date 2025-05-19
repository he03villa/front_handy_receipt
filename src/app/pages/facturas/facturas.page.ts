import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar, IonList, IonIcon, IonFab, IonFabButton, IonItemSliding, IonItem, IonSelectOption, IonLabel, IonSelect, IonButton, IonItemOption, IonItemOptions, IonChip, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ServiceService } from 'src/app/services/service.service';
import { addIcons } from 'ionicons';
import { add, cubeOutline, folderOpenOutline, createOutline, cashOutline, basketOutline } from 'ionicons/icons';
import { ModalAddUpdateFacturaPage } from 'src/app/modal/modal-add-update-factura/modal-add-update-factura.page';
import { InfiniteScrollCustomEvent, ModalOptions } from '@ionic/core';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonChip, IonButton, IonLabel, IonItem, IonItemSliding, IonFabButton, IonFab, IonIcon, IonList, IonSearchbar, IonContent, CommonModule, FormsModule, NavComponent, IonSelectOption, IonSelect]
})
export class FacturasPage implements OnInit {

  private _factura:FacturaService = inject(FacturaService);
  _service: ServiceService = inject(ServiceService);
  arrayFacturas: Array<any> = [];
  page:number = 1;
  total_pages:number = 1;
  seach:string | null | undefined = '';

  constructor() { }

  ngOnInit() {
    addIcons({ add, cubeOutline, folderOpenOutline, createOutline, cashOutline, basketOutline });
    this.cargarFacturas({ page: this.page, seach: this.seach });
  }

  async abrirModal() {
    const data:ModalOptions = { component: ModalAddUpdateFacturaPage, componentProps: { titulo: 'Nueva Factura' } };
    const modal = await this._service.abrirModal(data);
    modal.present();
  }

  async cargarFacturas(data:any) {
    const loading = await this._service.Loading();
    loading.present();
    const res:any = await this._factura.getAllFacturas(data);
    if (!res.error) {
      console.log(res);
      this.arrayFacturas = res.data;
      this.total_pages = res.total_pages;
    }
    loading.dismiss();
  }

  async editar(id:any) {
    const loading = await this._service.Loading();
    loading.present();
    const res:any = await this._factura.getFactura(id);
    let datos = res;
    datos.detalles = res.productos.map((item:any) => item.pivot);
    const data:ModalOptions = { component: ModalAddUpdateFacturaPage, componentProps: { titulo: 'Editar Factura', data: res } };
    loading.dismiss();
    const modal = await this._service.abrirModal(data);
    modal.present();
  }

  async updateStatus(id:any, event:any) {
    console.log(id, event);
    const status = event.detail.value;
    const res:any = await this._factura.updateStatus(id, { status: status });
    console.log(res);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent | any) {
    if (this.total_pages > this.page) {
      this.cargarFacturas({page: this.page + 1, search: this.seach});
    }
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
