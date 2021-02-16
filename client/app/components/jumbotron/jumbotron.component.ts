import { Component, Input, OnInit } from '@angular/core';

// services
import { Subscription }             from 'rxjs/Subscription';
import { AuthService }              from '../../services/auth.service';

// model
import { User }                     from '../../models/user/user.model';

@Component({
    selector: 'jumbotron',
    templateUrl: './jumbotron.component.html',
})

export class JumbotronComponent implements OnInit {

    @Input() title: String;
    user: User;
    
    constructor(private authService:AuthService) { }
    
    ngOnInit() {
        this.authService.user$.subscribe(user => this.user = user);
    }
}