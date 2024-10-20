import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Set up routing
      // Provide HttpClient globally
  ]
}).catch((err) => console.error(err));




