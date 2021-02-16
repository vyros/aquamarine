module.exports = {
    development: true,
    db: 'mongodb://localhost/lbwtdb',
    sessionSecret: 'aliensAreAmongUs',
    port: 8080,
    sslPort: 8081,
    domain: 'vyros.xyz:8081',
    mailer: {
        host: 'localhost',
        port: 25,
        secure: true,
        service: 'gmail',
        user: 'j.deweer@gmail.com',
        pass: '',
        from: '"Jimmy Deweer" <j.deweer@gmail.com>'
    },
    facebook: {
        clientID: '188933668291951',
        clientSecret: 'f6a040b395cd4193a15f42d4f09f530b',
        callbackURL: '/auth/facebook/callback',
        scopes: ['email'],
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    twitter: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: '/auth/twitter/callback'
    },
    google: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: '/auth/google/callback'
    },
    instagram: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: '/auth/instagram/callback'
    },
    linkedin: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: '/auth/linkedin/callback'
    }
};
