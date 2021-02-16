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
var message_service_1 = require("../../services/message.service");
var user_service_1 = require("../../services/user.service");
var SignupComponent = (function () {
    function SignupComponent(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
        this.h2 = 'Créer un compte utilisateur local';
        this.buttonDisabled = '';
        this.isUsernameExists = false;
        this.isEmailExists = false;
        this.isUsernameResolved = false;
        this.isEmailResolved = false;
        this.isFakeResolved = false;
        this.isError = false;
        // tmpUser
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
        this.password1 = '';
        this.password2 = '';
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
    };
    SignupComponent.prototype.signup = function () {
        this.clrNewUser();
        this.messageService.clrMessages();
        this.trimInformations();
        this.chkInformations();
        this.chkAccount();
    };
    SignupComponent.prototype.setCreate = function () {
        var _this = this;
        if (this.isUsernameResolved && this.isEmailResolved && this.isFakeResolved) {
            this.clrResolved();
            if (!this.isError) {
                // password
                var CryptoJS_1 = require('crypto-js');
                var hash = CryptoJS_1.SHA3(this.password1).toString(CryptoJS_1.enc.Base64);
                this.tmpUser = {
                    username: this.username,
                    email: this.email,
                    password: hash
                };
                this.userService.create(this.tmpUser).subscribe(function (user) {
                    _this.buttonDisabled = '';
                    _this.clrInformations();
                    _this.newUser = user;
                    var msg = "Votre compte utilisateur <strong>"
                        + _this.newUser.username + "</strong> a été créé avec succès, vérifiez votre boîte mail <strong>"
                        + _this.newUser.email + "</strong> pour confirmer l'inscription";
                    _this.messageService.addSuccess(msg);
                }, function (err) {
                    _this.buttonDisabled = '';
                    var error = JSON.parse(err._body);
                    _this.messageService.addError(error.msg);
                });
            }
            else {
                this.isError = false;
                this.buttonDisabled = '';
            }
        }
    };
    SignupComponent.prototype.encPassword = function (password) {
    };
    SignupComponent.prototype.clrNewUser = function () {
        this.newUser = undefined;
    };
    SignupComponent.prototype.clrErrors = function () {
        this.isError = false;
        this.messageService.clrErrors();
    };
    SignupComponent.prototype.clrResolved = function () {
        this.isUsernameResolved = false;
        this.isEmailResolved = false;
        this.isFakeResolved = false;
    };
    SignupComponent.prototype.clrInformations = function () {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
        this.password1 = '';
        this.password2 = '';
    };
    SignupComponent.prototype.trimInformations = function () {
        this.firstName = this.firstName.trim();
        this.lastName = this.lastName.trim();
        this.email = this.email.trim();
        this.username = this.username.trim();
    };
    SignupComponent.prototype.chkInformations = function () {
        //TODO check with regex
        if (this.username.length < 3) {
            this.isError = true;
            this.messageService.addError("Utilisateur invalide");
        }
        //TODO check with regex
        if (this.email.length < 3) {
            this.isError = true;
            this.messageService.addError("Email invalide");
        }
        if (this.password1 !== this.password2) {
            this.isError = true;
            this.messageService.addError("Mots de passe différents");
            this.password1 = '';
            this.password2 = '';
        }
        else if (this.password1.length < 6) {
            this.isError = true;
            this.messageService.addError("Mot de passe trop court");
        }
    };
    SignupComponent.prototype.chkAccount = function () {
        var _this = this;
        //TODO check other errors from api
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.isUsernameExists(this.username).subscribe(function (res) {
                _this.isUsernameResolved = true;
                if (res) {
                    _this.isError = true;
                    _this.messageService.addError("Utilisateur existant");
                }
                _this.setCreate();
            });
            this.userService.isEmailExists(this.email).subscribe(function (res) {
                _this.isEmailResolved = true;
                if (res) {
                    _this.isError = true;
                    _this.messageService.addError("Email existant");
                }
                _this.setCreate();
            });
            this.userService.isFakeDomain(this.email).subscribe(function (res) {
                _this.isFakeResolved = true;
                if (res) {
                    _this.isError = true;
                    _this.messageService.addError("Email non autorisé");
                }
                _this.setCreate();
            });
        }
        else {
            this.isError = false;
        }
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: './signup.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        user_service_1.UserService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map