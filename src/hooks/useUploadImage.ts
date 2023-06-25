import { useMutation } from '@tanstack/react-query';
import { useBuilder } from './useBuilder';
import { uploadImage } from '@/apis/builder';
import { AxiosError } from 'axios';
import Router from 'next/router';
import useStore from '@/store';
import { useUpdateCompany } from './useUpdateCompany';

export const useUploadImage = (imgSrc: any, type: string) => {
  const { companyInfo, setCompanyInfo, siteInfo, setSiteInfo } = useStore();
  const { mutate } = useMutation(() => uploadImage({ image: imgSrc }), {
    onSuccess: (data) => {
      console.log(data);
      if (type === 'company') {
        setCompanyInfo({ ...companyInfo, logo: data.data.upload_path });
        useUpdateCompany(companyInfo);
      }
      if (type === 'site') {
        setSiteInfo({ ...siteInfo, pavicon: data.data.upload_path });
        useUpdateCompany(siteInfo);
      }
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
  return mutate;
};
