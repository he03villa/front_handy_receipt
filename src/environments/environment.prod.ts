export const environment = {
  production: true,
  urlApi: 'http://127.0.0.1:8001/api/',
  urlImagen: 'http://127.0.0.1:8001/',
  api: {
    auth: {
      service: {
        login: 'login',
        register: 'register'
      }
    },
    empresa: {
      name: 'empresa',
      service: {
        register: 'register'
      }
    },
    categoria: {
      name: 'categoria',
      service: {
        activos: 'activos',
      }
    },
    producto: {
      name: 'producto',
      service: {
        countActivoInactivo: 'countActivoInactivo',
        status: 'status',
        productosActivos: 'productosActivos',
      }
    },
    orden: {
      name: 'orden',
      service: {
        dashboard: 'dashboard',
        status: 'status',
        ordenesActivos: 'ordenesActivos',
      }
    }
  }
};
