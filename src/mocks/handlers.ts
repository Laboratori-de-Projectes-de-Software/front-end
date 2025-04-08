//A la espera de back aixo serveix per fer proves

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/v0/auth/login', () => {
    return HttpResponse.json({
      userId: 1,
      email: 'test@mock.com',
      token: 'mocked_token_123',
    });
  }),

  http.post('/api/v0/auth/register', async ({ request }) => {
    const body = await request.json();
  
    return HttpResponse.json({
      userId: 2,
      body: body,
      token: 'mocked_token_456',
    });
  }),
];
