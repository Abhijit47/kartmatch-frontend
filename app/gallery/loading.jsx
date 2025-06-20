import { PiSpinnerGap } from 'react-icons/pi';

export default function Loading() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <PiSpinnerGap className={'size-4 md:size-6 lg:size-8 animate-spin'} />
    </div>
  );
}
