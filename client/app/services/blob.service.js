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
var BlobService = (function () {
    function BlobService(http) {
        this.http = http;
        this.blobUrl = 'api/blob/';
        console.log('Blob Service initialized...');
    }
    // Asynchronous observable version
    BlobService.prototype.getBlobs = function () {
        return this.http
            .get(this.blobUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlobService.prototype.addBlob = function (newBlob) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.blobUrl, JSON.stringify(newBlob), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlobService.prototype.deleteBlob = function (id) {
        return this.http
            .delete(this.blobUrl + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlobService.prototype.updateLoved = function (blob) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.blobUrl + blob._id, JSON.stringify(blob), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BlobService.prototype.handleError = function (error) {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.message || error);
    };
    return BlobService;
}());
BlobService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BlobService);
exports.BlobService = BlobService;
//# sourceMappingURL=blob.service.js.map