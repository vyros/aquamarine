import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'booking',
    templateUrl: './booking.component.html',
})

export class BookingComponent implements OnInit {
    
    h2: String = 'Réservation';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}

