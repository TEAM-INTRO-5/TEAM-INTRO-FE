import { useMutation } from '@tanstack/react-query';
import { useBuilder } from './useBuilder';
import { uploadFile, uploadImage } from '@/apis/builder';
import { AxiosError } from 'axios';
import Router from 'next/router';
import useStore from '@/store';
import { useUpdateCompany } from './useUpdateCompany';
import { useUpdateSite } from './useUploadSite';
import { useUpdateKeyVisual } from './useUpdateKeyVusial';

export const useUploadFile = (fileSrc: any, type: string) => {
  const { setDownload, download } = useStore();
  const { mutate, isSuccess } = useMutation(() => uploadFile({ file: fileSrc }), {
    onSuccess: (data) => {
      // 데이터 성공 시 store에 저장 및 업데이트
      if (type === 'mediakit') {
        setDownload({ ...download, media_kit_file: data.data.upload_path });
      }
      if (type === 'introfile') {
        setDownload({ ...download, intro_file: data.data.upload_path });
      }
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
  return { mutate, isSuccess };
};
