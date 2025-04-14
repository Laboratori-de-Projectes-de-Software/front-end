// Custom error classes
export class UserAlreadyExists extends Error {
    constructor(message: string = "Not able to create user") {
        super(message);
        this.name = 'UserAlreadyExists';
    }
}

export class UserNotExists extends Error {
    constructor(message: string = "Not able to find user") {
        super(message);
        this.name = 'UserNotExists';
    }
}


// Custom error classes
export class HttpError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'HttpError';
    }
}