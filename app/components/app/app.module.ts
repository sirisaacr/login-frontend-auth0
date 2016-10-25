import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AppComponent }        from './app.component';
import { HomeComponent }       from '../home/home.component';
import { ProfileComponent }    from '../profile/profile.component';
import { ProfileShow }         from '../profile_show/profile_show.component';
import { routing,
         appRoutingProviders } from '../../routes/app.routes';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        ProfileShow
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS
    ],
    imports:      [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
