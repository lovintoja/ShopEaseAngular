# ShopEaseAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## App features

Application has 4 main pages: landing page, product list, about us page and basket. Product list implements
connectivity with 3rd party API that provides names, IDs, prices and pictures for products in the shop. Basket
provides possibility to persist items locally, remove or add items of same or different kind. We can checkout 
by filling the form that has animation on pop-up. For now, checkout results only in alert and redirect to home page.

For PWA capability, serve application in production mode via:

```bash
ng serve --configuration production
```
