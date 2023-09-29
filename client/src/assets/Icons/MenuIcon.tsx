interface Props {
  className: string;
}

export default function MenuIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {' '}
      <line x1='3' y1='12' x2='21' y2='12' />{' '}
      <line x1='3' y1='6' x2='21' y2='6' />{' '}
      <line x1='3' y1='18' x2='21' y2='18' />
    </svg>
  );
}
