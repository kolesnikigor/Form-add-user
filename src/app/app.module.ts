import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { UsersService } from './services/users.service';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    BaseLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    ReactiveFormsModule,
    WindowModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
