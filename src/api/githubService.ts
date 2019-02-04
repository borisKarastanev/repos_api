import request = require("request-promise-native");
import {IGithubRepository} from "./models/Github/GithubRepos";

export class GithubService {
    private defaultHeaders = {
        "user-agent": "nodejs-repos-api"
    };

    public fetchRepos(username: string): Promise<IGithubRepository[]> {
        return request({
            method: "GET",
            json: true,
            resolveWithFullResponse: true,
            headers: this.defaultHeaders,
            uri: `https://api.github.com/users/${username}/repos`
        })
        .then((result: any) => {
            return result.body;
        })
        .catch((error: any) => {
            return Promise.reject(error);
        });
    }
}
