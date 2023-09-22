/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';

export class GroupService {
  public static async getGroup(id: string): Promise<StudyGroup> {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/group/' + id;

    const res = await fetch(URL);
    let json: any = await res.json();
    return (await json) as StudyGroup;
  }

  public static async getActiveGroups(user: User): Promise<StudyGroup[]> {
    Logger.debug('Getting active groups for user: ' + user.name);

    const BasesDeDatos: StudyGroup = {
      id: 1,
      name: 'Lab Bases de Datos',
      description: 'Estamos buscando gente para el lab de bases de datos',
      subject: 'Fundamentos de Bases de Datos',
      size: 3,
      isLab: true,
    };
    const TProg: StudyGroup = {
      id: 2,
      name: 'Lab Taller de Programación',
      description: 'Estamos buscando gente para el taller de programación',
      subject: 'Taller de Programación',
      size: 3,
      isLab: true,
    };
    const RedesComp: StudyGroup = {
      id: 3,
      name: 'Los Pibardos Preparan Redes',
      description: 'Estamos tratando de estudiar para el parcial de redes',
      subject: 'Redes de Computadoras',
      size: 3,
      isLab: false,
    };

    const grupos: StudyGroup[] = [BasesDeDatos, TProg, RedesComp];

    Logger.debug('Active groups for user: ' + user.name + ' are: ' + grupos);
    return Promise.resolve(grupos);
  }
}
