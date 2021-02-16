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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// service
var message_service_1 = require("./message.service");
var UserService = (function () {
    function UserService(messageService, http) {
        this.messageService = messageService;
        this.http = http;
        this.userUrl = 'api/user/';
    }
    UserService.prototype.isUsernameExists = function (username) {
        var object = { 'username': username };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'isUsernameExists', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.isEmailExists = function (email) {
        var object = { 'email': email };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'isEmailExists', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.isFakeDomain = function (email) {
        var object = { 'email': email };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'isFakeDomain', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getForgottenUser = function (email) {
        var object = { 'email': email };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'getForgottenUser', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getValidatedUser = function (id, token) {
        var object = { 'id': id, 'token': token };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'getValidatedUser', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getResetUser = function (id, token) {
        var object = { 'id': id, 'token': token };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'getResetUser', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.setReset = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.userUrl + 'reset', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
        //                .catch(this.handleError);
    };
    UserService.prototype.setEmailRetriever = function (email) {
        var object = { 'email': email };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'setEmailRetriever', JSON.stringify(object), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.create = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.userUrl, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (user) {
        return this.http
            .delete(this.userUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.profile = function (formData) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.userUrl + 'profile', formData, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService, http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map