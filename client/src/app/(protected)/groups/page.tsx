'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import Image from 'next/image';
import View from './View';
import { useSession } from 'next-auth/react';
import { StudyGroup } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';

export default function Groups() {
  const { data: session } = useSession();

  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const groupsFetch = await GroupService.getAll(session?.user.accessToken!);
    const subjectsFetch = await SubjectService.getAll(
      session?.user.accessToken!
    );
    setGroups(groupsFetch);
    setSubjects(subjectsFetch);
    setIsLoading(false);
  }, [session?.user.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex h-full flex-col'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-primaryBlue lg:text-white'>
        <h1 className='text-center text-4xl font-extrabold'>Grupos</h1>
      </div>
      {!isLoading && <View groups={groups} subjects={subjects} />}
      {isLoading && (
        <div className='flex h-full flex-col items-center justify-center'>
          <Image
            src='/loading_groups.png'
            alt='Banner'
            width={100}
            height={100}
            className='animate-bounce object-cover'
          />
          <p className='mt-4'>Cargando grupos...</p>
        </div>
      )}
    </div>
  );
}
