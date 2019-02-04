import bodyParser = require("body-parser");
import * as express from "express";
import * as githubRepositoriesController from "./controllers/github-repositories-controller";

export const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get("/repos/:username", githubRepositoriesController.fetchOrganizationRepositories);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
