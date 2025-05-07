// Date : 12/03/2025
// Description: Authentification utility functions.
// Author : Andrés B. S.

// Constants for the storage keys
const STORAGE_KEYS = {
    AUTH_TOKEN: "grupo-app:auth:token",
    USER_INFO: "grupo-app:user:info",
};

/**
 * Saves the authentication token in the browser's local storage.
 * @param token - The authentication token to be stored
 * @returns void
 * @author Andrés B. S.
 */
export function saveToken(token: string) : void {

    // We check if token is a string
    if (typeof token !== 'string') {
        throw new Error('The token must be a string');
    }

    // Stores the token in the localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}


/**
 * Validates the authentication token.
 * @param token - The authentication token be validated
 * @returns True if the token is valid, false otherwise.
 * @author Andrés B. S.
 */
export function validateToken(token: string) : boolean {

    // We check if token is a string
    if (typeof token !== 'string') {
        throw new Error('The token must be a string');
    }

    // Retrieves the token from the local storage
    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    // Compares the stored token with the provided token and returns the result
    return storedToken === token;
}

/**
 * Deletes the authentication token from the local storage.
 * @returns void
 * @author Andrés B. S.
 */
export function deleteToken() : void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

/**
 * Sends a request to a given URL with the authentication token in the header.
 * @param type - The type of request to be sent GET, POST, PUT, DELETE...
 * @param url - The URL to send a request to with the token in the header
 * @param data - The data to be sent in the request
 * @returns A promise with the response of the request
 * @author Andrés B. S.
 */
export async function sendAuthedRequest(type : string, url: string, data?: any) : Promise<Response> {

    // We check if url is a string
    if (typeof url !== 'string') {
        throw new Error('The URL must be a string');
    } else if (typeof type !== 'string') {
        throw new Error('The type must be a string');
    }

    // Retrieves the token from the local storage
    const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    // Sends the request with the token in the header
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };

    const options: RequestInit = {
        method: type,
        headers: headers
    };

    if (data !== undefined) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return response;
}

/**
 * Sends a request to a given URL without the authentication token in the header.
 * @param type - The type of request to be sent GET, POST, PUT, DELETE...
 * @param url - The URL to send a request to without the token in the header
 * @param data - The data to be sent in the request
 * @returns A promise with the response of the request
 * @author Andrés B. S.
 */
export async function sendRequest(type : string, url: string, data: any) : Promise<Response> {

    // We check if url is a string
    if (typeof url !== 'string') {
        throw new Error('The URL must be a string');
    } else if (typeof type !== 'string') {
        throw new Error('The type must be a string');
    }

    // Sends the request with the token in the header
    const response = await fetch(url, {
        method: type,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return response;
}

/**
 * Retrieves the authentication token from the local storage.
 * @returns The authentication token
 * @author Andrés B. S.
 */
export function getUserInfo() : any {
    const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return userInfo ? JSON.parse(userInfo) : null;
}

/**
 * Saves the user information in the local storage.
 * @param userInfo - The user information to be stored
 * @returns void
 * @author Andrés B. S.
 */
export function saveUserInfo(userInfo: any) : void {
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
}