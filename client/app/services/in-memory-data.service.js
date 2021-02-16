"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var blobs = [
            {
                id: '58f171617c3fff3946535a51',
                name: 'Jimmy',
                isLoved: false
            },
            {
                id: '58f175a4ec879a3bd0afd0fc',
                name: 'SnoopDog',
                isLoved: true
            },
            {
                id: '58f175a7ec879a3bd0afd0fd',
                name: 'Eminem',
                isLoved: false
            }
        ];
        return blobs;
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map