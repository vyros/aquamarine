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
var GalleryComponent = (function () {
    function GalleryComponent(messageService) {
        this.messageService = messageService;
        this.h2 = 'Galerie';
    }
    GalleryComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
    };
    return GalleryComponent;
}());
GalleryComponent = __decorate([
    core_1.Component({
        selector: 'gallery',
        templateUrl: './gallery.component.html',
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], GalleryComponent);
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=gallery.component.js.map