import {NextFunction, Request, Response} from "express-serve-static-core";
import {IHttpErrorGithubResponse} from "../api/models/Generic/Http";
import {IGithubRepository} from "../api/models/Github/GithubRepos";
import {GithubService} from "../api/services/github-service";

const githubService = new GithubService();

export const fetchOrganizationRepositories = (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;

    githubService.fetchRepos(username)
        .then((repos: IGithubRepository[]) => {
            res.json(repos);
        })
        .catch((err: IHttpErrorGithubResponse) => {
            res.status(err.statusCode).json(err.message);
            next();
        });
};
