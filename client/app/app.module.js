"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_progressbar_1 = require("ng2-progressbar"); //ng2ProgressBar
// Components
var app_component_1 = require("./app.component");
var nav_bar_component_1 = require("./components/nav-bar/nav-bar.component");
var jumbotron_component_1 = require("./components/jumbotron/jumbotron.component");
var world_map_component_1 = require("./components/world-map/world-map.component");
var footer_component_1 = require("./components/footer/footer.component");
var concept_component_1 = require("./components/concept/concept.component");
var gallery_component_1 = require("./components/gallery/gallery.component");
var booking_component_1 = require("./components/booking/booking.component");
var sale_component_1 = require("./components/sale/sale.component");
var contact_component_1 = require("./components/contact/contact.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var blob_component_1 = require("./components/blob/blob.component"); // Blobs
var signup_component_1 = require("./components/signup/signup.component");
var signin_component_1 = require("./components/signin/signin.component");
var forgotten_component_1 = require("./components/forgotten/forgotten.component");
var profile_component_1 = require("./components/profile/profile.component");
var file_upload_component_1 = require("./components/file-upload/file-upload.component");
var validate_component_1 = require("./components/validate/validate.component");
var reset_component_1 = require("./components/reset/reset.component");
var crypto_component_1 = require("./components/crypto/crypto.component");
// Routes
var clientRoutes = [
    {
        path: 'crypto',
        component: crypto_component_1.CryptoComponent
    },
    {
        path: 'world-map',
        component: world_map_component_1.WorldMapComponent
    },
    {
        path: 'concept',
        component: concept_component_1.ConceptComponent
    },
    {
        path: 'gallery',
        component: gallery_component_1.GalleryComponent
    },
    {
        path: 'booking',
        component: booking_component_1.BookingComponent
    },
    {
        path: 'sale',
        component: sale_component_1.SaleComponent
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent
    },
    {
        path: 'blob',
        component: blob_component_1.BlobComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'signin',
        component: signin_component_1.SigninComponent
    },
    {
        path: 'forgotten',
        component: forgotten_component_1.ForgottenComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'validate/:id/:token',
        component: validate_component_1.ValidateComponent
    },
    {
        path: 'reset/:id/:token',
        component: reset_component_1.ResetComponent
    },
    {
        path: '',
        redirectTo: '/world-map',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent
    },
];
// Imports & declarations
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            // The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database.
            //        InMemoryWebApiModule.forRoot(InMemoryDataService),
            router_1.RouterModule.forRoot(clientRoutes),
            ng2_progressbar_1.NgProgressModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            nav_bar_component_1.NavBarComponent,
            jumbotron_component_1.JumbotronComponent,
            world_map_component_1.WorldMapComponent,
            footer_component_1.FooterComponent,
            concept_component_1.ConceptComponent,
            gallery_component_1.GalleryComponent,
            booking_component_1.BookingComponent,
            sale_component_1.SaleComponent,
            contact_component_1.ContactComponent,
            page_not_found_component_1.PageNotFoundComponent,
            blob_component_1.BlobComponent,
            signup_component_1.SignupComponent,
            signin_component_1.SigninComponent,
            forgotten_component_1.ForgottenComponent,
            profile_component_1.ProfileComponent,
            file_upload_component_1.FileUploadComponent,
            validate_component_1.ValidateComponent,
            reset_component_1.ResetComponent,
            crypto_component_1.CryptoComponent
        ],
        bootstrap: [
            app_component_1.AppComponent,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map