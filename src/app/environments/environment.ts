export const environmentBase = {
  url: 'http://192.168.0.23:8080/api/'
}

export const environment = {
    production: false,
    apiAuthUrl: environmentBase.url,
    apiBasketUrl: environmentBase.url + 'basket',
    apiProductManagementUrl: environmentBase.url + 'admin/products',
    apiProductUrl: environmentBase.url + 'products',
    apiOrderUrl: environmentBase.url + 'order',
    apiOrderManagement: environmentBase.url + 'admin/order'
  };
  