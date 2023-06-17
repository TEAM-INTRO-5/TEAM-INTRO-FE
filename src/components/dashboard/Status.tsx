import CompanyPreview from './CompanyPreview';
import Menus from './Menus';

export default function Status() {
  return (
    <div className='w-[248px] h-[200px] border border-GrayScalePrimary-200 rounded-xl space-y-10'>
      <CompanyPreview />
      <Menus />
    </div>
  );
}
