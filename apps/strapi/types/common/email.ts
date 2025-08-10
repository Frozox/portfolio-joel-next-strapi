import { Art_Plain } from "../../src/api/art/content-types/art/art";

export interface GenericEmail {
    email: string;
    fullname: string;
    message: string;
    h_captcha_response: string;
}

export interface ContactEmail extends GenericEmail {
    arts: string[];
}

export interface ContactEmailPopulated extends GenericEmail {
    arts: Partial<Art_Plain>[]
}