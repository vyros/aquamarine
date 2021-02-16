import { Component, OnInit }    from '@angular/core';
import * as io                  from "socket.io-client";

// services
import { BlobService }          from '../../services/blob.service';
import { MessageService }       from '../../services/message.service';

// model
import { Blob }                 from '../../models/blob/blob.model'; 

@Component({
    moduleId: module.id,
    selector: 'blob',
    templateUrl: 'blob.component.html',
    providers: [BlobService]
})

export class BlobComponent implements OnInit {
    
    h2: String = 'Blob'
    blobs: Blob[];
    name: String;
    badge: Number;
    dob: Date;
    isLoved: Boolean;

    constructor(private messageService:MessageService,
        private blobService:BlobService) { }
    
    ngOnInit() {
        this.messageService.clrMessages();
        this.setBlobs();
    }
    
    // Asynchronous observable version
    setBlobs(): void {
        this.blobService.getBlobs().subscribe(blobs => {
            this.blobs = blobs;
        });
    }

    addBlob(event) {
        event.preventDefault();
        var newBlob = {
            name: this.name,
            badge: 0,
            dob: Date.now,
            isLoved: false
        }

        this.blobService.addBlob(newBlob).subscribe(blob => {
            this.blobs.push(blob);    
            this.name = '';
        });
    }

    deleteBlob(id) {
        var blobs = this.blobs;
        this.blobService.deleteBlob(id).subscribe(data => {
            if (data.n == 1) {
                for(var i = 0; i < blobs.length; i++) {
                    if (blobs[i]._id == id) {
                        blobs.splice(i, 1);
                    }
                }
            } 
        });
    }

    updateLoved(blob) {
        var _blob = {
            _id: blob._id,
            name: blob.name,
            badge: blob.badge,
            dob: blob.dob,
            isLoved: !blob.isLoved
        };

        this.blobService.updateLoved(_blob).subscribe(data => {
            blob.isLoved = !blob.isLoved;
        });
    }
}
