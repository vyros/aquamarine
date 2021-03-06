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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// service
var message_service_1 = require("./message.service");
// mock
var wineyard_mock_1 = require("../mocks/wineyard/wineyard.mock");
var WineyardService = (function () {
    function WineyardService(messageService, http) {
        this.messageService = messageService;
        this.http = http;
        this.wineyardUrl = 'api/wineyard/';
    }
    // Asynchronous promise version
    WineyardService.prototype.getWineyards = function () {
        // Promise resolved with mock wineyards is returned.
        return Promise.resolve(wineyard_mock_1.WINEYARDS);
        //        // Promise resolved with http wineyards is returned.
        //        return this.http.get(this.wineyardsUrl)
        //            .toPromise()
        //            .then(response => response.json().data as Wineyard[])
        //            .catch(this.handleError);
    };
    WineyardService.prototype.getWineyardsSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 5 second delay.
            setTimeout(function () { return resolve(_this.getWineyards()); }, 5000);
        });
    };
    WineyardService.prototype.handleError = function (error) {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return WineyardService;
}());
WineyardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService, http_1.Http])
], WineyardService);
exports.WineyardService = WineyardService;
//# sourceMappingURL=wineyard.service.js.map