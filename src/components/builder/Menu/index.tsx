import React from 'react';
import { useRouter } from 'next/router';
import { MenuAProps, MenuBProps } from '@/interfaces/builder';
import { ToggleSmall } from '@/components/common/toggle';
import useStore from '@/store';
import { widgetName } from '@/data/widgetName';
import Image from 'next/image';

// 빌더 Leftpanel 패널 메뉴
// 테마 뱐경, 회사 정보 수정, 사이트 정보 수정
export function MenuA({ routerName, buttonName }: MenuAProps) {
  const router = useRouter();

  return (
    <div className={'relative'}>
      <button
        onClick={() => router.push(routerName)}
        className={
          'w-[264px] h-[46px] text-[16px] text-[500] text-left  px-[16px] mb-[6px] hover:bg-GrayScalePrimary-100 hover:border-r-[4px] hover:border-primary-500 '
        }
      >
        {buttonName}
      </button>
    </div>
  );
}

// 빌더 Leftpanel 위젯 메뉴
// 위젯 토글
export function MenuB({ routerName, buttonId }: MenuBProps) {
  const router = useRouter();
  // 위젯 목록과 순서변경 토글 상태를 store에서 가져옴
  const { widgets, isChangeOederToggle } = useStore();
  // 위젯 목록에서 현재 위젯을 찾아서 가져옴
  const widget = widgets.find((widget) => widget.widget_id === buttonId);
  return (
    <div
      className={
        'relative hover:text-primary-500 w-[264px] h-[46px] text-[16px] text-[500] text-left  px-[16px] mb-[6px] ' +
        // 사용중인 위젯인 경우
        (widget?.toggle
          ? // 필수 위젯이 아니지만, 현재 사용중인 경우
            'border-primary-500 bg-GrayScalePrimary-100'
          : '')
      }
    >
      {/* 하위 페이지로 이동 */}
      <button
        onClick={() => {
          if (widget?.toggle) {
            router.push(routerName);
          } else if (
            widget?.widget_id === 4 ||
            widget?.widget_id === 8 ||
            widget?.widget_id === 13 ||
            widget?.widget_id === 10
          ) {
            alert('해당 위젯은 곧 추가될 예정입니다.');
          } else {
            alert('사용중인 위젯만 수정 가능합니다.');
          }
        }}
        className={'w-[200px] h-full text-left'}
      >
        <p className="indent-[35px]">{widgetName[widget!.widget_id - 1]?.name}</p>
      </button>
      <div className="absolute top-[16px] left-[15px]">
        {/* 해당 위젯을 사용하는지 알려주는 토글 */}
        <ToggleSmall buttonId={widget!.widget_id}></ToggleSmall>
      </div>
      {/* 순서 변경 토글이 true이며 사용하는 위젯인 경우 순서 변경 핸들러 활성화 */}
      {isChangeOederToggle && widget?.toggle ? (
        <div>
          <Image
            src="/handler.png"
            className="w-[24px] h-[24px] absolute top-[11px] right-[16px]"
            alt="hanlder-img"
            width={24}
            height={24}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

// 빌더 Leftpanel 위젯 메뉴
// 필수 위젯 토글
export function MenuC({ routerName, buttonName }: MenuAProps) {
  const router = useRouter();
  // 위젯 목록과 순서변경 토글 상태를 store에서 가져옴
  const { widgets, isChangeOederToggle } = useStore();
  return (
    <div
      className={
        'relative hover:text-primary-500 w-[264px] h-[46px] text-[16px] text-[500] text-left  px-[16px] mb-[6px] ' +
        'border-r-[4px] border-primary-500 bg-GrayScalePrimary-100'
      }
    >
      {/* 하위 페이지로 이동 */}
      <button
        onClick={() => {
          router.push(routerName);
        }}
        className={'w-[200px] h-full text-left'}
      >
        <p className="">{buttonName}</p>
      </button>
    </div>
  );
}
