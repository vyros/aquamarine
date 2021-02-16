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
var ValidateComponent = (function () {
    function ValidateComponent(messageService, authService, userService, router, route) {
        this.messageService = messageService;
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.h2 = 'Validation du compte utilisateur';
        this.buttonDisabled = '';
        this.id = '';
        this.token = '';
        this.username = '';
        this.password = '';
        this.isError = false;
    }
    ValidateComponent.prototype.ngOnInit = function () {
        this.getParams();
        this.getValidatedUser();
    };
    ValidateComponent.prototype.getParams = function () {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
    };
    ValidateComponent.prototype.getValidatedUser = function () {
        var _this = this;
        this.userService.getValidatedUser(this.id, this.token).subscribe(function (user) {
            if (!user) {
                _this.messageService.addError('Une erreur est survenue');
            }
            else {
                _this.messageService.addSuccess('<strong>' + user.username
                    + '</strong>, votre compte a été validé avec succès');
                _this.messageService.addSuccess('Vous pouvez maintenant vous connecter');
            }
        });
    };
    ValidateComponent.prototype.validate = function () {
        this.chkCombination();
        this.setSignin();
    };
    ValidateComponent.prototype.chkCombination = function () {
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
    ValidateComponent.prototype.setSignin = function () {
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
                    _this.authService.setAuthUser(user);
                    _this.router.navigate(['/']);
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
    return ValidateComponent;
}());
ValidateComponent = __decorate([
    core_1.Component({
        selector: 'validate',
        templateUrl: './validate.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService,
        user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute])
], ValidateComponent);
exports.ValidateComponent = ValidateComponent;
//# sourceMappingURL=validate.component.js.map