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
// RxJS
var Subject_1 = require("rxjs/Subject");
var MessageService = (function () {
    function MessageService() {
        // observable source
        this.successesSrc = new Subject_1.Subject();
        this.errorsSrc = new Subject_1.Subject();
        this.infosSrc = new Subject_1.Subject();
        // observable streams
        this.successes$ = this.successesSrc.asObservable();
        this.errors$ = this.errorsSrc.asObservable();
        this.infos$ = this.infosSrc.asObservable();
    }
    MessageService.prototype.addSuccess = function (msg) {
        this.successesSrc.next(msg);
    };
    MessageService.prototype.clrSuccesses = function () {
        this.successesSrc.next();
    };
    MessageService.prototype.addError = function (msg) {
        this.errorsSrc.next(msg);
    };
    MessageService.prototype.clrErrors = function () {
        this.errorsSrc.next();
    };
    MessageService.prototype.addInfo = function (msg) {
        this.infosSrc.next(msg);
    };
    MessageService.prototype.clrInfos = function () {
        this.infosSrc.next();
    };
    MessageService.prototype.clrMessages = function () {
        this.clrSuccesses();
        this.clrErrors();
        this.clrInfos();
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map