"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
// services
var ng2_progressbar_1 = require("ng2-progressbar"); // ng2ProgressBar
var message_service_1 = require("./services/message.service");
var auth_service_1 = require("./services/auth.service");
var AppComponent = (function () {
    function AppComponent(progressService, messageService, authService, http, router, route) {
        this.progressService = progressService;
        this.messageService = messageService;
        this.authService = authService;
        this.http = http;
        this.router = router;
        this.route = route;
        //    @ViewChild('cookieLaw');                                                      // Cookie law
        //    cookieLawEl: any;                                                             // Cookie law
        //    cookieLawSeen: boolean;                                                       // Cookie law
        this.title = 'benjardin.fr';
        this.progressColor = 'white';
        this.progressSpinner = false;
        /*
         * Message handler
         */
        this.successes = [];
        this.errors = [];
        this.infos = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subMessageService();
        this.authService.user$.subscribe(function (user) { return _this.user = user; });
        this.setProgressBar();
        this.setAuthUser();
    };
    AppComponent.prototype.subMessageService = function () {
        var _this = this;
        this.messageService.successes$.subscribe(function (msg) {
            if (typeof msg !== 'undefined') {
                _this.successes.push(msg);
            }
            else {
                _this.successes = [];
            }
        });
        this.messageService.errors$.subscribe(function (msg) {
            if (typeof msg !== 'undefined') {
                _this.errors.push(msg);
            }
            else {
                _this.errors = [];
            }
        });
        this.messageService.infos$.subscribe(function (msg) {
            if (typeof msg !== 'undefined') {
                _this.infos.push(msg);
            }
            else {
                _this.infos = [];
            }
        });
    };
    AppComponent.prototype.clrSuccesses = function () {
        this.successes = [];
    };
    AppComponent.prototype.clrErrors = function () {
        this.errors = [];
    };
    AppComponent.prototype.clrInfos = function () {
        this.infos = [];
    };
    AppComponent.prototype.setProgressBar = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    };
    AppComponent.prototype.setAuthUser = function () {
        var _this = this;
        this.authService.getAuthUser().subscribe(function (user) {
            _this.authService.setAuthUser(user);
        });
    };
    //    // from profile
    //    onUserUpdated(user: User) {
    //        console.log(user);
    //        this.user = user;
    //    }
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            this.progressService.start();
        }
        if (event instanceof router_1.NavigationEnd
            || event instanceof router_1.NavigationCancel
            || event instanceof router_1.NavigationError) {
            this.progressService.done();
        }
    };
    AppComponent.prototype.getAuthUser = function () {
        return this.user;
    };
    AppComponent.prototype.getFullName = function () {
        if (this.user) {
            return this.user.fullName;
        }
    };
    AppComponent.prototype.getTitle = function () {
        return this.title;
    };
    AppComponent.prototype.getProgressColor = function () {
        return this.progressColor;
    };
    AppComponent.prototype.getProgressSpinner = function () {
        return this.progressSpinner;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'lbwt',
        templateUrl: 'app.component.html',
        styleUrls: [],
        providers: [message_service_1.MessageService, auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService,
        message_service_1.MessageService,
        auth_service_1.AuthService, http_1.Http,
        router_1.Router, router_1.ActivatedRoute])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map