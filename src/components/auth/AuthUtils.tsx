import axios from 'axios';

export interface User {
    userId: number;
    email: string;
    nombre: string;
    imagen?: string;
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/login', // TODO quitar dependencia a 8080
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || 'Login failed');
    }
};

export const registerUser = async (email: string, nombre: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/register', // TODO quitar dependencia a 8080
            { email, nombre, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || 'Registration failed');
    }
};

export const logoutUser = async () => { // TODO implementar frontend logout
    try {
        await axios.post('http://localhost:8080/logout', {}, { withCredentials: true }); // TODO quitar dependencia a 8080
        window.location.href = '/login';
    } catch (err) {
        console.error('Logout failed', err);
    }
};

export const getCurrentUser = () => { // función sin utilizar para ver el usuario actual (quizá TODO implementar un frontend del perfil?)
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
};

export const setCurrentUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const clearCurrentUser = () => { // TODO usar en el frontend de logout
    localStorage.removeItem('user');
};