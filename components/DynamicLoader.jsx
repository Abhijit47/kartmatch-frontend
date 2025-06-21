import { PiSpinnerGapLight } from 'react-icons/pi';

export default function DynamicLoader() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <span className={'sr-only'}>Loading...</span>
      <PiSpinnerGapLight
        className={'size-4 md:size-6 lg:size-8 animate-spin'}
      />
    </div>
  );
}
