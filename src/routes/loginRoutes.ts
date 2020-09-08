import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST"> 
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    //type guard
    if (email && password) {
        if (email === 'hi@hi.com' && password === 'password') {
            //mark this person as logged in
            req.session = { loggedIn: true };
            //redirect to the root route
            res.redirect('/');
        } else {
            res.send('Wrong email or password. Cannot log in.');
        }
    } else {
        res.send('Error 422: Email or password property is missing.');
    }
});

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div> 
                <div> You are logged in. </div>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
        res.send(`
            <div> 
                <div> You are logged out. </div>
                <a href="/login">Log in</a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = null;
    res.redirect('/');
});

export { router };
