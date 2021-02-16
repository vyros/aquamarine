import { Component, OnInit }    from '@angular/core';
import { 
    Router,
    ActivatedRoute
}                               from '@angular/router'
import * as CryptoJS            from 'crypto-js/';

// services
import { MessageService }       from '../../services/message.service';
import { AuthService }          from '../../services/auth.service';
import { UserService }          from '../../services/user.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'validate',
    templateUrl: './validate.component.html',
    providers: [ UserService ]
})

export class ValidateComponent implements OnInit {
    
    h2: String = 'Validation du compte utilisateur';
    buttonDisabled: String = '';
    id: String = '';
    token: String = '';
    username: String = '';
    password: String = '';
    isError: Boolean = false;
    user: User;
    
    constructor(private messageService:MessageService,
        private authService:AuthService,
        private userService:UserService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getParams();
        this.getValidatedUser();
    }
    
    getParams() {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
    }
    
    getValidatedUser() {
        this.userService.getValidatedUser(this.id, this.token).subscribe(user => {
            if (!user) {
                this.messageService.addError('Une erreur est survenue');
            } else {
                this.messageService.addSuccess('<strong>'+ user.username 
                        +'</strong>, votre compte a été validé avec succès');
                this.messageService.addSuccess('Vous pouvez maintenant vous connecter');
            }
        });
    }
    
    validate() {
        this.chkCombination();
        this.setSignin();
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
                    this.authService.setAuthUser(user);
                    this.router.navigate(['/']);
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
}
