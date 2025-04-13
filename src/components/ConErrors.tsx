// Custom error classes
export class UserAlreadyExists extends Error {
    constructor(message: string = "Not able to create user") {
        super(message);
        this.name = 'UserAlreadyExists';
    }
}


// Custom error classes
export class HttpError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'HttpError';
    }
}