/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',
            
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/animations': 'npm:@angular/animations@4.0.0/bundles/animations.umd.js', // Cookie law
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations@4.0.0/bundles/animations-browser.umd.js', // Cookie law
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            
            // other libraries
            'ng2-progressbar': 'node_modules/ng2-progressbar/bundles/ng2-progressbar.umd.js', // ng2Progressbar
            'angular2-cookie-law': 'npm:angular2-cookie-law@1.1.2/bundles/angular2-cookie-law.umd.js', // Cookie law
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
//            'crypto-js':                 'npm:crypto-js/core.js',     // import core only
//            'crypto-js/sha256':          'npm:crypto-js/sha256.js'    // import sha256 only
            'crypto-js':                 'npm:crypto-js/crypto-js.js'   // import everthing
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);
