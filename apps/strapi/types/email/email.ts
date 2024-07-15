export interface GenericEmail {
    email: string;
    fullname: string;
    message: string;
    h_captcha_response: string;
}

export interface ContactEmail extends GenericEmail {
}