import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFab, IonFabButton, IonIcon, ModalOptions, IonList, IonItem, IonButton, IonItemSliding, IonPopover, IonLabel, AlertOptions, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ServiceService } from 'src/app/services/service.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { addIcons } from 'ionicons';
import { add, cubeOutline, folderOpenOutline } from 'ionicons/icons';
import { ModalCategoriaPage } from 'src/app/modal/modal-categoria/modal-categoria.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonSearchbar, IonLabel, IonPopover, IonItemSliding, IonButton, IonItem, IonList, IonIcon, IonFabButton, IonFab, IonContent, CommonModule, FormsModule, NavComponent, IonInfiniteScrollContent]
})
export class CategoriaPage implements OnInit {

  _service: ServiceService = inject(ServiceService);
  private _categoria:CategoriaService = inject(CategoriaService);
  arrayCategorias:Array<any> = [];
  page:number = 1;
  total_pages:number = 1;
  seach:string | null | undefined = '';

  constructor() { 
    addIcons({ add, cubeOutline, folderOpenOutline });
  }

  ngOnInit() {
    this.cargarCategporias({page: 1});
  }

  async cargarCategporias(data:any) {
    const res:any = await this._categoria.getAllCategorias(data);
    this.arrayCategorias.push(...res.data);
    this.page = res.page;
    console.log(res);
  }

  async abrirModal() {
    const data:ModalOptions = { component: ModalCategoriaPage, componentProps: { titulo: 'Nueva Categoria' } };
    const modal = await this._service.abrirModal(data);
    modal.present();
    const { data: res, role } = await modal.onWillDismiss();
    //console.log(res, role);
    if (role == 'success') {
      this.arrayCategorias.unshift(res);
    }
  }

  async editar(id:any) {
    console.log(id);
    const res:any = await this._categoria.getCategoria(id);
    console.log(res);
    const data:ModalOptions = { component: ModalCategoriaPage, componentProps: { titulo: 'Editar Categoria', data: res } };
    const modal = await this._service.abrirModal(data);
    modal.present();
    const { data: resModal, role } = await modal.onWillDismiss();
    //console.log(res, role);
    if (role == 'success') {
      const index = this.arrayCategorias.findIndex((item:any) => item.id == id);
      this.arrayCategorias[index] = resModal;
    }
  }

  async eliminar(id:any) {
    const dataAler:AlertOptions = { 
      message: 'Desea eliminar la categoria?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => { console.log('Confirm Cancel'); } },
        { text: 'Aceptar', role: 'confirm', handler: async () => { 
          const res:any = await this._categoria.delete(id);
          const index = this.arrayCategorias.findIndex((item:any) => item.id == id);
          this.arrayCategorias.splice(index, 1);
         } 
        }
      ]
    };
    await this._service.Alert(dataAler);
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.seach = target.value;
    this.arrayCategorias = [];
    this.cargarCategporias({page: 1, search: target.value});
  }

  onIonInfinite(event: InfiniteScrollCustomEvent | any) {
    if (this.total_pages > this.page) {
      this.cargarCategporias({page: this.page + 1, search: this.seach});
    }
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
