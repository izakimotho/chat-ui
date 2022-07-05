# LunnaChat




## install Dependancies
### install uuid
	npm install --save uuid
### internet connection check plugin
	npm install ng-connection-service --save
	npm i ng-connection-service
### Device Detector
	npm install ngx-device-detector --save

### install qr code
	npm install angularx-qrcode --save
### install flex-layout
npm i -s @angular/flex-layout @angular/cdk
### install ngx-perfect-scrollbar
 npm install ngx-perfect-scrollbar --save
### install ngx-owl Carousel 
npm install ngx-owl-carousel-o
### install bootstrap
npm install bootstrap
npm install --save @ng-bootstrap/ng-bootstrap
### install font awesome
npm install font-awesome --save
npm install @fortawesome/fontawesome-svg-core
 npm install @fortawesome/free-solid-svg-icons
### install socketcluster
npm install socketcluster-client
### install bootstrap icons
npm install bootstrap-icons
### remixicon
npm install remixicon --save
### ngx-emoji-mart
npm install @ctrl/ngx-emoji-mart
## Development server

### install bootstrap
npm install bootstrap@4.5.0

###Install jQuery and Popper
```
According to the getting started guide, Bootstrap 4 requires the jQuery and Popper libraries to be added as dependencies, so we’ll also add these using NPM commands:
```
npm install jquery@3.5.1
npm install popper.js@1.14.3




Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

### Generate components
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Generate Module
    ng generate module customers --route customers --module app.module


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- assets/images/             app assets (images, fonts, sounds...)
|- assets/styles/            app styles,global scss variables and theme
|- assets/i18n/              app translations files
|- environments/             values for various build environments
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
vendor/                      3rd party related files and plugins
```

