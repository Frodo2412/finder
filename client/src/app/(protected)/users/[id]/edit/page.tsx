import FormPersonalInfo from './FormPersonalInfo';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { SubjectService } from '@/services/SubjectService';

export default async function ConfigProfile() {
  const session = await getServerSession(authOptions);
  const user = await ApiCommunicator.getUser(session!.user.id!);
  const subjects = await ApiCommunicator.getSubjects();
  const careers = await ApiCommunicator.getCareers();
  const careersByUser = await ApiCommunicator.getCareersByUser(user.id);
  const subjectsByUser = await SubjectService.getByUser(user);
  return (
    <>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='pl-6 md:ml-12'>Editar perfil</strong>
        </p>
      </div>
      <div className='flex min-h-[500px] justify-center py-5'>
        <div className='block w-[98vw] rounded-lg md:w-[90%] lg:w-[85%] xl:w-[40%]'>
          {user && (
            <FormPersonalInfo
              user={user}
              subjects={subjects}
              careers={careers}
              careersByUser={careersByUser}
              subjectsByUser={subjectsByUser}
            />
          )}
        </div>
      </div>
    </>
  );
}
