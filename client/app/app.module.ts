// Modules
import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';
import { FormsModule }              from '@angular/forms';
import { RouterModule, Routes }     from '@angular/router';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';    // Cookie law
import { CookieLawModule }          from 'angular2-cookie-law';                     // Cookie law
import { NgProgressModule }         from 'ng2-progressbar';                         //ng2ProgressBar

// In memory data
// This simulates communication with a remote server
import { InMemoryWebApiModule }     from 'angular-in-memory-web-api';
import { InMemoryDataService }      from './services/in-memory-data.service';

// Components
import { AppComponent }             from './app.component';
import { NavBarComponent }          from './components/nav-bar/nav-bar.component';
import { JumbotronComponent }       from './components/jumbotron/jumbotron.component';
import { WorldMapComponent }        from './components/world-map/world-map.component';
import { FooterComponent }          from './components/footer/footer.component';
import { ConceptComponent }         from './components/concept/concept.component';
import { GalleryComponent }         from './components/gallery/gallery.component';
import { BookingComponent }         from './components/booking/booking.component';
import { SaleComponent }            from './components/sale/sale.component';
import { ContactComponent }         from './components/contact/contact.component';
import { PageNotFoundComponent }    from './components/page-not-found/page-not-found.component';
import { BlobComponent }            from './components/blob/blob.component';      // Blobs
import { SignupComponent }          from './components/signup/signup.component';
import { SigninComponent }          from './components/signin/signin.component';
import { ForgottenComponent }       from './components/forgotten/forgotten.component';
import { ProfileComponent }         from './components/profile/profile.component';
import { FileUploadComponent }      from './components/file-upload/file-upload.component';
import { ValidateComponent }        from './components/validate/validate.component';
import { ResetComponent }           from './components/reset/reset.component';
import { CryptoComponent }          from './components/crypto/crypto.component';

// Routes
const clientRoutes: Routes = [
        {
            path: 'crypto',
            component: CryptoComponent
        },
        {
            path: 'world-map',
            component: WorldMapComponent
        },
        {
            path: 'concept',
            component: ConceptComponent
        },
        {
            path: 'gallery',
            component: GalleryComponent
        },
        {
            path: 'booking',
            component: BookingComponent
        },
        {
            path: 'sale',
            component: SaleComponent
        },
        {
            path: 'contact',
            component: ContactComponent
        },
        {
            path: 'blob',
            component: BlobComponent
        },
        {
            path: 'signup',
            component: SignupComponent
        },
        {
            path: 'signin',
            component: SigninComponent
        },
        {
            path: 'forgotten',
            component: ForgottenComponent
        },
        {
            path: 'profile',
            component: ProfileComponent
        },
        {
            path: 'validate/:id/:token',
            component: ValidateComponent
        },
        {
            path: 'reset/:id/:token',
            component: ResetComponent
        },
        {
            path: '',
            redirectTo: '/world-map',
            pathMatch: 'full'
        },
        {
            path: '**',
            component: PageNotFoundComponent
        },
    ];

// Imports & declarations
@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        FormsModule,
        // The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database.
//        InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterModule.forRoot(clientRoutes),
        NgProgressModule,
    ],
    declarations: [
        AppComponent,
        NavBarComponent,
        JumbotronComponent,
        WorldMapComponent,
        FooterComponent,
        ConceptComponent,
        GalleryComponent,
        BookingComponent,
        SaleComponent,
        ContactComponent,
        PageNotFoundComponent,
        BlobComponent,          // Blobs
        SignupComponent,
        SigninComponent,
        ForgottenComponent,
        ProfileComponent,
        FileUploadComponent,
        ValidateComponent,
        ResetComponent,
        CryptoComponent
    ],
    bootstrap: [ 
        AppComponent,
    ],
})

export class AppModule { }
