// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
