// Avoids AmCharts not found
declare const AmCharts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute }                   from '@angular/router'

// services
import { Subscription }                     from 'rxjs/Subscription';
import { WineyardService }                  from '../../services/wineyard.service';
import { MessageService }                   from '../../services/message.service';

// model
import { Wineyard }                         from '../../models/wineyard/wineyard.model';

@Component({
    selector: 'world-map',
    templateUrl: './world-map.component.html',
    providers: [ WineyardService ]
})

export class WorldMapComponent implements AfterViewInit, OnInit {
    
    h2: String = 'World map';
    subscription: Subscription;
    wineyards: Wineyard[];

    constructor(private messageService:MessageService,
        private wineyardService: WineyardService,
        private route: ActivatedRoute) { }
    
    ngOnInit() {
        this.messageService.clrMessages();
        this.setWineyards();
        this.getFlash();
    }
    
    getFlash() {
        let success = this.route.snapshot.params['success'];
        let info = this.route.snapshot.params['info'];
        let error = this.route.snapshot.params['error'];

        if (typeof success !== 'undefined') {
            this.messageService.addSuccess(success);
        }
        if (typeof info !== 'undefined') {
            this.messageService.addSuccess(info);
        }
        if (typeof error !== 'undefined') {
            this.messageService.addSuccess(error);
        }
    }
    
    setWineyards() {
        this.wineyardService.getWineyardsSlowly().then((wineyards: Wineyard[]) => {
            this.wineyards = wineyards;
        });
    }

    ngAfterViewInit() {
        AmCharts.theme = AmCharts.themes.black;

        // create AmMap object
        var map = new AmCharts.AmMap();

        // set path to images


        /* create data provider object
         mapVar tells the map name of the variable of the map data. You have to
         view source of the map file you included in order to find the name of the
         variable - it's the very first line after commented lines.

         getAreasFromMap indicates that amMap should read all the areas available
         in the map data and treat them as they are included in your data provider.
         in case you don't set it to true, all the areas except listed in data
         provider will be treated as unlisted.
        */
        var dataProvider = {
            mapVar: AmCharts.maps.worldLow,
            getAreasFromMap:true
        };
        // pass data provider to the map object
        map.dataProvider = dataProvider;

        /* create areas settings
         * autoZoom set to true means that the map will zoom-in when clicked on the area
         * selectedColor indicates color of the clicked area.
         */
        map.areasSettings = {
            autoZoom: true,
            rollOverBrightness:10,
            selectedBrightness:20
        };

        // let's say we want a small map to be displayed, so let's create and add it to the map
        map.smallMap = new AmCharts.SmallMap();

        // write the map to container div
        map.write("mapdiv");
    }
}