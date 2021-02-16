import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    
    createDb() {
        let blobs = [
            {
                id:'58f171617c3fff3946535a51', 
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
    }
    
//    createDb() {
//        let wineyards = [
//            {
//                id: 1, 
//                name: 'Médoc', 
//                description: 'Praesent at massa elit. Fusce et volutpat risus, in gravida libero. Fusce pellentesque a nisi eget egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempus ipsum nisl, id feugiat velit pharetra vitae. In lobortis non ex at malesuada. Donec blandit, arcu ac iaculis rutrum, felis orci dictum metus, vel volutpat dui erat ac purus. Phasellus ut risus libero. Suspendisse volutpat nunc vel arcu iaculis, nec ultrices justo lobortis. Mauris vitae laoreet risus, eget tempor urna. Donec lorem orci, efficitur porttitor dapibus ac, iaculis vel nisi. Cras elementum a nunc et pretium.',
//                grape: 'Cabernet-sauvignon, Cabernet-franc, Merlot, Malbec et Petit verdot'
//            },
//            {
//                id: 2, 
//                name: 'Blayais', 
//                description: 'Praesent at massa elit. Fusce et volutpat risus, in gravida libero. Fusce pellentesque a nisi eget egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempus ipsum nisl, id feugiat velit pharetra vitae. In lobortis non ex at malesuada. Donec blandit, arcu ac iaculis rutrum, felis orci dictum metus, vel volutpat dui erat ac purus. Phasellus ut risus libero. Suspendisse volutpat nunc vel arcu iaculis, nec ultrices justo lobortis. Mauris vitae laoreet risus, eget tempor urna. Donec lorem orci, efficitur porttitor dapibus ac, iaculis vel nisi. Cras elementum a nunc et pretium.', 
//                grape: 'Merlot, Cabernet-sauvignon, Cabernet-franc, Sémillon, Sauvignon et Muscadelle'
//            },
//            {
//                id: 3, 
//                name: 'Libournais', 
//                description: 'Praesent at massa elit. Fusce et volutpat risus, in gravida libero. Fusce pellentesque a nisi eget egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempus ipsum nisl, id feugiat velit pharetra vitae. In lobortis non ex at malesuada. Donec blandit, arcu ac iaculis rutrum, felis orci dictum metus, vel volutpat dui erat ac purus. Phasellus ut risus libero. Suspendisse volutpat nunc vel arcu iaculis, nec ultrices justo lobortis. Mauris vitae laoreet risus, eget tempor urna. Donec lorem orci, efficitur porttitor dapibus ac, iaculis vel nisi. Cras elementum a nunc et pretium.', 
//                grape: 'Merlot, Cabernet-franc, Cabernet-sauvignon et Malbec'
//            },
//            {
//                id: 4, 
//                name: 'Entre deux mers', 
//                description: 'Praesent at massa elit. Fusce et volutpat risus, in gravida libero. Fusce pellentesque a nisi eget egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempus ipsum nisl, id feugiat velit pharetra vitae. In lobortis non ex at malesuada. Donec blandit, arcu ac iaculis rutrum, felis orci dictum metus, vel volutpat dui erat ac purus. Phasellus ut risus libero. Suspendisse volutpat nunc vel arcu iaculis, nec ultrices justo lobortis. Mauris vitae laoreet risus, eget tempor urna. Donec lorem orci, efficitur porttitor dapibus ac, iaculis vel nisi. Cras elementum a nunc et pretium.', 
//                grape: 'Sauvignon, Sémillon, Muscadelle, Merlot et Cabernet-sauvignon'
//            },
//            {
//                id: 5, 
//                name: 'Graves', 
//                description: 'Praesent at massa elit. Fusce et volutpat risus, in gravida libero. Fusce pellentesque a nisi eget egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempus ipsum nisl, id feugiat velit pharetra vitae. In lobortis non ex at malesuada. Donec blandit, arcu ac iaculis rutrum, felis orci dictum metus, vel volutpat dui erat ac purus. Phasellus ut risus libero. Suspendisse volutpat nunc vel arcu iaculis, nec ultrices justo lobortis. Mauris vitae laoreet risus, eget tempor urna. Donec lorem orci, efficitur porttitor dapibus ac, iaculis vel nisi. Cras elementum a nunc et pretium.', 
//                grape: 'Merlot, Cabernet-sauvignon, Cabernet-franc, Sémillon, Sauvignon et Muscadelle'
//            },
//        ];
//        
//        return {wineyards};
//    }
}
