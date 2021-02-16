import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'sale',
    templateUrl: './sale.component.html',
})

export class SaleComponent implements OnInit {
    
    h2: String = 'Vente';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}
