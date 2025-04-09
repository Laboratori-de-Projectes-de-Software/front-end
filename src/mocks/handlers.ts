//A la espera de back aixo serveix per fer proves

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/league', ({ request }) => {
    
    const url = new URL(request.url);
    const owner = url.searchParams.get('owner');
  
    const leagues = [
      {
        id: 1,
        name: 'Lliga Catalunya',
        description: 'Lliga regional catalana',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 2,
        name: 'Lliga Estiu',
        description: 'Torneig d’estiu 2025',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 3,
        name: 'Lliga Interna',
        description: 'Competició entre departaments',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 4,
        name: 'Lliga Europea',
        description: 'Campionat internacional europeu',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 5,
        name: 'Lliga Prova',
        description: 'Lliga de test amb bots experimentals',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 6,
        name: 'Lliga Infantil',
        description: 'Competició junior',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 7,
        name: 'Lliga Nacional',
        description: 'Primera divisió estatal',
        ownerId: owner ?? 'mock-user-id',
      },
      {
        id: 8,
        name: 'Lliga RobotCat',
        description: 'Torneig català de bots autònoms',
        ownerId: owner ?? 'mock-user-id',
      }
    ];
  
    return HttpResponse.json(leagues);
  }),


  http.get('/leagues/:leagueId/leaderboard', ({ params }) => {
    const { leagueId } = params;
  
    const data: Record<string, any[]> = {
      "1": [
        { name: "Bot Alpha", points: 10, debates: 4, wins: 3, draws: 1, losses: 0 },
        { name: "Bot Omega", points: 7, debates: 4, wins: 2, draws: 1, losses: 1 },
      ],
      "2": [
        { name: "Bot X", points: 12, debates: 5, wins: 4, draws: 0, losses: 1 },
        { name: "Bot Y", points: 9, debates: 5, wins: 3, draws: 0, losses: 2 },
      ],
      "3": [
        { name: "Bot Gamma", points: 6, debates: 3, wins: 2, draws: 0, losses: 1 },
      ],
      "4": [
        { name: "Bot Zeta", points: 14, debates: 5, wins: 4, draws: 2, losses: 0 },
        { name: "Bot Eta", points: 11, debates: 5, wins: 3, draws: 2, losses: 0 },
      ],
      "5": [
        { name: "Bot Nova", points: 3, debates: 3, wins: 1, draws: 0, losses: 2 },
        { name: "Bot Quark", points: 1, debates: 3, wins: 0, draws: 1, losses: 2 },
      ],
    };
  
    return HttpResponse.json(data[leagueId as string] || []);
  }),
    http.post('/auth/login', () => {
      return HttpResponse.json({
        userId: 1,
        email: 'test@mock.com',
        token: 'mocked_token_123',
      });
    }),
];
