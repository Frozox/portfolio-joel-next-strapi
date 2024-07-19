export interface GenericEmail {
    email: string;
    fullname: string;
    message: string;
    h_captcha_response: string;
}

export interface ContactEmail extends GenericEmail {
    arts: number[];
}

export interface ContactEmailPopulated extends GenericEmail {
    arts: {
        id: number;
        name: string;
        thumbnail: {
            url: string;
            width: number;
            height: number;
        };
    }[];
}