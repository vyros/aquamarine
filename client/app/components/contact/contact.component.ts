import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
})

export class ContactComponent implements OnInit {
    
    h2: String = 'Contact';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}
