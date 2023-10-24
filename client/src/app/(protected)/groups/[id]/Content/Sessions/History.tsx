import CardSession from './CardSession';

export const exampleSession = {
  sessions: {
    id: 2,
    name: 'Parcial bdd',
    description: null,
    location: 'fing',
    meeting_link: 'linkmeet.com',
    start_time: '2023-12-10T19:00:00.000Z',
    end_time: '2023-12-11T19:00:00.000Z',
    group_id: 1,
    attendances: [
      {
        id: 1,
        session_id: 2,
        status: 'pending',
        created_at: '2023-10-19T14:51:53.393Z',
        updated_at: '2023-10-19T14:51:53.393Z',
        member_id: 1,
      },
      {
        id: 2,
        session_id: 2,
        status: 'pending',
        created_at: '2023-10-19T14:51:53.405Z',
        updated_at: '2023-10-19T14:51:53.405Z',
        member_id: 44,
      },
      {
        id: 3,
        session_id: 2,
        status: 'pending',
        created_at: '2023-10-19T14:51:53.410Z',
        updated_at: '2023-10-19T14:51:53.410Z',
        member_id: 45,
      },
    ],
  },
};

export default function History() {
  return (
    <div data-testid='session-history'>
      <CardSession session={exampleSession} />
      <CardSession session={exampleSession} />
    </div>
  );
}
