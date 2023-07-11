import EditBuilder from '@/components/builder/LeftPanel';
import Layout from '@/components/builder/Layout';
import React, { useState } from 'react';
import { BeforeButtonSmall, PrimaryButton } from '@/components/common/button';
import { ToggleWidget } from '@/components/common/toggle';
import { BuilderCheckbox, BuilderInput, BuilderTextarea, BuilderUploadImage } from '@/components/common/input';
import useStore from '@/store';
import { channel } from 'diagnostics_channel';
import { channelList } from '@/data/channel';
import { useMutation } from '@tanstack/react-query';
import { updateChannel } from '@/apis/builder';
import Router from 'next/router';
import Image from 'next/image';

function Preview() {
  const { widgets, setToggle, channel, setChannel } = useStore();
  const findWigetToggle = widgets.find((widget) => widget.widget_id === 14);
  const { mutate: updateChannelMutation } = useMutation(
    () => updateChannel({ widget_status: findWigetToggle?.toggle as boolean, ...channel }),
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
      <BeforeButtonSmall pageName="빌더 &#8739; 위젯 &#8739; 채널" />
      <div className="font-[700] text-[24px] mt-[16px] flex">
        <Image
          src="/chat-sleep-outline.png"
          alt="header/chat-sleep-outline logo img"
          className="w-[26px] h-[26px] mr-[4px] translate-y-1"
          width={26}
          height={26}
        />
        채널
      </div>
      <div className="w-[260px] font-[500] text-[16px] mt-[16px] text-GrayScalePrimary-700">
        회사에서 운영하는 고객과의 소통 채널들을 등록해주세요. 현재 활발하게 운영하는 채널들만 보여주세요.
      </div>
      {/* 사용여부 */}
      <div className="mt-[48px] mb-[10px] font-[700] text-[14px] text-GrayScalePrimary-700">사용 여부</div>
      <ToggleWidget
        toggle={findWigetToggle?.toggle as boolean}
        setWidgetToggle={setToggle}
        widgetId={14}
        toggleText={{ true: '사용', false: '사용 안함' }}
      />
      {findWigetToggle?.toggle ? (
        <>
          {/* SNS 채넣 */}
          <div className="mt-[48px] font-[700] text-[18px] text-GrayScalePrimary-700">SNS 채널</div>
          {channelList.map((item, index) => {
            if (item.name === '인스타그램') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.instagram_status}
                  onChange={(e) => setChannel({ ...channel, instagram: e.target.value })}
                  setChecked={() => setChannel({ ...channel, instagram_status: !channel.instagram_status })}
                  value={channel.instagram}
                  key={index}
                />
              );
            } else if (item.name === '링크드인') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.linked_in_status}
                  onChange={(e) => setChannel({ ...channel, linked_in: e.target.value })}
                  setChecked={() => setChannel({ ...channel, linked_in_status: !channel.linked_in_status })}
                  value={channel.linked_in}
                  key={index}
                />
              );
            } else if (item.name === '유튜브') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.youtube_status}
                  onChange={(e) => setChannel({ ...channel, youtube: e.target.value })}
                  setChecked={() => setChannel({ ...channel, youtube_status: !channel.youtube_status })}
                  value={channel.youtube}
                  key={index}
                />
              );
            } else if (item.name === '노션') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.notion_status}
                  onChange={(e) => setChannel({ ...channel, notion: e.target.value })}
                  setChecked={() => setChannel({ ...channel, notion_status: !channel.notion_status })}
                  value={channel.notion}
                  key={index}
                />
              );
            } else if (item.name === '네이버블로그') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.naver_blog_status}
                  onChange={(e) => setChannel({ ...channel, naver_blog: e.target.value })}
                  setChecked={() => setChannel({ ...channel, naver_blog_status: !channel.naver_blog_status })}
                  value={channel.naver_blog}
                  key={index}
                />
              );
            } else if (item.name === '브런치스토리') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.brunch_stroy_status}
                  onChange={(e) => setChannel({ ...channel, brunch_stroy: e.target.value })}
                  setChecked={() => setChannel({ ...channel, brunch_stroy_status: !channel.brunch_stroy_status })}
                  value={channel.brunch_stroy}
                  key={index}
                />
              );
            } else if (item.name === '페이스북') {
              return (
                <BuilderCheckbox
                  list={item}
                  checked={channel.facebook_status}
                  onChange={(e) => setChannel({ ...channel, facebook: e.target.value })}
                  setChecked={() => setChannel({ ...channel, facebook_status: !channel.facebook_status })}
                  value={channel.facebook}
                  key={index}
                />
              );
            } else {
              return null;
            }
          })}
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
          updateChannelMutation();
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
