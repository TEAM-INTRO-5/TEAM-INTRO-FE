import EditBuilder from '@/components/builder/LeftPanel';
import Layout from '@/components/builder/Layout';
import React, { useEffect, useState } from 'react';
import useStore from '@/store';
import { BeforeButtonSmall, PrimaryButton } from '@/components/common/button';
import { ToggleWidget } from '@/components/common/toggle';
import { BuilderInput, BuilderTextarea, BuilderUploadFile, BuilderUploadImage } from '@/components/common/input';
import { set } from 'react-hook-form';
import { useUpdateKeyVisual } from '@/hooks/useUpdateKeyVusial';
import { useUpdateSite } from '@/hooks/useUploadSite';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useMutation } from '@tanstack/react-query';
import { updateDownload } from '@/apis/builder';
import Router from 'next/router';
import Image from 'next/image';

function Preview() {
  const { widgets, setToggle, download, setDownload } = useStore();
  const findWigetToggle = widgets.find((widget) => widget.widget_id === 12);
  const { mutate: updateDownloadMutation } = useMutation(
    () => updateDownload({ widget_status: findWigetToggle?.toggle as boolean, ...download }),
    {
      onSuccess: (data) => {
        console.log('success', data);
        Router.push('/builder');
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  return (
    <div className="ml-[28px]">
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 다운로드" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/download.svg"
          alt="download logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        다운로드
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        우리 회사 정보를 쉽게 다운받을 수 있도록 제공해주세요
      </div>
      {/* 사용여부 */}
      <div className="mt-[48px] mb-[10px] font-[700] text-[14px] text-GrayScalePrimary-700">사용 여부</div>
      <ToggleWidget
        toggle={findWigetToggle?.toggle as boolean}
        setWidgetToggle={setToggle}
        widgetId={12}
        toggleText={{ true: '사용', false: '사용 안함' }}
      />
      {findWigetToggle?.toggle ? (
        <>
          {/* 다운로드 */}
          <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">다운로드</div>
          <BuilderInput
            title="설명"
            type="text"
            placeholder="예: DOWNLOAD / 자세한 소개자료를 만드세요."
            id="download-title"
            maxLength={30}
            value={download.description}
            onChange={(e) => {
              setDownload({ ...download, description: e.target.value });
            }}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">최대 30자</div>
          <BuilderUploadFile title="미디어 키트" type="mediakit" />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            pdf 권장, 최대 100MB
          </div>
          <BuilderUploadFile title="회사소개서" type="introfile" />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            pdf 권장, 최대 100MB
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
          updateDownloadMutation();
        }}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
    </div>
  );
}

export default function Download() {
  return (
    <div>
      <Layout>{<Preview />}</Layout>
    </div>
  );
}
