import EditBuilder from '@/components/builder/LeftPanel';
import Layout from '@/components/builder/Layout';
import React, { useEffect, useState } from 'react';
import useStore from '@/store';
import { BeforeButtonSmall, PrimaryButton } from '@/components/common/button';
import { ToggleWidget } from '@/components/common/toggle';
import { BuilderInput, BuilderTextarea, BuilderUploadImage } from '@/components/common/input';
import { set } from 'react-hook-form';
import { useUpdateKeyVisual } from '@/hooks/useUpdateKeyVusial';
import { useUpdateSite } from '@/hooks/useUploadSite';
import { useUploadImage } from '@/hooks/useUploadImage';
import Image from 'next/image';

function Preview() {
  const { widgets, setToggle, keyVisual, uploadImage, setUploadImage, setBackground, setKeyVisual, setSloganDetail } =
    useStore();
  const findWigetToggle = widgets.find((widget) => widget.widget_id === 5);
  const updateKeyVisualMutation = useUpdateKeyVisual({ widget_status: findWigetToggle?.toggle, ...keyVisual });
  const { mutate: uploadImageMutation, isSuccess } = useUploadImage(uploadImage, 'keyvisual');

  useEffect(() => {
    if (isSuccess) {
      updateKeyVisualMutation();
    }
  }, [isSuccess]);
  return (
    <div className="ml-[28px]">
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 키비주얼/슬로건" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/keyvisual.png"
          alt="header/keyvisual logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        키 비주얼/슬로건
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        회사를 대표하는 이미지와 회사가 제공하는 것을 한 문장으로 요약하는 헤드라인을 작성해주세요. 평범하고 심플한
        문장으로 전달력을 높여주세요.
      </div>
      {/* 사용여부 */}
      <div className="mt-[48px] mb-[10px] font-[700] text-[14px] text-GrayScalePrimary-700">사용 여부</div>
      <ToggleWidget
        toggle={findWigetToggle?.toggle as boolean}
        setWidgetToggle={setToggle}
        widgetId={5}
        toggleText={{ true: '사용', false: '사용 안함' }}
      />
      {findWigetToggle?.toggle ? (
        <>
          {/* 상단 메뉴 */}
          <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">상단 메뉴</div>
          <BuilderUploadImage
            title="배경 이미지"
            ratio={1280 / 630}
            imgSrc={keyVisual.background}
            setImgSrc={setBackground}
            setUploadImg={setUploadImage}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            1280x630, png 권장
          </div>
          <div className="mt-[24px] font-[700] text-[14px] mb-[15px] text-GrayScalePrimary-700">필터 선택</div>
          <label>
            <input
              type="radio"
              value="black"
              checked={keyVisual.filter === 'BLACK'}
              onChange={() => {
                setKeyVisual({ ...keyVisual, filter: 'BLACK' });
              }}
              className="mr-2 text-GrayScalePrimary-700"
            />
            블랙 필터
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="white"
              checked={keyVisual.filter === 'WHITE'}
              onChange={() => {
                setKeyVisual({ ...keyVisual, filter: 'WHITE' });
              }}
              className="mr-2 text-GrayScalePrimary-700 ml-[24px]"
            />
            화이트 필터
          </label>
          {/* 슬로건 */}
          <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">슬로건</div>
          <BuilderInput
            title="슬로건"
            type="text"
            placeholder="예: 우리는 이러한 가치를  추구합니다."
            id="slogan"
            minLength={8}
            maxLength={40}
            value={keyVisual.slogan}
            onChange={(e) => {
              setKeyVisual({ ...keyVisual, slogan: e.target.value });
            }}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            &#8226; 회사를 설명하는 간략하고 인상깊은 문구를 작성해주세요.
            <br /> &#8226; 최소 8자/최대 40자
          </div>
          <BuilderTextarea
            title="슬로건 상세"
            type="text"
            placeholder="회사에 대한 모든 정보는 여기에
        예: 회사와 회사 간의 연결로 서로 성장 할 수 있도록 합니다. "
            id="sloganDetail"
            value={keyVisual.slogan_detail}
            setValue={setSloganDetail}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            &#8226; 슬로건을 뒷받침하는 부가 설명을 추가해주세요. <br /> &#8226; 최대 80자
          </div>
        </>
      ) : (
        <></>
      )}

      {/* 저장하기 */}
      <PrimaryButton
        inputType="submit"
        type="primary"
        text="저장하기"
        onClick={() => {
          if (keyVisual.background === '') {
            updateKeyVisualMutation();
          } else {
            uploadImageMutation();
          }
        }}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
    </div>
  );
}

export default function KeyVisual() {
  return (
    <div>
      <Layout>{<Preview />}</Layout>
    </div>
  );
}
