import { Component, 
    Input, OnInit }             from '@angular/core';
import * as CryptoJS            from 'crypto-js/';

// services
import { Subscription }         from 'rxjs/Subscription';
import { AuthService }          from '../../services/auth.service';
import { MessageService }       from '../../services/message.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
})

export class NavBarComponent implements OnInit {
    
    @Input() title: String;
    buttonDisabled: String = '';
    subscription: Subscription;
    isError: Boolean = false;
    user: User;

    username: String = '';
    password: String = '';
    
    constructor(private messageService:MessageService,
        private authService:AuthService) { }
    
    ngOnInit() {
        this.authService.user$.subscribe(user => this.user = user);
    }
    
    chkCombination() {
        //TODO check with regex
        let frmUsername = this.username.trim();
        if (frmUsername.length === 0) {
            this.isError = true;
            this.messageService.addError('Veuilliez saisir un utilisateur');
        }
        if (this.password.length === 0) {
            this.isError = true;
            this.messageService.addError('Veuilliez saisir un mot de passe');
        }
    }
    
    clrCombination() {
        this.username = '';
        this.password = '';
    }
    
    signin() {
        this.messageService.clrMessages();
        this.chkCombination();
        this.setSignin();
    }
    
    setSignin() {
        if (!this.isError) {
            let frmUsername = this.username.trim();
            this.buttonDisabled = 'disabled';
            
            // password
            let CryptoJS = require('crypto-js');
            let hash = CryptoJS.SHA3(this.password).toString(CryptoJS.enc.Base64);
            
            this.authService.getSigninUser(frmUsername, hash).subscribe(user => {
                this.buttonDisabled = '';
                if (!user.activated) {
                    this.messageService.addError("Compte utilisateur inactif!");
                    this.messageService.addError("Veuillez contacter l'administrateur");
                } else if (!user.validated) {
                    this.messageService.addError("Compte utilisateur non validé!");
                    this.messageService.addError("Veuillez vérifier votre boîte mail <strong>" 
                            + user.email + "</strong> pour confirmer l'inscription");
                } else {
                    this.clrCombination();
                    console.log(this.user);
                    this.authService.setAuthUser(user);
                }
            }, err => {
                this.buttonDisabled = '';
                var error = JSON.parse(err._body);
                this.messageService.addError(error.msg);
            });
        } else {
            this.isError = false;
        }
    }
    
    signout() {
        this.messageService.clrMessages();
        this.authService.getSignoutUser().subscribe(res => {
            if (res) {
                this.authService.clrAuthUser();
            }
        });
//        this.subscription = this.authService.getSignoutUser.subscribe(
//            user => {
//                this.user = user; 
//        });
    }
}