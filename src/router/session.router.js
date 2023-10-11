import { Router } from "express";
import passport from "passport";

const router = Router()

// registro
router.post('/register', passport.authenticate('register',{failureRedirect: '/session/failRegister'}), async(req, res) => {
    res.redirect('/session/login')
})

router.get('/failRegister', (req, res) => res.send({ error: 'Ocurrió un error' }))

//login
router.post('/login',  passport.authenticate('login',{failureRedirect: '/session/failLogin'}),  async (req, res) => {
    if(!req.user) {
        return res.status(400).send({ status: 'error', error: 'Datos incorrectos'})
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }   
    res.redirect('/products')
})
router.get('/failLogin', (req, res) => res.send({ error: 'Ocurrió un error' }))


//logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.status(500).render(err.mesagge)
        } else 
        res.redirect('/')
    })
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async(req, res) => {
    console.log('Callback: ', req.user)
    req.session.user = req.user
    res.redirect('/products')
})


export default router
