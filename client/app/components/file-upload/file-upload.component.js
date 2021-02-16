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
//import { Component, ElementRef, 
//    Input, ViewChild }                      from '@angular/core';
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// services
var message_service_1 = require("../../services/message.service");
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var FileUploadComponent = (function () {
    function FileUploadComponent(messageService, authService, userService, http) {
        this.messageService = messageService;
        this.authService = authService;
        this.userService = userService;
        this.http = http;
        this.accept = 'image/*';
        this.multiple = false;
    }
    FileUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.user$.subscribe(function (user) { return _this.user = user; });
    };
    FileUploadComponent.prototype.upload = function (event) {
        var _this = this;
        this.messageService.clrMessages();
        var fileList = event.target.files;
        if (fileList.length) {
            var file = void 0;
            var formData = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                file = fileList[i];
                formData.append('file', file, file.name);
            }
            //            this.userService.profile(formData).subscribe(user => {
            //                if (user) {
            //                    this.messageService.addSuccess('Téléversement réussi');
            //                    this.authService.setAuthUser(user);
            //                }
            //            });
            var headers = new http_1.Headers();
            headers.append('Accept', 'application/json');
            var options = new http_1.RequestOptions({ headers: headers });
            this.http
                .post('api/user/profile', formData, { headers: headers }).subscribe(function (user) {
                if (user) {
                    //                        let newUser = new User(user);
                    _this.messageService.addSuccess('Téléversement réussi');
                    //                        this.user = user._body;
                    _this.authService.setAuthUser(JSON.parse(user["_data"]));
                }
            });
        }
    };
    return FileUploadComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUploadComponent.prototype, "accept", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUploadComponent.prototype, "multiple", void 0);
FileUploadComponent = __decorate([
    core_1.Component({
        selector: 'file-upload',
        template: '<input type="file" [multiple]="multiple" [accept]="accept" />'
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService,
        user_service_1.UserService, http_1.Http])
], FileUploadComponent);
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map