import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
})

export class GalleryComponent implements OnInit {
    
    h2: String = 'Galerie';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
}
