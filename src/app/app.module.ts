import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItpcHeaderComponent } from './itpc-header/itpc-header.component';
import { ItpcContainerComponent } from './itpc-container/itpc-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItpcPopupComponent } from './itpc-popup/itpc-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ItpcHeaderComponent,
    ItpcContainerComponent,
    ItpcPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
