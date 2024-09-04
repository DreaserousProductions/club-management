import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Import the module

platformBrowserDynamic()
  .bootstrapModule(AppModule) // Bootstrap the module
  .catch(err => console.error(err));
