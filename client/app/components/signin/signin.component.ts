import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
})

export class SigninComponent implements OnInit {
    
    h2: String = 'Autres modes de connexion';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}
