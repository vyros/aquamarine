import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';
import { UserService }          from '../../services/user.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'forgotten',
    templateUrl: './forgotten.component.html',
    providers: [ UserService ]
})

export class ForgottenComponent implements OnInit {
    
    h2: String = 'Mot de passe oublié';
    buttonDisabled: String = '';
    email: String = '';
    user: User;
    isError: Boolean = false;
    
    constructor(private messageService:MessageService,
        private userService:UserService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
    
    forgotten(event) {
        event.preventDefault();
        this.messageService.clrMessages();
        this.chkAccount();
    }
    
    setRetrieve() {
        if (!this.isError) {
            this.buttonDisabled = 'disabled';
            this.userService.setEmailRetriever(this.email).subscribe(res => {
                this.buttonDisabled = '';
                if (res) {
                    this.messageService.addSuccess("Modalité envoyée à l'adresse <strong>" 
                            + this.email + "</strong>");
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
    
    chkAccount() {
        //TODO check other errors from api
        this.buttonDisabled = 'disabled';
        this.userService.getForgottenUser(this.email).subscribe(user => {
            this.buttonDisabled = '';
            if (!user) {
                this.isError = true;
                this.messageService.addError("Email inexistant");
            } else if (!user.activated) {
                this.isError = true;
                this.messageService.addError("Compte utilisateur <strong>inactif</strong>");
                this.messageService.addError("Veuillez contacter l'administrateur");
            } else if (!user.validated) {
                this.isError = true;
                this.messageService.addError("Compte utilisateur <strong>non validé</strong>");
                this.messageService.addError("Veuillez vérifier votre boîte mail <strong>" 
                        + this.email + "</strong> pour confirmer l'inscription");
            } else if (user.reset) {
                this.isError = true;
                this.messageService.addError("Ce compte utilisateur est déjà en attente de réinitialisation");
                this.messageService.addError("Veuillez vérifier votre boîte mail <strong>" 
                        + this.email + "</strong>");
            } else if (user.provider !== 'local') {
                this.isError = true;
                this.messageService.addError("Connectez-vous via <strong>" 
                        + user.provider + "</strong>");
            }
            this.setRetrieve();
        }, err => {
            this.isError = true;
            this.buttonDisabled = '';
            var error = JSON.parse(err._body);
            this.messageService.addError(error.msg);
        });
    }
}
