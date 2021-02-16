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
var user_service_1 = require("../../services/user.service");
var ForgottenComponent = (function () {
    function ForgottenComponent(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
        this.h2 = 'Mot de passe oublié';
        this.buttonDisabled = '';
        this.email = '';
        this.isError = false;
    }
    ForgottenComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
    };
    ForgottenComponent.prototype.forgotten = function (event) {
        event.preventDefault();
        this.messageService.clrMessages();
        this.chkAccount();
    };
    ForgottenComponent.prototype.setRetrieve = function () {
        var _this = this;
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.setEmailRetriever(this.email).subscribe(function (res) {
                _this.buttonDisabled = '';
                if (res) {
                    _this.messageService.addSuccess("Modalité envoyée à l'adresse <strong>"
                        + _this.email + "</strong>");
                }
            }, function (err) {
                _this.buttonDisabled = '';
                var error = JSON.parse(err._body);
                _this.messageService.addError(error.msg);
            });
        }
        else {
            this.isError = false;
        }
    };
    ForgottenComponent.prototype.chkAccount = function () {
        var _this = this;
        //TODO check other errors from api
        this.buttonDisabled = 'disabled';
        this.userService.getForgottenUser(this.email).subscribe(function (user) {
            _this.buttonDisabled = '';
            if (!user) {
                _this.isError = true;
                _this.messageService.addError("Email inexistant");
            }
            else if (!user.activated) {
                _this.isError = true;
                _this.messageService.addError("Compte utilisateur <strong>inactif</strong>");
                _this.messageService.addError("Veuillez contacter l'administrateur");
            }
            else if (!user.validated) {
                _this.isError = true;
                _this.messageService.addError("Compte utilisateur <strong>non validé</strong>");
                _this.messageService.addError("Veuillez vérifier votre boîte mail <strong>"
                    + _this.email + "</strong> pour confirmer l'inscription");
            }
            else if (user.reset) {
                _this.isError = true;
                _this.messageService.addError("Ce compte utilisateur est déjà en attente de réinitialisation");
                _this.messageService.addError("Veuillez vérifier votre boîte mail <strong>"
                    + _this.email + "</strong>");
            }
            else if (user.provider !== 'local') {
                _this.isError = true;
                _this.messageService.addError("Connectez-vous via <strong>"
                    + user.provider + "</strong>");
            }
            _this.setRetrieve();
        }, function (err) {
            _this.isError = true;
            _this.buttonDisabled = '';
            var error = JSON.parse(err._body);
            _this.messageService.addError(error.msg);
        });
    };
    return ForgottenComponent;
}());
ForgottenComponent = __decorate([
    core_1.Component({
        selector: 'forgotten',
        templateUrl: './forgotten.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        user_service_1.UserService])
], ForgottenComponent);
exports.ForgottenComponent = ForgottenComponent;
//# sourceMappingURL=forgotten.component.js.map