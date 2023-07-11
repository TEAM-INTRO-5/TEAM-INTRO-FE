import Layout from '@/components/builder/Layout';
import React, { useEffect, useState } from 'react';
import { BeforeButtonSmall } from '@/components/common/button';
import useStore from '@/store';
import { PrimaryButton } from '@/components/common/button';
import { Toggle, ToggleLarge, ToggleWidget } from '@/components/common/toggle';
import { ProductTitle } from '@/components/common/product';
import { BuilderInput, BuilderSelect, BuilderTextarea, BuilderUploadImage } from '@/components/common/input';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { getCookie } from '@/utils/cookies';
import { useMutation } from '@tanstack/react-query';
import { productadd, productdelete, productview } from '@/apis/auth';
import { useRouter } from 'next/router';
import { Popup } from '@/components/common/popup';
import { validateImageSize } from '@/utils/fileCheck';
import { ProductDelete } from '@/interfaces/auth';
import Image from 'next/image';

function PartnerView() {
  const {
    widgets,
    setToggle,
    keyVisual,
    uploadImage,
    setUploadImage,
    setBackground,
    setKeyVisual,
    setSloganDetail,
    add,
    setAdd,
  } = useStore();
  const findWigetToggle = widgets.find((widget) => widget.widget_id === 13);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <div className="ml-[28px]">
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 파트너스" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/partners.svg"
          alt="partners logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        파트너스
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        우리 회사와 연결된 기업들을 알려주세요.
      </div>
      {/* 사용여부 */}
      <div className="mt-[48px] mb-[10px] font-[700] text-[14px] text-GrayScalePrimary-700">사용 여부</div>
      <ToggleWidget
        toggle={findWigetToggle?.toggle as boolean}
        setWidgetToggle={setToggle}
        widgetId={13}
        toggleText={{ true: '사용', false: '사용 안함' }}
      />
      {findWigetToggle?.toggle ? (
        <>
          <div className="mt-[48px]">
            <span className="font-bold text-lg/[110%] text-[#57566a]">파트너스 편집</span>
          </div>
          <ProductTitle
            onClick={() => {
              setAdd(true);
            }}
            deleteSelectedClick={() => {}}
            handleCheckboxChange={() => {}}
            selectedItems={selectedItems}
            setSelectedItems={() => {}}
          />
        </>
      ) : (
        <></>
      )}
      {/* 저장하기 */}
      <PrimaryButton
        form="view"
        type="primary"
        text="저장하기"
        onClick={() => {}}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
    </div>
  );
}

function PartnerUpload() {
  const { setUploadImage } = useStore();

  return (
    <div className="ml-[28px]">
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 파트너스" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/partners.svg"
          alt="partners logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        파트너스
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        우리 회사와 연결된 기업들을 알려주세요.
      </div>
      {/* 파트너스 추가하기 */}
      <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">파트너스 추가하기</div>
      <BuilderSelect title="구분" />
      <BuilderInput
        title="회사 이름"
        type="text"
        placeholder="예: 질링스"
        value={''}
        onChange={(e) => {}}
        maxLength={40}
        id="representativeName"
        required={true}
      />
      <div className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">최대 40자</div>
      <BuilderUploadImage title="회사 로고" ratio={1} imgSrc={''} setImgSrc={() => {}} setUploadImg={setUploadImage} />
      {/* 저장하기 */}
      <PrimaryButton
        type="primary"
        text="저장하기"
        inputType="submit"
        onClicka={() => {}}
        classname="w-[264px] h-[42px] mt-[48px] text-[18px] font-[700]"
      />
    </div>
  );
}

export default function Product() {
  const { add } = useStore();
  return <div>{add ? <Layout>{<PartnerUpload />}</Layout> : <Layout>{<PartnerView />}</Layout>}</div>;
}
