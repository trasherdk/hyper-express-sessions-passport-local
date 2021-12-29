const SessionEngine = require('hyper-express-session');

// Sessions are backed in this key/value store, not sqlite3
const localStorage = require('node-localstorage')

const sessionEngine = new SessionEngine({
    duration: 1000 * 60 * 45, // Default duration is 45 Minutes
    cookie: {
        name: 'example_sess',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        secret: 'SomeSuperSecretForSigningCookies'
    }
});
console.log('node-localstorage session database started')

// Bind session engine handlers for storing sessions in Redis store
sessionEngine.use('read', (session) => {
    console.log('sessionEngine read')
    return JSON.parse(localStorage.getItem('session:' + session.id));
});

sessionEngine.use('touch', (session) => {
    console.log('sessionEngine touch')
    const stored = JSON.parse(localStorage.getItem('session:' + session.id))
    stored.expores_at = session.expores_at
    localStorage.setItem('session:' + session.id, JSON.stringify(stored));
});

sessionEngine.use('write', (session) => {
    console.log('sessionEngine write')
    localStorage.setItem('session:' + session.id, JSON.stringify(session.get()));
});

sessionEngine.use('destroy', (session) => {
    console.log('sessionEngine destroy')
    localStorage.removeItem('session:' + session.id);
});

module.exports = sessionEngine