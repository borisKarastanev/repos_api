import * as jwt from "jsonwebtoken";
import {IHttpErrorResponse} from "../models/Generic/Http";
import {SecureService} from "./secure-service";

const secureService = new SecureService(jwt);

export class UserService {

    // TODO Add types
    public authenticateUser(credentials: any, authenticationSecret: any) {

        // TODO Build authentication logic

        return secureService.generateHashedPassword(credentials.password, credentials.salt)
            .then((password) => {
                const validUserPassword = `${password.hashedPassword}${password.salt}`;

                if (validUserPassword === credentials.password) {
                    const token = jwt.sign(credentials, authenticationSecret, {expiresIn: 1200});
                    return {
                        success: true,
                        message: `Welcome back ${credentials.username}`,
                        token: token
                    };
                } else {
                    return {
                        success: false,
                        message: "Authentication failed"
                    };
                }
            })
            .catch((authenticationError: any) => {
                // TODO Add actual error to Log file
                const error: IHttpErrorResponse = {
                    status: 401,
                    message: "Something went wrong while attempting to log in!"
                };

                return Promise.reject(error);
            });
    }

    // TODO Add types for User
    public createNewUser(user: any) {
        if (!user) {
            return Promise.reject("Please Enter a Username and Password");
        }

        return secureService.saltUserHashedPassword(user.password)
            .then((securedPassword) => {
               const newUser = {
                   username: user.username,
                   password: `${securedPassword.hashedPassword}${securedPassword.salt}`
               }

               // TODO Add entry to Database
            });
    }
}
