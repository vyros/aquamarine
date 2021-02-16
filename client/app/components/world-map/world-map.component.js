"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var wineyard_service_1 = require("../../services/wineyard.service");
var message_service_1 = require("../../services/message.service");
var WorldMapComponent = (function () {
    function WorldMapComponent(messageService, wineyardService, route) {
        this.messageService = messageService;
        this.wineyardService = wineyardService;
        this.route = route;
        this.h2 = 'World map';
    }
    WorldMapComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
        this.setWineyards();
        this.getFlash();
    };
    WorldMapComponent.prototype.getFlash = function () {
        var success = this.route.snapshot.params['success'];
        var info = this.route.snapshot.params['info'];
        var error = this.route.snapshot.params['error'];
        if (typeof success !== 'undefined') {
            this.messageService.addSuccess(success);
        }
        if (typeof info !== 'undefined') {
            this.messageService.addSuccess(info);
        }
        if (typeof error !== 'undefined') {
            this.messageService.addSuccess(error);
        }
    };
    WorldMapComponent.prototype.setWineyards = function () {
        var _this = this;
        this.wineyardService.getWineyardsSlowly().then(function (wineyards) {
            _this.wineyards = wineyards;
        });
    };
    WorldMapComponent.prototype.ngAfterViewInit = function () {
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
            getAreasFromMap: true
        };
        // pass data provider to the map object
        map.dataProvider = dataProvider;
        /* create areas settings
         * autoZoom set to true means that the map will zoom-in when clicked on the area
         * selectedColor indicates color of the clicked area.
         */
        map.areasSettings = {
            autoZoom: true,
            rollOverBrightness: 10,
            selectedBrightness: 20
        };
        // let's say we want a small map to be displayed, so let's create and add it to the map
        map.smallMap = new AmCharts.SmallMap();
        // write the map to container div
        map.write("mapdiv");
    };
    return WorldMapComponent;
}());
WorldMapComponent = __decorate([
    core_1.Component({
        selector: 'world-map',
        templateUrl: './world-map.component.html',
        providers: [wineyard_service_1.WineyardService]
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        wineyard_service_1.WineyardService,
        router_1.ActivatedRoute])
], WorldMapComponent);
exports.WorldMapComponent = WorldMapComponent;
//# sourceMappingURL=world-map.component.js.map