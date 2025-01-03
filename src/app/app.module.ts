import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';


// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';

// Erros
import { ErrorInterceptor } from './interceptors/error.service';
import { CardComponent } from './components/card/card.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { TableListComponent } from './components/table-list/table-list.component';

import { withFetch, provideHttpClient  } from '@angular/common/http';
import { CardCreditComponent } from './pages/card-credit/card-credit.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    InputFormComponent,
    TableListComponent,
    CardCreditComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    MatDatepickerModule,
    ErrorInterceptor,
    provideHttpClient (withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
