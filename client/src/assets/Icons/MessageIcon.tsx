interface Props {
  className: string;
}

export default function MessageIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {' '}
      <path stroke='none' d='M0 0h24v24H0z' />{' '}
      <rect x='3' y='5' width='18' height='14' rx='2' />{' '}
      <polyline points='3 7 12 13 21 7' />
    </svg>
  );
}
