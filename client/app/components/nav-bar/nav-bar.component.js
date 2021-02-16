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
var auth_service_1 = require("../../services/auth.service");
var message_service_1 = require("../../services/message.service");
var NavBarComponent = (function () {
    function NavBarComponent(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
        this.buttonDisabled = '';
        this.isError = false;
        this.username = '';
        this.password = '';
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.user$.subscribe(function (user) { return _this.user = user; });
    };
    NavBarComponent.prototype.chkCombination = function () {
        //TODO check with regex
        var frmUsername = this.username.trim();
        if (frmUsername.length === 0) {
            this.isError = true;
            this.messageService.addError('Veuilliez saisir un utilisateur');
        }
        if (this.password.length === 0) {
            this.isError = true;
            this.messageService.addError('Veuilliez saisir un mot de passe');
        }
    };
    NavBarComponent.prototype.clrCombination = function () {
        this.username = '';
        this.password = '';
    };
    NavBarComponent.prototype.signin = function () {
        this.messageService.clrMessages();
        this.chkCombination();
        this.setSignin();
    };
    NavBarComponent.prototype.setSignin = function () {
        var _this = this;
        if (!this.isError) {
            var frmUsername = this.username.trim();
            this.buttonDisabled = 'disabled';
            // password
            var CryptoJS_1 = require('crypto-js');
            var hash = CryptoJS_1.SHA3(this.password).toString(CryptoJS_1.enc.Base64);
            this.authService.getSigninUser(frmUsername, hash).subscribe(function (user) {
                _this.buttonDisabled = '';
                if (!user.activated) {
                    _this.messageService.addError("Compte utilisateur inactif!");
                    _this.messageService.addError("Veuillez contacter l'administrateur");
                }
                else if (!user.validated) {
                    _this.messageService.addError("Compte utilisateur non validé!");
                    _this.messageService.addError("Veuillez vérifier votre boîte mail <strong>"
                        + user.email + "</strong> pour confirmer l'inscription");
                }
                else {
                    _this.clrCombination();
                    console.log(_this.user);
                    _this.authService.setAuthUser(user);
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
    NavBarComponent.prototype.signout = function () {
        var _this = this;
        this.messageService.clrMessages();
        this.authService.getSignoutUser().subscribe(function (res) {
            if (res) {
                _this.authService.clrAuthUser();
            }
        });
        //        this.subscription = this.authService.getSignoutUser.subscribe(
        //            user => {
        //                this.user = user; 
        //        });
    };
    return NavBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NavBarComponent.prototype, "title", void 0);
NavBarComponent = __decorate([
    core_1.Component({
        selector: 'nav-bar',
        templateUrl: './nav-bar.component.html',
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService])
], NavBarComponent);
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=nav-bar.component.js.map