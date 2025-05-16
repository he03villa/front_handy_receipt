import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('../dashboard-home/dashboard-home.page').then( m => m.DashboardHomePage),
                data: { title: 'Dashboard', icon: 'fa-house' },
            },
            {
                path: 'productos',
                loadComponent: () => import('../productos/productos.page').then(m => m.ProductosPage),
                data: { title: 'Productos', icon: 'fa-cube' },
            },
            {
                path: 'facturas',
                loadComponent: () => import('../facturas/facturas.page').then( m => m.FacturasPage),
                data: { title: 'Facturas', icon: 'fa-file-invoice' },
              },
            {
                path: 'categoria',
                loadComponent: () => import('../categoria/categoria.page').then(m => m.CategoriaPage),
                data: { title: 'Categorias', icon: 'fa-list' },
            },
            {
                path: 'profile',
                loadComponent: () => import('../profile/profile.page').then( m => m.ProfilePage)
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
];