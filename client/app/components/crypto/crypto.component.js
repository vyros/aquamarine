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
// services
var message_service_1 = require("../../services/message.service");
var CryptoComponent = (function () {
    function CryptoComponent(messageService) {
        this.messageService = messageService;
        this.h2 = 'Crypto';
        this.message = 'Message a crypter';
        this.hashContext = '';
        this.hashHex = '';
        this.hashBase64 = '';
        this.hashLatin1 = '';
        this.progressive1 = '';
        this.progressive2 = '';
        this.progressive3 = '';
        this.progressiveFinale = '';
    }
    CryptoComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
    };
    CryptoComponent.prototype.doHash = function (event) {
        event.preventDefault();
        var CryptoJS = require("crypto-js");
        var hash = CryptoJS.SHA256(this.message);
        this.hashContext = hash;
        this.hashHex = hash.toString(CryptoJS.enc.Hex);
        this.hashBase64 = hash.toString(CryptoJS.enc.Base64);
        this.hashLatin1 = hash.toString(CryptoJS.enc.Latin1);
    };
    CryptoComponent.prototype.doProgressive = function (event) {
        event.preventDefault();
        var CryptoJS = require("crypto-js");
        var sha256 = CryptoJS.algo.SHA256.create();
        this.progressive1 = sha256.update(this.message + ' part 1');
        console.log(this.progressive1);
        this.progressive2 = sha256.update(this.message + ' part 2');
        console.log(this.progressive2);
        this.progressive3 = sha256.update(this.message + ' part 3');
        console.log(this.progressive3);
        this.progressiveFinale = sha256.finalize();
    };
    return CryptoComponent;
}());
CryptoComponent = __decorate([
    core_1.Component({
        selector: 'crypto',
        templateUrl: './crypto.component.html',
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], CryptoComponent);
exports.CryptoComponent = CryptoComponent;
//# sourceMappingURL=crypto.component.js.map