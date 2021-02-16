import { Component, OnInit }        from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Title }                    from '@angular/platform-browser';

import {
    Router,
    ActivatedRoute,
    Params,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
}                                   from '@angular/router'

// cookie law
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { CookieLawModule }          from 'angular2-cookie-law';

// services
import { NgProgressService }        from 'ng2-progressbar';  // ng2ProgressBar
import { MessageService }           from './services/message.service';
import { AuthService }              from './services/auth.service';

// model
import { User }                     from './models/user/user.model';

@Component({
    moduleId: module.id,
    selector: 'lbwt',
    templateUrl: 'app.component.html',
    styleUrls: [],
    providers: [ MessageService, AuthService ] 
})

export class AppComponent implements OnInit {
//    @ViewChild('cookieLaw');                                                      // Cookie law
//    cookieLawEl: any;                                                             // Cookie law
//    cookieLawSeen: boolean;                                                       // Cookie law
    
    title: String               = 'benjardin.fr';
    progressColor: String       = 'white';
    progressSpinner: Boolean    = false;
    user: User;
    
    /*
     * Message handler
     */
    successes: String[] = [];
    errors: String[] = [];
    infos: String[] = [];
    
    constructor(private progressService: NgProgressService,
        private messageService:MessageService,
        private authService:AuthService, private http:Http,
        private router: Router, private route: ActivatedRoute) { }
    
    ngOnInit() {
        this.subMessageService();
        this.authService.user$.subscribe(user => this.user = user);
        this.setProgressBar();
        this.setAuthUser();
    }
    
    subMessageService() {
        this.messageService.successes$.subscribe(msg => {
            if (typeof msg !== 'undefined') {
                this.successes.push(msg)
            } else {
                this.successes = [];
            }
        });
        this.messageService.errors$.subscribe(msg => {
            if (typeof msg !== 'undefined') {
                this.errors.push(msg)
            } else {
                this.errors = [];
            }
        });
        this.messageService.infos$.subscribe(msg => {
            if (typeof msg !== 'undefined') {
                this.infos.push(msg)
            } else {
                this.infos = [];
            }
        });
    }
    
    clrSuccesses() {
        this.successes = [];
    }
    
    clrErrors() {
        this.errors = [];
    }
    
    clrInfos() {
        this.infos = [];
    }
    
    setProgressBar() {
        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }
    
    setAuthUser() {
        this.authService.getAuthUser().subscribe(user => {
            this.authService.setAuthUser(user);
        });
    }
    
//    // from profile
//    onUserUpdated(user: User) {
//        console.log(user);
//        this.user = user;
//    }
    
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.progressService.start();
        }
        if (event instanceof NavigationEnd 
                || event instanceof NavigationCancel 
                || event instanceof NavigationError) {
            this.progressService.done()
        }
    }

    getAuthUser(): User {
        return this.user;
    }

    getFullName(): String {
        if (this.user) {
            return this.user.fullName;
        }
    }
    
    getTitle(): String {
        return this.title;
    }

    getProgressColor(): String {
        return this.progressColor;
    }

    getProgressSpinner(): Boolean {
        return this.progressSpinner;
    }
    
//    // Cookie law
//    ngOnInit() {
//        this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
//    }
//
//    // Cookie law
//    dismiss(): void {
//        this.cookieLawEl.dismiss();
//    }
}