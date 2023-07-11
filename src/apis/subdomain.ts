import { postIntroPageUserRequest } from '@/interfaces/subdoamin';
import { axiosInstance } from './axios';

export const postIntroPageUser = async (intro: postIntroPageUserRequest) => {
  const { data } = await axiosInstance().post<any>('/api/introPage', intro);
  return data;
};
