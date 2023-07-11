import EditBuilder from '@/components/builder/LeftPanel';
import Layout from '@/components/builder/Layout';
import React, { useState } from 'react';
import { BeforeButtonSmall, PrimaryButton } from '@/components/common/button';
import { ToggleWidget } from '@/components/common/toggle';
import { BuilderInput, BuilderTextarea, BuilderUploadImage } from '@/components/common/input';
import useStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { updateMissionVision } from '@/apis/builder';
import Router from 'next/router';
import Image from 'next/image';

function Preview() {
  const { widgets, setToggle, missionVision, setMissionDetail, setVisionDetail, setMissionVision } = useStore();
  const findWigetToggle = widgets.find((widget) => widget.widget_id === 1);
  const { mutate: updateMissionVisionMutation } = useMutation(
    () => updateMissionVision({ widget_status: findWigetToggle?.toggle as boolean, ...missionVision }),
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
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 미션/비전" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/mission.png"
          alt="header/mission logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        미션/비젼
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        기업의 목적와 이루고자 하는 바와 해결하고자하는 문제, 그리고 기업이 바꾸어 갈 미래에 대해서 미션과 비전을 한
        문장으로 작성해주세요.
      </div>
      {/* 사용여부 */}
      <div className="mt-[48px] mb-[10px] font-[700] text-[14px] text-GrayScalePrimary-700">사용 여부</div>
      <ToggleWidget
        toggle={findWigetToggle?.toggle as boolean}
        setWidgetToggle={setToggle}
        widgetId={1}
        toggleText={{ true: '사용', false: '사용 안함' }}
      />
      {findWigetToggle?.toggle ? (
        <>
          {/* 미샨/비전 */}
          <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">미션/비전</div>
          <BuilderInput
            title="미션"
            type="text"
            placeholder="예: 우리는 이러한 가치를  추구합니다."
            id=""
            minLength={0}
            maxLength={25}
            value={missionVision.mission}
            onChange={(e) => {
              setMissionVision({ ...missionVision, mission: e.target.value });
            }}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">최대 25자</div>
          <BuilderTextarea
            title="미션 설명"
            type="text"
            placeholder="예: 삼성전자는 1969년 설립된 한국의 대표적인 전자 기업입니다. 삼성전자는 반도체, 스마트폰, TV, 가전제품 등 다양한 분야에서 세계적인 경쟁력을 갖추고 있습니다. "
            id="missionDetail"
            value={missionVision.mission_detail}
            setValue={setMissionDetail}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            &#8226; 미션을 보조하는 설명글을 작성해주세요. <br /> &#8226; 최대 80자
          </div>
          <BuilderInput
            title="비전"
            type="text"
            placeholder="예: 세상에서 가장 존경 받는 기업"
            id="vision"
            minLength={0}
            maxLength={25}
            value={missionVision.vision}
            onChange={(e) => {
              setMissionVision({ ...missionVision, vision: e.target.value });
            }}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">최대 25자</div>
          <BuilderTextarea
            title="비전 설명"
            type="text"
            placeholder="예: 삼성전자는 인류의 삶을 변화시키는 기술을 개발하고, 세상에서 가장 존경받는 기업이 되기 위해 노력하고 있습니다. "
            id="visionDetail"
            value={missionVision.vision_detail}
            setValue={setVisionDetail}
          />
          <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            &#8226; 비전을 보조하는 설명글을 작성해주세요. <br /> &#8226; 최대 80자
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
          updateMissionVisionMutation();
        }}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
    </div>
  );
}
export default function MissionVision() {
  return (
    <div>
      <Layout>{<Preview />}</Layout>
    </div>
  );
}
