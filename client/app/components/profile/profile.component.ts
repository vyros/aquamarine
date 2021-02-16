import { Component, OnInit, Input,
    Output, EventEmitter }      from '@angular/core';
import { Router }               from '@angular/router'

// services
import { Subscription }         from 'rxjs/Subscription';
import { AuthService }          from '../../services/auth.service';
import { UserService }          from '../../services/user.service';
import { MessageService }       from '../../services/message.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [ UserService ]
})

export class ProfileComponent implements OnInit {
    
    h2: String = 'Profil utilisateur';
    buttonDisabled: String = '';
    subscription: Subscription;
    isError: Boolean = false;
    isReset:Boolean = false;
    isDelete:Boolean = false;
    user: User;
    
    passwordReset: String = '';
    password1: String = '';
    password2: String = '';
    passwordDelete: String = '';
    
    constructor(private messageService:MessageService,
        private authService:AuthService,
        private router: Router,
        private userService:UserService) { }
    
    ngOnInit() {
        this.messageService.clrMessages();
        this.authService.user$.subscribe(user => this.user = user);
        this.setAuthUser();
    }
    
    setAuthUser() {
        // difference?
        this.subscription = this.authService.getAuthUser().subscribe(user => {
//        this.authService.getAuthUser().subscribe(user => {
            if (!user) {
                this.messageService.addError('Aucun profil a afficher');
            } else {
                this.user = user;
            }
        });
    }
    
    update() {
        this.messageService.clrMessages();
        this.trimInformations();
//        this.chkInformations(); // if mandatory
        this.setUpdate();
    }
    
    setUpdate() {
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.update(this.user).subscribe(user => {
                this.buttonDisabled = '';
                this.messageService.addSuccess('Modifications enregistrées avec succès');
                this.authService.setAuthUser(user);
            });
            //TODO Uncatch & enble on error
        } else {
            this.isError = false;
        }
    }
    
    chkCurrentPassword(password, check, callback) {
        // password
        let CryptoJS = require('crypto-js');
        let hash = CryptoJS.SHA3(password).toString(CryptoJS.enc.Base64);
        
        this.buttonDisabled = 'disabled';
        this.authService.isCurrentPassword(this.user.username, hash).subscribe(res => {
            this.buttonDisabled = '';

            if (!res) {
                this.isError = true;
                this.messageService.addError('Mot de passe courant incorrect');
            } else {
                if(check) {
                    check(this);
                }
                callback(this);
            }
        });
    }
    
    chkNewPassword(_this) {
        if (_this.password1 !== _this.password2) {
            _this.isError = true;
            _this.messageService.addError('Mots de passe différents');
            _this.password1 = '';
            _this.password2 = '';

        } else if (_this.password1.length < 6) {
            _this.isError = true;
            _this.messageService.addError('Nouveau mot de passe trop court');
        }
    };
    
    reset() {
        this.isReset = !this.isReset;
    }
    
    resetConfirmed() {
        this.messageService.clrMessages();
        this.chkCurrentPassword(this.passwordReset, this.chkNewPassword, this.setReset);
    }
    
    setReset(_this) {
        if (!_this.isError) {
            _this.buttonDisabled = 'disabled';

            // password
            let CryptoJS = require('crypto-js');
            let hash = CryptoJS.SHA3(_this.password1).toString(CryptoJS.enc.Base64);

            // service
            var user = _this.user;
            user.password = hash;
            
            _this.userService.update(user).subscribe(user => {
                _this.buttonDisabled = '';
                _this.passwordReset = '';
                _this.password1 = '';
                _this.password2 = '';
                _this.messageService.addSuccess('Mot de passe modifié avec succès');
                _this.authService.setAuthUser(user);
            });
        } else {
            _this.isError = false;
        }
    }
    
    delete() {
        this.isDelete = !this.isDelete;
    }
    
    deleteConfirmed() {
        this.messageService.clrMessages();
        this.chkCurrentPassword(this.passwordDelete, null, this.setDelete);
    }
    
    setDelete(_this) {
        if (!_this.isError) {
            _this.buttonDisabled = 'disabled';
            _this.userService.delete(this.user).subscribe(res => {
                _this.buttonDisabled = '';
                if (res) {
                    _this.buttonDisabled = '';
                    _this.authService.clrAuthUser();
                    _this.router.navigate(['/world-map', {success: "Compte utilisateur supprimé avec succès"}]);
                }
            });
            //TODO Uncatch & enble on error
        } else {
            _this.isError = false;
        }
    }
    
    trimInformations() {
        if (typeof this.user.firstName !== 'undefined')
            this.user.firstName = this.user.firstName.trim();
        
        if (typeof this.user.lastName !== 'undefined')
            this.user.lastName = this.user.lastName.trim();
        
        if (typeof this.user.website !== 'undefined')
            this.user.website = this.user.website.trim();
    }
    
    // if mandatory
    chkInformations() {
        // check with regex
        if (this.user.firstName.length < 3) {
            this.isError = true;
            this.messageService.addError('Prénom invalide');
        }
        if (this.user.lastName.length < 3) {
            this.isError = true;
            this.messageService.addError('Nom invalide');
        }
    }
    
    signout() {
        this.authService.getSignoutUser();
    }
}
