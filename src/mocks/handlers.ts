//A la espera de back aixo serveix per fer proves

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post("/api/v0/auth/login", async ({ request }) => {
    const body = await request.json();
    console.log("MSW ha rebut login:", body);

    return HttpResponse.json({
      userId: 99,
      email: "fsf@csd.com",
      token: 'mocked_token_456',
    });
  }),

  http.post('/api/v0/auth/register', async ({ request }) => {
    const body = await request.json();
  
    return HttpResponse.json({
      body: body, 
    });
  }),
];
