import SearchIcon from '@/assets/Icons/SearchIcon';
import Button from '@/components/common/Button';
import Dropdown, { Option } from '@/components/common/DropDown';

type FormStep1Props = {
  nextPage: () => void;
};

export default function FormStep1({ nextPage }: FormStep1Props) {
  const subjects: Option[] = [
    { label: 'Materia 1' },
    { label: 'Materia 2' },
    { label: 'Materia ...' },
    { label: 'Materia N' },
  ];
  return (
    <div className='grid grid-rows-3 justify-center gap-5'>
      <div className='text-primaryBlue pt-4 text-2xl font-bold'>
        Primero elije la materia del grupo
      </div>
      <Dropdown
        id='dropdown-group'
        options={subjects}
        Icon={<SearchIcon className='h-4 w-4' />}
      />
      <Button
        text='Siguiente'
        type='button'
        className='rounded-2xl bg-sky-950 hover:bg-sky-800'
        classNameWrapper='w-1/3'
        onClick={nextPage}
      />
    </div>
  );
}
