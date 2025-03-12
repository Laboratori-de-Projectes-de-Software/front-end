import { vi } from 'vitest';

// filepath: c:\Desarollo\front-end-grupo-grupo\frontend\src\mocks\fetchMock.ts

// Mock manual de fetch
const fetchMock = vi.fn();

// Configuración por defecto para respuestas simuladas
const createResponse = (data: any, options: ResponseInit = {}) => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    
    return {
        blob: () => Promise.resolve(blob),
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        ok: options.status ? options.status >= 200 && options.status < 300 : true,
        status: options.status || 200,
        headers: new Headers(options.headers || { 'Content-Type': 'application/json' }),
    };
};

// Helper para configurar respuestas
export const mockFetchResponse = (data: any, options: ResponseInit = {}) => {
    fetchMock.mockResolvedValueOnce(createResponse(data, options));
};

// Helper para configurar errores
export const mockFetchError = (errorMessage: string) => {
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));
};

// Reemplazar fetch en el entorno global
Object.defineProperty(window, 'fetch', {
    value: fetchMock,
    writable: true
});

export default fetchMock;