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
var blob_service_1 = require("../../services/blob.service");
var message_service_1 = require("../../services/message.service");
var BlobComponent = (function () {
    function BlobComponent(messageService, blobService) {
        this.messageService = messageService;
        this.blobService = blobService;
        this.h2 = 'Blob';
    }
    BlobComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
        this.setBlobs();
    };
    // Asynchronous observable version
    BlobComponent.prototype.setBlobs = function () {
        var _this = this;
        this.blobService.getBlobs().subscribe(function (blobs) {
            _this.blobs = blobs;
        });
    };
    BlobComponent.prototype.addBlob = function (event) {
        var _this = this;
        event.preventDefault();
        var newBlob = {
            name: this.name,
            badge: 0,
            dob: Date.now,
            isLoved: false
        };
        this.blobService.addBlob(newBlob).subscribe(function (blob) {
            _this.blobs.push(blob);
            _this.name = '';
        });
    };
    BlobComponent.prototype.deleteBlob = function (id) {
        var blobs = this.blobs;
        this.blobService.deleteBlob(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < blobs.length; i++) {
                    if (blobs[i]._id == id) {
                        blobs.splice(i, 1);
                    }
                }
            }
        });
    };
    BlobComponent.prototype.updateLoved = function (blob) {
        var _blob = {
            _id: blob._id,
            name: blob.name,
            badge: blob.badge,
            dob: blob.dob,
            isLoved: !blob.isLoved
        };
        this.blobService.updateLoved(_blob).subscribe(function (data) {
            blob.isLoved = !blob.isLoved;
        });
    };
    return BlobComponent;
}());
BlobComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'blob',
        templateUrl: 'blob.component.html',
        providers: [blob_service_1.BlobService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        blob_service_1.BlobService])
], BlobComponent);
exports.BlobComponent = BlobComponent;
//# sourceMappingURL=blob.component.js.map