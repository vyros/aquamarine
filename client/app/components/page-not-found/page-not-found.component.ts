import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'page-not-found',
    templateUrl: './page-not-found.component.html',
})

export class PageNotFoundComponent implements OnInit {
    
    h2: String = 'Page inconnue';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}

