import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonAvatar, IonImg, IonLabel, IonToggle, IonSearchbar, IonFab, IonFabButton, IonIcon, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ServiceService } from 'src/app/services/service.service';
import { ProductoService } from 'src/app/services/producto.service';
import { addIcons } from 'ionicons';
import { add, cubeOutline, folderOpenOutline } from 'ionicons/icons';
import { AlertOptions, InfiniteScrollCustomEvent, ModalOptions } from '@ionic/core';
import { ModalProductoPage } from 'src/app/modal/modal-producto/modal-producto.page';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonIcon, IonFabButton, IonFab, IonSearchbar, IonToggle, IonLabel, IonImg, IonAvatar, IonList, IonContent, CommonModule, FormsModule, NavComponent]
})
export class ProductosPage implements OnInit {

  private _producto:ProductoService = inject(ProductoService);
  _service: ServiceService = inject(ServiceService);
  arrayProductos:Array<any> = [];
  page:number = 1;
  total_pages:number = 1;
  seach:string | null | undefined = '';
  activos:number = 0;
  inactivos:number = 0;
  urlImage = `${environment.urlImagen}storage/images/producto`;

  constructor() { 
    addIcons({ add, cubeOutline, folderOpenOutline });
  }

  ngOnInit() {
    this.cargarProductos({page: 1});
  }

  async cargarProductos(data:any) {
    const res:any = await this._producto.getAllProductos(data);
    this.arrayProductos.push(...res.data);
    this.page = res.page;
    this.total_pages = res.total_pages;
    this.activos = res.total_activo;
    this.inactivos = res.total_inactivo;
  }

  async abrirModal() {
    const data:ModalOptions = { component: ModalProductoPage, componentProps: { titulo: 'Nueva Producto' } };
    const modal = await this._service.abrirModal(data);
    modal.present();
    const { data: res, role } = await modal.onWillDismiss();
    if (role == 'success') {
      this.arrayProductos.unshift(res);
      this.countActivosInactivos();
    }
  }

  async editar(id:any) {
    const res:any = await this._producto.getProducto(id);
    const data:ModalOptions = { component: ModalProductoPage, componentProps: { titulo: 'Editar Producto', data: res } };
    const modal = await this._service.abrirModal(data);
    modal.present();
    const { data: resModal, role } = await modal.onWillDismiss();
    if (role == 'success') {
      const index = this.arrayProductos.findIndex((item:any) => item.id == id);
      this.arrayProductos[index] = resModal;
      this.countActivosInactivos();
    }
  }

  async eliminar(id:any) {
    const dataAler:AlertOptions = { 
      message: 'Desea eliminar el producto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => { console.log('Confirm Cancel'); } },
        { text: 'Aceptar', role: 'confirm', handler: async () => { 
          const res:any = await this._producto.delete(id);
          const index = this.arrayProductos.findIndex((item:any) => item.id == id);
          this.arrayProductos.splice(index, 1);
          this.countActivosInactivos();
         } 
        }
      ]
    };
    await this._service.Alert(dataAler);
  }

  async countActivosInactivos() {
    const res:any = await this._producto.getCountActivosInactivos();
    if (!res.error) {
      this.activos = res.total_activo;
      this.inactivos = res.total_inactivo;
    }
  }

  async updateStatus(id:any) {
    const producto = this.arrayProductos.find((item:any) => item.id == id);
    console.log(producto);
    const data = {
      status: producto.status
    };
    console.log(data);
    const res:any = await this._producto.updateStatus(id, data);
    if (!res.error) {
      /* const index = this.arrayProductos.findIndex((item:any) => item.id == id);
      this.arrayProductos[index] = res.data; */
      this.countActivosInactivos();
    }
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.seach = target.value;
    this.arrayProductos = [];
    this.cargarProductos({page: 1, search: target.value});
  }

  onIonInfinite(event: InfiniteScrollCustomEvent | any) {
    if (this.total_pages > this.page) {
      this.cargarProductos({page: this.page + 1, search: this.seach});
    }
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
