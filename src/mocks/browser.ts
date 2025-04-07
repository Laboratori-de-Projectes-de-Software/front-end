import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Crea el worker per interceptar fetch
export const worker = setupWorker(...handlers);
