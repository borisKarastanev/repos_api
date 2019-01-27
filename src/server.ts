import bodyParser = require("body-parser");
import * as express from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {GithubService} from "./api/githubService";
import {IHttpErrorResponse} from "./api/models/Generic/Http";
import {IGithubRepository} from "./api/models/Github/GithubRepos";

export const app = express();
const port = 8080; // default port to listen
const githubService = new GithubService();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get("/repos", (req: Request, res: Response, next: NextFunction) => {
    const username = req.query.username;

    githubService.fetchRepos(username)
        .then((repos: IGithubRepository[]) => {
            res.json(repos);
        })
        .catch((err: IHttpErrorResponse) => {
            res.status(err.status).json(err);
            next();
        });
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
