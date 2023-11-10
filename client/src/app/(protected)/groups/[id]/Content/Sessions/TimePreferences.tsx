import React from 'react';
import { StudyGroup, TimeOfDay } from '@/types/StudyGroup';
import { translatePreference, translateSpanishDays } from '@/utils/Formatter';

type TimePreferencesProps = {
  group: StudyGroup;
};

export default function TimePreferences({ group }: TimePreferencesProps) {
  const dayOfWeeks = Object.keys(translateSpanishDays);
  const timePreference = group.time_preferences as any;

  return (
    <>
      {group.time_preferences && (
        <table className='mb-5 min-w-full border-collapse bg-white'>
          <thead>
            <tr>
              <th className='border px-4 py-2 font-poppins'>Día</th>
              <th className='border px-4 py-2 font-poppins'>
                Preferencia de Horario
              </th>
            </tr>
          </thead>
          <tbody>
            {dayOfWeeks.map((day: any) => {
              const englishDay = translateSpanishDays[day];
              const dayPreference = translatePreference(
                timePreference[englishDay]
              );
              return (
                <tr key={day}>
                  <td className='border px-4 py-2 font-poppins'>{day}</td>
                  <td className='border px-4 py-2 font-poppins'>
                    {dayPreference || translatePreference(TimeOfDay.No)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
