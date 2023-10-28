import { Session } from '@/types/Session';
import CardSession from './CardSession';

type NextSessionsProps = {
  sessions: Session[];
  // eslint-disable-next-line no-unused-vars
  viewSession: (id: number) => void;
};

export default function NextSessions({
  sessions,
  viewSession,
}: NextSessionsProps) {
  return (
    <div data-testid='next-session'>
      {sessions.map((session, index) => {
        return (
          <div key={index} onClick={() => viewSession(session?.id)}>
            <CardSession session={session} isHistory={true} />
          </div>
        );
      })}
    </div>
  );
}
