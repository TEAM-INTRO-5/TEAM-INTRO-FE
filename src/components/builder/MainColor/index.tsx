import React, { useEffect, useState } from 'react';
import Color, { Palette } from 'color-thief-react';
import ColorPicker from 'react-pick-color';
import useStore from '@/store';
import { PrimaryButton } from '@/components/common/button';
import Image from 'next/image';

export default function MainColor({ setIsColorPopup }: { setIsColorPopup: any }) {
  const [imgSrc, setImgSrc] = useState('');
  const { theme, setTheme } = useStore();
  // 저장하기 전 색상 값 관리
  const [color, setColor] = useState(theme.color);

  return (
    <div className="w-[532px] h-[438px] rounded-[8px] bg-white z-20 fixed top-[220px] left-[200px] mt-[20px] shadow-GrayScalePrimary-200 shadow-xl">
      {/* 선택한 색상 보여주기 */}
      <div
        style={{
          width: '114px',
          height: '114px',
          borderRadius: '50%',
          backgroundColor: color,
        }}
        className="absolute top-[60px] left-[65px]"
      ></div>
      {/* 이미지 색상 추출 */}
      {imgSrc !== '' ? (
        <Color src={imgSrc} crossOrigin="anonymous" format="hex">
          {({ data, loading }) => {
            useEffect(() => {
              if (!loading) {
                setColor(() => data as string);
              }
            }, [loading, data]);

            return null;
          }}
        </Color>
      ) : null}
      <div className="absolute border rounded-[8px] border-GrayScaleNeutral-200 w-[200px] h-[91px] top-[200px] left-[20px]">
        <PrimaryButton
          type="white"
          onClick={() => {}}
          text="로고에서 추출하기"
          classname="w-[184px] h-[36px] m-[8px]"
        />
        <div className="flex mt-[2px]">
          <div
            className="rounded-[6px] w-[22px] h-[22px] ml-[12px] mt-[1px]"
            style={{ backgroundColor: theme.color }}
          />
          <span className="ml-[10px] font-[400] text-[16px] tracking-[1px] mt-[1px]">{theme.color}</span>
        </div>
      </div>
      {/* 컬러피커 */}
      <div className="absolute top-[32px] right-[250px] text-[14px]">커스텀</div>
      <ColorPicker
        color={theme.color}
        onChange={(color) => {
          setColor(() => color.hex);
        }}
        // hideInputs
        theme={{
          background: '#fff',
          inputBackground: '#f4f4f4',
          color: '#262626',
          borderColor: '#D4D4D4',
          borderRadius: '5px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          width: '',
        }}
        className="absolute top-[57px] right-[15px] w-[180px]"
      />
      <button onClick={() => setIsColorPopup(false)}>
        <Image
          src="/close.png"
          alt="close"
          className="w-[14px] h-[auto] absolute top-[14px] right-[13px]"
          width={14}
          height={14}
        />
      </button>
      <div className="text-[12px] absolute bottom-[90px] left-[25px] w-[200px]">
        회사 로고는 &#91;대시보드&#8250;회사 정보 관리&#8250;기본 정보&#93;에서 설정 가능합니다
      </div>
      {/* 저장하기 */}
      <PrimaryButton
        type="primary"
        text="저장하기"
        onClick={() => {
          setTheme({ theme_type: theme.theme_type, color: color as string });
          setIsColorPopup(false);
        }}
        classname="w-[264px] h-[40px] absolute bottom-[20px] left-[calc(50%-132px)] text-[16px] font-[700]"
      />
    </div>
  );
}
