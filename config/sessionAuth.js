const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const DAO = require('../src/DAO/AppDAO');

function test(){
    console.log('test');
    
}

module.exports = (app) => {
    console.log('app em sessionAuth');
    const connection = app.DAOConfig.connectionFactory()
    // configuração da sessão e da autenticação.
    passport.use(new LocalStrategy(
        {
            usernameField: 'Email',
            passwordField: 'Password'
        },
        (email, senha, done) => {
            const usuarioDao = new DAO('Users', connection);
            usuarioDao.filter(`Email = ${email}`)
            usuarioDao.query('select * from Users where Email = ? and Password= PASSWORD(?);', [email, senha])
                        .then(usuario => {
                            if (!usuario || senha != usuario.senha) {
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos!'
                                });
                            }

                            return done(null, usuario);
                        })
                        .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((user, done)=>{
        const sessionUser = {
            email:user.email,
        }
        done(null, sessionUser)
    });

    passport.deserializeUser((sessionUser, done)=>{
        done(null, sessionUser)
    });

    app.use(session({
        secret: "OrganizedTeaching",
        genid: (req)=> uuid(),
        resave:false,
        saveUninitialized:false
    }));

    app.use(passport.initialize())
    app.use(passport.session())
    console.log('hey');
    app.use(function(req, resp, next){
        console.log('exporting passport');
        req.passport = passport;
        next();
    });
};