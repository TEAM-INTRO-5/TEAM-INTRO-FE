import Layout from '@/components/builder/Layout';
import React, { useState } from 'react';
import { BeforeButtonSmall } from '@/components/common/button';
import useStore from '@/store';
import { PrimaryButton } from '@/components/common/button';
import MainColor from '@/components/builder/MainColor';
import { useMutation } from '@tanstack/react-query';
import { updateTheme } from '@/apis/builder';
import Router from 'next/router';
import Image from 'next/image';

function Preview() {
  // 테마 변경을 위한 함수와 객체
  const { theme, setTheme } = useStore();
  const [isColorPopup, setIsColorPopup] = useState(false);
  const { mutate: updateThemeMutation } = useMutation(() => updateTheme(theme), {
    onSuccess: (data) => {
      console.log('success', data);
      Router.push('/builder');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  return (
    <div className="ml-[28px]">
      <BeforeButtonSmall pageName="빌더 &#8739; 테마 변경" />
      <div className="font-[700] text-[24px] mt-[16px]">테마 변경</div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        테마를 선택하고 포인트 색상을 변경해주세요.
      </div>
      {/* 테마 선택 */}
      <button
        className={
          'w-[264px] h-[112px] mt-[24px] ' +
          (theme.theme_type === 'ThemeA'
            ? 'border-[3px] rounded-[13px] border-primary-500'
            : 'border-[3px] border-white')
        }
        onClick={() => setTheme({ theme_type: 'ThemeA', color: theme.color })}
      >
        <Image src="/ThemeA.png" alt="ThemeA" className="w-[252px] h-[auto] ml-[4px]" width={252} height={100} />
      </button>
      <button
        className={
          'w-[264px] h-[112px] mt-[8px] ' +
          (theme.theme_type === 'ThemeB'
            ? 'border-[3px] rounded-[13px] border-primary-500'
            : 'border-[3px] border-white')
        }
        onClick={() => setTheme({ theme_type: 'ThemeB', color: theme.color })}
      >
        <Image src="/ThemeB.png" alt="ThemeB" className="w-[252px] h-[auto] ml-[4px]" width={252} height={100} />
      </button>
      <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">기본 색상 변경</div>
      {/* 색상 선택 */}
      <div className="w-[264px] h-[42px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] flex py-[7px]">
        <div className="rounded-[6px] w-[26px] h-[24px] ml-[12px] mt-[1px]" style={{ backgroundColor: theme.color }} />
        <span className="ml-[14px] font-[400] text-[18px] tracking-[1px]">{theme.color}</span>
      </div>
      <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[16px]">
        회사 로고를 구성하는 색상, 대표 이미지에서 추출할 수 있는 색상을 선택하는 것을 추천드립니다.
      </div>
      <PrimaryButton
        type="white"
        text="색상 변경하기"
        onClick={() => {
          setIsColorPopup((isColorPopup) => !isColorPopup);
        }}
        classname="w-[264px] h-[42px] mt-[16px] text-[18px] font-[700]"
      />
      {/* 저장하기 */}
      <PrimaryButton
        type="primary"
        text="저장하기"
        onClick={() => {
          updateThemeMutation();
        }}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
      {isColorPopup ? <MainColor setIsColorPopup={setIsColorPopup} /> : <></>}
    </div>
  );
}

export default function ChangeTheme() {
  return (
    <div>
      <Layout>{<Preview />}</Layout>
    </div>
  );
}
