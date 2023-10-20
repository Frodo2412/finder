import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from './Logger';

type CreateSessionData = {
  name: string;
  description: string;
  location: string;
  meeting_link: string;
  start_time: string;
  end_time: string;
  group_id: number;
};

export class SessionService {
  public static async createSession(
    data: CreateSessionData,
    accessToken: string
  ): Promise<string> {
    const response = await ApiCommunicator.commonFetch({
      url: '/sessions',
      method: 'POST',
      data,
      accessToken,
    });
    const body = await response.json();
    return body.id;
  }

  public static async getSessions(
    groupId: string,
    accessToken: string
  ): Promise<any[]> {
    try {
      const response = await ApiCommunicator.commonFetch({
        url: '/sessions/' + groupId,
        method: 'GET',
        accessToken,
      });

      return await response.json();
    } catch (error) {
      Logger.error('Error trying to get sessions: ' + error);
      return [];
    }
  }
}
