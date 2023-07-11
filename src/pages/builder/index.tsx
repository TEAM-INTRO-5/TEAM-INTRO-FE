import React, { useEffect, useState } from 'react';
import Layout from '@/components/builder/Layout';
import LeftPanal from '@/components/builder/LeftPanel';
import { useQuery } from '@tanstack/react-query';
import { get } from 'http';
import { getIntroPage } from '@/apis/builder';
import useStore from '@/store';
import { useBuilder } from '@/hooks/useBuilder';
import { set } from 'react-hook-form';
import { widgetName } from '@/data/widgetName';
import { postIntroPageUser } from '@/apis/subdomain';

export default function Builder() {
  const { data: builderData, isLoading } = useBuilder();
  const {
    setTheme,
    setSiteInfo,
    setCompanyInfo,
    setHeaderAndFooterList,
    resetUploadImage,
    uploadImage,
    setKeyVisual,
    setMissionVision,
    setChannel,
    setDownload,
    setIsPublicToggle,
    setWidget,
    setProducts,
    setTeamMember,
    setHistorys,
    setNews,
  } = useStore();
  useEffect(() => {
    if (!isLoading) {
      if (builderData?.widgets) {
        const widgetData = builderData.widgets.map((widget: any) => {
          return {
            widget_id: widget.widget_type,
            toggle: widget.widget_status,
            order_list: widget.order,
          };
        });
        const keyvisual = builderData.widgets.find((widget: any) => widget.widget_type === 5);
        const missionvision = builderData.widgets.find((widget: any) => widget.widget_type === 1);
        const channel = builderData.widgets.find((widget: any) => widget.widget_type === 14);
        const download = builderData.widgets.find((widget: any) => widget.widget_type === 12);
        const products = builderData.widgets.find((widget: any) => widget.widget_type === 2);
        const teammembers = builderData.widgets.find((widget: any) => widget.widget_type === 6);
        const historys = builderData.widgets.find((widget: any) => widget.widget_type === 9);
        const news = builderData.widgets.find((widget: any) => widget.widget_type === 11);
        setHeaderAndFooterList(builderData.header_and_footer.header_and_footer_status_list);
        setCompanyInfo(builderData.company_info);
        setSiteInfo(builderData.site_info);
        setTheme({ theme_type: builderData.theme.type, color: builderData.theme.color });
        if (keyvisual) {
          setKeyVisual({
            background: keyvisual.background === undefined ? '' : keyvisual.background,
            slogan: keyvisual.slogan === undefined ? '' : keyvisual.slogan,
            filter: keyvisual.filter === undefined ? '' : keyvisual.filter,
            slogan_detail: keyvisual.slogan_detail === undefined ? '' : keyvisual.slogan_detail,
          });
        }
        if (missionvision) {
          setMissionVision({
            mission: missionvision.mission,
            mission_detail: missionvision.mission_detail,
            vision: missionvision.vision,
            vision_detail: missionvision.vision_detail,
          });
        }
        if (channel !== undefined && channel.sns_list !== undefined) {
          setChannel({
            instagram_status:
              channel.sns_list.instagram_status === undefined ? false : channel.sns_list.instagram_status,
            instagram: channel.sns_list.instagram === undefined ? '' : channel.sns_list.instagram,
            linked_in_status:
              channel.sns_list.linked_in_status === undefined ? false : channel.sns_list.linked_in_status,
            linked_in: channel.sns_list.linked_in === undefined ? '' : channel.sns_list.linked_in,
            youtube_status: channel.sns_list.youtube_status === undefined ? false : channel.sns_list.youtube_status,
            youtube: channel.sns_list.youtube === undefined ? '' : channel.sns_list.youtube,
            notion_status: channel.sns_list.notion_status === undefined ? false : channel.sns_list.notion_status,
            notion: channel.sns_list.notion === undefined ? '' : channel.sns_list.notion,
            naver_blog_status:
              channel.sns_list.naver_blog_status === undefined ? false : channel.sns_list.naver_blog_status,
            naver_blog: channel.sns_list.naver_blog === undefined ? '' : channel.sns_list.naver_blog,
            brunch_stroy_status:
              channel.sns_list.brunch_stroy_status === undefined ? false : channel.sns_list.brunch_stroy_status,
            brunch_stroy: channel.sns_list.brunch_stroy === undefined ? '' : channel.sns_list.brunch_stroy,
            facebook_status: channel.sns_list.facebook_status === undefined ? false : channel.sns_list.facebook_status,
            facebook: channel.sns_list.facebook === undefined ? '' : channel.sns_list.facebook,
          });
        }
        if (download !== undefined) {
          setDownload({
            description: download.description === undefined ? '' : download.description,
            intro_file: download.intro_file === undefined ? '' : download.intro_file,
            media_kit_file: download.media_kit_file === undefined ? '' : download.media_kit_file,
          });
        }
        setIsPublicToggle(builderData.intro_page_status === 'PRIVATE' ? false : true);
        setWidget(widgetData);

        if (products !== undefined) {
          const updatedProducts = products.products_and_services_elements.map((item: any, index: any) => {
            if (index === products.length - 1) {
              return {
                ...item,
                products_and_services_element_id: item.products_and_services_element_id,
                order: item.order,
                name: item.name,
                title: item.title,
                description: item.description,
                image: item.image,
              };
            }
            return item;
          });
          setProducts(updatedProducts);
        }

        if (teammembers !== undefined) {
          const updatedTeamMembers = teammembers.team_member_elements.map((item: any, index: any) => {
            if (index === products.length - 1) {
              return {
                ...item,
                team_member_element_id: item.team_member_element_id,
                order: item.order,
                profile: item.profile,
                group: item.group,
                name: item.name,
                position: item.position,
                tagline: item.tagline,
                email: item.email,
                sns_status: item.sns_status,
              };
            }
            return item;
          });
          setTeamMember(updatedTeamMembers);
        }

        // 연혁
        if (historys !== undefined && historys.history_elements !== undefined) {
          const updatedHistorys = historys.history_elements.map((item: any, index: any) => {
            if (index === historys.length - 1) {
              return {
                ...item,
                history_element_id: item.history_element_id,
                date: item.date,
                description: item.description,
                title: item.title,
                image: item.image,
              };
            }
            return item;
          });
          setHistorys(updatedHistorys);
        }
        if (news !== undefined && news.news_elements !== undefined) {
          const updatedNews = news.news_elements.map((item: any, index: any) => {
            if (index === news.length - 1) {
              return {
                ...item,
                news_element_id: item.news_element_id,
                order: item.order,
                date: item.date,
                description: item.description,
                title: item.title,
                image: item.image,
                press: item.press,
              };
            }
            return item;
          });
          setNews(updatedNews);
        }
      }
    }
  }, [builderData]);
  // 페이지 진입 시 resetUploadImage 호출
  useEffect(() => {
    resetUploadImage();
    return setIsPublicToggle(false);
  }, []);
  return (
    <>
      <Layout>{<LeftPanal />}</Layout>
    </>
  );
}
