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
    selector: 'reset',
    templateUrl: './reset.component.html',
    providers: [ UserService ]
})

export class ResetComponent implements OnInit {
    
    h2: String = 'Réinitialisation du compte utilisateur';
    buttonDisabled: String = '';
    id: String = '';
    token: String = '';
    password1: String = '';
    password2: String = '';
    isError: Boolean = false;
    user: User;
        
    constructor(private messageService:MessageService,
        private authService:AuthService,
        private userService:UserService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getParams();
        this.getResetUser();
    }

    reset() {
        this.messageService.clrMessages();
        this.chkPassword();
        this.setReset();
    }
    
    getParams() {
        this.id = this.route.snapshot.params['id'];
        this.token = this.route.snapshot.params['token'];
    }

    getResetUser() {
        this.userService.getResetUser(this.id, this.token).subscribe(user => {
            if (!user) {
                this.messageService.addError('Une erreur est survenue');
            } else {
                this.messageService.addInfo('<strong>'+ user.username 
                        +'</strong>, veuillez saisir et confirmer votre nouveau mot de passe');
                this.user = user;
            }
        });
    }
    
    chkPassword() {
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
    
    setReset() {
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            
            // password
            let CryptoJS = require('crypto-js');
            let hash = CryptoJS.SHA3(this.password1).toString(CryptoJS.enc.Base64);
            this.user.password = hash;
            
            this.userService.setReset(this.user).subscribe(user => {
                this.buttonDisabled = '';
                if (user) {
                    this.authService.setAuthUser(user);
                    this.router.navigate(['/world-map', {success: "Mot de passe réinitialisé avec succès<br>"
                            + "Vous avez été connecté automatiquement"}]);
                } else {
                    this.messageService.addError("Une erreur est survenue");
                }
            }, err => {
                this.buttonDisabled = '';
                console.log(err);
                var error = JSON.parse(err._body);
                this.messageService.addError(error.msg);
            });
        } else {
            this.isError = false;
        }
    }
}
