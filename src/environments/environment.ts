// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
