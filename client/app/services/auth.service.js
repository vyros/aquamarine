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
// RxJS
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// service
var message_service_1 = require("./message.service");
//import { USER }                     from '../mocks/user.mock'; //testing
var AuthService = (function () {
    function AuthService(messageService, http) {
        this.messageService = messageService;
        this.http = http;
        this.authUrl = 'auth/user/';
        this.passwordUrl = 'auth/password/';
        this.signinUrl = 'auth/signin/';
        this.signoutUrl = 'auth/signout/';
        // observable user source
        this.userSource = new Subject_1.Subject();
        // observable user stream
        this.user$ = this.userSource.asObservable();
    }
    AuthService.prototype.getAuthUser = function () {
        return this.http
            .get(this.authUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.setAuthUser = function (user) {
        this.userSource.next(user);
    };
    // danger, all in req.user
    AuthService.prototype.clrAuthUser = function () {
        this.userSource.next();
    };
    AuthService.prototype.isCurrentPassword = function (username, password) {
        var object = {
            'username': username,
            'password': password
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.passwordUrl, JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getSigninUser = function (username, password) {
        var object = {
            'username': username,
            'password': password
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.signinUrl, JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); });
        //                .catch(this.handleError);
    };
    AuthService.prototype.getSignoutUser = function () {
        return this.http
            .get(this.signoutUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // client error handler
    AuthService.prototype.handleError = function (error) {
        // For demo purposes only.
        console.error('An error occurred', error);
        //        return Observable.throw(error.message || error);
        return new Observable_1.Observable();
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService, http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map