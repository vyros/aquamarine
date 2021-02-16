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
// services
var message_service_1 = require("../../services/message.service");
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var ResetComponent = (function () {
    function ResetComponent(messageService, authService, userService, router, route) {
        this.messageService = messageService;
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.h2 = 'Réinitialisation du compte utilisateur';
        this.buttonDisabled = '';
        this.id = '';
        this.token = '';
        this.password1 = '';
        this.password2 = '';
        this.isError = false;
    }
    ResetComponent.prototype.ngOnInit = function () {
        this.getParams();
        this.getResetUser();
    };
    ResetComponent.prototype.reset = function () {
        this.messageService.clrMessages();
        this.chkPassword();
        this.setReset();
    };
    ResetComponent.prototype.getParams = function () {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
    };
    ResetComponent.prototype.getResetUser = function () {
        var _this = this;
        this.userService.getResetUser(this.id, this.token).subscribe(function (user) {
            if (!user) {
                _this.messageService.addError('Une erreur est survenue');
            }
            else {
                _this.messageService.addInfo('<strong>' + user.username
                    + '</strong>, veuillez saisir et confirmer votre nouveau mot de passe');
                _this.user = user;
            }
        });
    };
    ResetComponent.prototype.chkPassword = function () {
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
    ResetComponent.prototype.setReset = function () {
        var _this = this;
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            // password
            var CryptoJS_1 = require('crypto-js');
            var hash = CryptoJS_1.SHA3(this.password1).toString(CryptoJS_1.enc.Base64);
            this.user.password = hash;
            this.userService.setReset(this.user).subscribe(function (user) {
                _this.buttonDisabled = '';
                if (user) {
                    _this.authService.setAuthUser(user);
                    _this.router.navigate(['/world-map', { success: "Mot de passe réinitialisé avec succès<br>"
                                + "Vous avez été connecté automatiquement" }]);
                }
                else {
                    _this.messageService.addError("Une erreur est survenue");
                }
            }, function (err) {
                _this.buttonDisabled = '';
                console.log(err);
                var error = JSON.parse(err._body);
                _this.messageService.addError(error.msg);
            });
        }
        else {
            this.isError = false;
        }
    };
    return ResetComponent;
}());
ResetComponent = __decorate([
    core_1.Component({
        selector: 'reset',
        templateUrl: './reset.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService,
        user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute])
], ResetComponent);
exports.ResetComponent = ResetComponent;
//# sourceMappingURL=reset.component.js.map