export const environment = {
  production: true,
  urlApi: 'http://192.168.1.7:8001/api/',
  urlImagen: 'http://192.168.1.7:8001/',
  VITE_REVERB_APP_KEY: 'jq0c6sqi3sg7amtglllp',
  VITE_REVERB_PORT: '8002',
  VITE_REVERB_HOST: '192.168.1.7',
  VITE_REVERB_SCHEME: 'http',
  api: {
    auth: {
      service: {
        login: 'login',
        register: 'register',
        show: 'show'
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
