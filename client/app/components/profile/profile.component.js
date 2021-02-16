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
var router_1 = require("@angular/router");
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var message_service_1 = require("../../services/message.service");
var ProfileComponent = (function () {
    function ProfileComponent(messageService, authService, router, userService) {
        this.messageService = messageService;
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        this.h2 = 'Profil utilisateur';
        this.buttonDisabled = '';
        this.isError = false;
        this.isReset = false;
        this.isDelete = false;
        this.passwordReset = '';
        this.password1 = '';
        this.password2 = '';
        this.passwordDelete = '';
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.clrMessages();
        this.authService.user$.subscribe(function (user) { return _this.user = user; });
        this.setAuthUser();
    };
    ProfileComponent.prototype.setAuthUser = function () {
        var _this = this;
        // difference?
        this.subscription = this.authService.getAuthUser().subscribe(function (user) {
            //        this.authService.getAuthUser().subscribe(user => {
            if (!user) {
                _this.messageService.addError('Aucun profil a afficher');
            }
            else {
                _this.user = user;
            }
        });
    };
    ProfileComponent.prototype.update = function () {
        this.messageService.clrMessages();
        this.trimInformations();
        //        this.chkInformations(); // if mandatory
        this.setUpdate();
    };
    ProfileComponent.prototype.setUpdate = function () {
        var _this = this;
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.update(this.user).subscribe(function (user) {
                _this.buttonDisabled = '';
                _this.messageService.addSuccess('Modifications enregistrées avec succès');
                _this.authService.setAuthUser(user);
            });
        }
        else {
            this.isError = false;
        }
    };
    ProfileComponent.prototype.chkCurrentPassword = function (password, check, callback) {
        var _this = this;
        // password
        var CryptoJS = require('crypto-js');
        var hash = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64);
        this.buttonDisabled = 'disabled';
        this.authService.isCurrentPassword(this.user.username, hash).subscribe(function (res) {
            _this.buttonDisabled = '';
            if (!res) {
                _this.isError = true;
                _this.messageService.addError('Mot de passe courant incorrect');
            }
            else {
                if (check) {
                    check(_this);
                }
                callback(_this);
            }
        });
    };
    ProfileComponent.prototype.chkNewPassword = function (_this) {
        if (_this.password1 !== _this.password2) {
            _this.isError = true;
            _this.messageService.addError('Mots de passe différents');
            _this.password1 = '';
            _this.password2 = '';
        }
        else if (_this.password1.length < 6) {
            _this.isError = true;
            _this.messageService.addError('Nouveau mot de passe trop court');
        }
    };
    ;
    ProfileComponent.prototype.reset = function () {
        this.isReset = !this.isReset;
    };
    ProfileComponent.prototype.resetConfirmed = function () {
        this.messageService.clrMessages();
        this.chkCurrentPassword(this.passwordReset, this.chkNewPassword, this.setReset);
    };
    ProfileComponent.prototype.setReset = function (_this) {
        if (!_this.isError) {
            _this.buttonDisabled = 'disabled';
            // password
            var CryptoJS_1 = require('crypto-js');
            var hash = CryptoJS_1.SHA3(_this.password1).toString(CryptoJS_1.enc.Base64);
            // service
            var user = _this.user;
            user.password = hash;
            _this.userService.update(user).subscribe(function (user) {
                _this.buttonDisabled = '';
                _this.passwordReset = '';
                _this.password1 = '';
                _this.password2 = '';
                _this.messageService.addSuccess('Mot de passe modifié avec succès');
                _this.authService.setAuthUser(user);
            });
        }
        else {
            _this.isError = false;
        }
    };
    ProfileComponent.prototype.delete = function () {
        this.isDelete = !this.isDelete;
    };
    ProfileComponent.prototype.deleteConfirmed = function () {
        this.messageService.clrMessages();
        this.chkCurrentPassword(this.passwordDelete, null, this.setDelete);
    };
    ProfileComponent.prototype.setDelete = function (_this) {
        if (!_this.isError) {
            _this.buttonDisabled = 'disabled';
            _this.userService.delete(this.user).subscribe(function (res) {
                _this.buttonDisabled = '';
                if (res) {
                    _this.buttonDisabled = '';
                    _this.authService.clrAuthUser();
                    _this.router.navigate(['/world-map', { success: "Compte utilisateur supprimé avec succès" }]);
                }
            });
        }
        else {
            _this.isError = false;
        }
    };
    ProfileComponent.prototype.trimInformations = function () {
        if (typeof this.user.firstName !== 'undefined')
            this.user.firstName = this.user.firstName.trim();
        if (typeof this.user.lastName !== 'undefined')
            this.user.lastName = this.user.lastName.trim();
        if (typeof this.user.website !== 'undefined')
            this.user.website = this.user.website.trim();
    };
    // if mandatory
    ProfileComponent.prototype.chkInformations = function () {
        // check with regex
        if (this.user.firstName.length < 3) {
            this.isError = true;
            this.messageService.addError('Prénom invalide');
        }
        if (this.user.lastName.length < 3) {
            this.isError = true;
            this.messageService.addError('Nom invalide');
        }
    };
    ProfileComponent.prototype.signout = function () {
        this.authService.getSignoutUser();
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService,
        router_1.Router,
        user_service_1.UserService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map