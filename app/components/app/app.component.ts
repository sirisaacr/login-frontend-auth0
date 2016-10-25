import { Component }         from '@angular/core';
import { Auth }              from '../../services/auth0/auth.service';

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    // Se debe hacer refencia desde la localización de index.html
    templateUrl: './app/components/app/app.template.html'
})

export class AppComponent {
  constructor(private auth: Auth) {}
};