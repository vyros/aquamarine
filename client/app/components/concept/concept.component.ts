import { Component, OnInit }    from '@angular/core';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'concept',
    templateUrl: './concept.component.html',
    styleUrls: [ './carousel.css' ]
})

export class ConceptComponent implements OnInit {
    
    h2: String = 'Concept';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
    
    // doesn't work
    ngAfterViewInit() {
        var angle = 0;
        
        function galleryspin(sign) { 
            let spinner = document.querySelector("#spinner");
            
            if (!sign) {
                angle = angle + 45;
            } else {
                angle = angle - 45;
            }
            
            spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
        }
    }
}
