import { Component, OnInit }    from '@angular/core';
import * as CryptoJS            from 'crypto-js/';
 
// service
import { AuthService }          from '../../services/auth.service';
import { MessageService }       from '../../services/message.service';
import { UserService }          from '../../services/user.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    providers: [ UserService ]
})

export class SignupComponent implements OnInit {
    
    h2: String = 'Créer un compte utilisateur local';
    buttonDisabled: String = '';
    isUsernameExists: Boolean = false;
    isEmailExists: Boolean = false;
    isUsernameResolved: Boolean = false;
    isEmailResolved: Boolean = false;
    isFakeResolved: Boolean = false;
    isError: Boolean = false;
    tmpUser: Object;
    newUser: User;

    // tmpUser
    firstName: String = '';
    lastName: String = '';
    email: String = '';
    username: String = '';
    password1: String = '';
    password2: String = '';

    constructor(private messageService:MessageService,
        private userService:UserService) { }
    
    ngOnInit() {
        this.messageService.clrMessages();
    }
    
    signup() {
        this.clrNewUser();
        this.messageService.clrMessages();
        this.trimInformations();
        this.chkInformations();
        this.chkAccount();
    }
    
    setCreate() {
        if (this.isUsernameResolved && this.isEmailResolved && this.isFakeResolved) {
            this.clrResolved();
            if (!this.isError) {
                
                // password
                let CryptoJS = require('crypto-js');
                let hash = CryptoJS.SHA3(this.password1).toString(CryptoJS.enc.Base64);

                this.tmpUser = {
                    username: this.username,
                    email: this.email,
                    password: hash
                };
                
                this.userService.create(this.tmpUser).subscribe(user => {
                    this.buttonDisabled = '';
                    this.clrInformations();
                    this.newUser = user;
                    var msg = "Votre compte utilisateur <strong>" 
                            + this.newUser.username + "</strong> a été créé avec succès, vérifiez votre boîte mail <strong>" 
                            + this.newUser.email + "</strong> pour confirmer l'inscription";
                    this.messageService.addSuccess(msg);
                }, err => {
                    this.buttonDisabled = '';
                    var error = JSON.parse(err._body);
                    this.messageService.addError(error.msg);
                });
            } else {
                this.isError = false;
                this.buttonDisabled = '';
            }
        }
    }
    
    encPassword(password) {

    }
    
    clrNewUser() {
        this.newUser = undefined;
    }
    
    clrErrors() {
        this.isError = false;
        this.messageService.clrErrors();
    }
    
    clrResolved() {
        this.isUsernameResolved = false;
        this.isEmailResolved = false;
        this.isFakeResolved = false;
    }
    
    clrInformations() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
        this.password1 = '';
        this.password2 = '';
    }
        
    trimInformations() {
        this.firstName = this.firstName.trim();
        this.lastName = this.lastName.trim();
        this.email = this.email.trim();
        this.username = this.username.trim();
    }
    
    chkInformations() {
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
            
        } else if (this.password1.length < 6) {
            this.isError = true;
            this.messageService.addError("Mot de passe trop court");
        }      
    }
    
    chkAccount() {
        //TODO check other errors from api
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.isUsernameExists(this.username).subscribe(res => {
                this.isUsernameResolved = true;
                if (res) {
                    this.isError = true;
                    this.messageService.addError("Utilisateur existant");
                }
                this.setCreate();
            });
            this.userService.isEmailExists(this.email).subscribe(res => {
                this.isEmailResolved = true;
                if (res) {
                    this.isError = true;
                    this.messageService.addError("Email existant");
                }
                this.setCreate();
            });
            this.userService.isFakeDomain(this.email).subscribe(res => {
                this.isFakeResolved = true;
                if (res) {
                    this.isError = true;
                    this.messageService.addError("Email non autorisé");
                }
                this.setCreate();
            });
        } else {
            this.isError = false;
        }
    }
}
