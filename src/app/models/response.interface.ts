import { User } from "./user";

export interface ResponseI {
    user: User;
    token: any;
    expiryDate: Date;
}