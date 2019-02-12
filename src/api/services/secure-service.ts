import * as crypto from "crypto";
import {IHttpErrorResponse} from "../models/Generic/Http";

export class SecureService {
    constructor(private jwt: any) {}


    public verifyToken(token: string, secret: any) {
        if (!token || !secret) {
            return Promise.reject("Cannot perform verification!");
        }

        try {
            const decoded = this.jwt.verify(token, secret);
            return Promise.resolve(decoded);
        } catch (verifyTokenError) {
            // TODO Write actual falure in the log
            const error: IHttpErrorResponse = {
                status: 401,
                message: "Failed to authenticate token"
            };

            return Promise.reject(error);
        }
    }

    public saltUserHashedPassword(pasword: string) {
        return this.generateRandomSalt(16)
            .then((salt: string) => {
                return this.generateHashedPassword(pasword, salt);
            })
            .then((securedPassword: any) => {
                return securedPassword;
            })
            .catch((saltUserPasswordError: any) => {
                // TODO Write actual falure in the log
                const error: IHttpErrorResponse = {
                    status: 401,
                    message: "Failed to login"
                };

                return Promise.reject(error);
            });

    }

    private generateRandomSalt(length: number) {
        const salt = crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);

        return Promise.resolve(salt);
    }

    public generateHashedPassword(password: string, salt: string) {
        const hash = crypto.createHmac("sha512", salt);
        hash.update(password);

        const digest = hash.digest("hex");

        const hashedPassword = {
            salt,
            hashedPassword: digest
        };

        return Promise.resolve(hashedPassword);
    }

}
