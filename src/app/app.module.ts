import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentPreviewComponent } from './components/document-preview/document-preview.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentPreviewComponent,
    DocumentFormComponent,
    HomepageComponent,
    FooterComponent,
    HeaderComponent,
    FormMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
