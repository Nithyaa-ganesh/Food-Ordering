import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/partials/header/header.component";
import { HomeComponent } from './components/pages/home/home.component';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,HomeComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
