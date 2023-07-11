import {
  createIntroPageRequest,
  getIntroPageResponse,
  updateChannelRequest,
  updateCompanyInfoRequest,
  updateHeaderAndFooterRequest,
  updateIntroPageRequest,
  updateKeyVisualRequest,
  updateMissionVisionRequest,
  updateSiteInfoRequest,
  updateThemeRequest,
} from '@/interfaces/builder';
import { axiosInstance } from './axios';

export const getIntroPage = async () => {
  const { data } = await axiosInstance().get<getIntroPageResponse>(`/api/s/user/introPage`);
  return data;
};

export const createIntroPage = async (introPage: createIntroPageRequest) => {
  const { data } = await axiosInstance().post<any>('/api/s/user/introPage', introPage);
  return data;
};

export const updateIntroPage = async (introPage: updateIntroPageRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage', introPage);
  return data;
};

export const updateChannel = async (channel: updateChannelRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/channel', channel);
  const response = data.data;
  return response;
};

export const updateCompanyInfo = async (companyInfo: updateCompanyInfoRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/companyInfo', companyInfo);
  return data;
};

export const updateTheme = async (theme: updateThemeRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/theme', theme);
  return data;
};

export const updateHeaderAndFooter = async (headerAndFooter: updateHeaderAndFooterRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/headerAndFooter', headerAndFooter);
  return data;
};

export const updateKeyVisual = async (keyVisual: updateKeyVisualRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/keyVisualAndSlogan', keyVisual);
  return data;
};

export const updateMissionVision = async (missionVision: updateMissionVisionRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/missionAndVision', missionVision);
  return data;
};

export const updateSiteInfo = async (siteInfo: updateSiteInfoRequest) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/siteInfo', siteInfo);
  return data;
};

export const updateDownload = async (download: any) => {
  const { data } = await axiosInstance().patch<any>('/api/s/user/introPage/download', download);
  return data;
};

export const uploadImage = async (formData: { image: string }) => {
  const { data } = await axiosInstance({ multi: true }).post<any>('/api/s/user/uploadImage', formData);
  return data;
};

export const uploadFile = async (formData: { file: string }) => {
  const { data } = await axiosInstance({ multi: true }).post<any>('/api/s/user/uploadFile', formData);
  return data;
};
