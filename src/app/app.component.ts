import { Component } from '@angular/core';
import { PreviousRouteService } from './services/previous-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dev238x';

  constructor(private prevRouteService: PreviousRouteService) {}
}
