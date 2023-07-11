import { BeforeButtonProps, PrimaryButtonProps } from '@/interfaces/button';
import useStore from '@/store';
import { useRouter } from 'next/router';
import Image from 'next/image';

// 이전으로 되돌아가는 버튼
// leftpanel
export function BeforeButtonSmall({ pageName }: BeforeButtonProps) {
  //제품/서비스 페이지에서 뒤로가기 클릭시 만들고 있던 아이템 삭제
  const { add, setAdd, teamadd, setTeamAdd, newsadd, setNewsAdd, historyadd, setHistoryAdd, products, setProducts } =
    useStore();

  const router = useRouter();
  const backPage = () => {
    if (add || teamadd || newsadd || historyadd) {
      setAdd(false);
      setTeamAdd(false);
      setNewsAdd(false);
      setHistoryAdd(false);
      setProducts(products.slice(0, -1));
    } else {
      router.back();
    }
  };
  return (
    <button
      className="flex mt-[12px]"
      onClick={() => {
        backPage();
      }}
    >
      <div className="w-[24px] h-[24px] bg-GrayScalePrimary-100 rounded-full pt-[5px]">
        <Image src="/east.png" alt="east" className="w-[12px] h-[auto] translate-x-[5px]" width={12} height={12} />
      </div>
      <p className="text-GrayScalePrimary-500 font-bold text-[14px] ml-[16px] translate-y-[2px]">{pageName}</p>
    </button>
  );
}

// 이전으로 되돌아가는 버튼
// 상단 메뉴바
export function BeforeButtonLarge({ pageName, classname }: BeforeButtonProps) {
  const router = useRouter();
  const backPage = () => {
    router.back();
  };
  return (
    <button
      className={'flex h-[24px] ' + classname}
      onClick={() => {
        backPage();
      }}
    >
      <Image src="/arrow_back.png" alt="arrow_back" className="w-[12px] h-[auto]" width={12} height={12} />
      <p className="font-[500] text-[18px] ml-[8px] translate-y-[-2px]">{pageName}</p>
    </button>
  );
}

// 기본 버튼
// type: primary, wihte
export function PrimaryButton({ type, text, onClick, classname, inputType, form, disabled }: PrimaryButtonProps) {
  const color =
    type === 'primary'
      ? 'bg-primary-500 text-white border-primary-500'
      : 'bg-white text-primary-500 border-primary-500 text-primary-500';
  return (
    <button
      // type={inputType}
      className={color + ' text-[14px] rounded-[6px] border-[2px] text-center cursor-pointer ' + classname}
      onClick={onClick}
      // value={text}
      form={form}
      // readOnly
      disabled={disabled}
    >
      {text}
    </button>
  );
}
