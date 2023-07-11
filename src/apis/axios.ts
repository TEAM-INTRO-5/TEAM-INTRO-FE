import { getCookie } from '@/utils/cookies';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const getAxiosInstance = (option?: { multi?: boolean }) => {
  const config: AxiosRequestConfig = {
    // 타입 지정
    baseURL: '/',
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  };
  //.create() 메서드를 사용해 사용자 정의 구성을 사용하는 axios 인스턴스를 생성할 수 있습니다.
  const instance = axios.create(config); // instance: AxiosInstance 로 타입 추론

  // instance.defaults.timeout = 5000 //요청에 대한 응답 시간이 3초이상이면 요청 중단,instance생성 후 기본(defaults)값 설정

  //인터셉터는 then이나catch로 처리되기 전에 요청이나 응답을 가로챌 수 있습니다.
  instance.interceptors.request.use(
    (request) => {
      const token = getCookie('access_token');

      if (token) request.headers['Authorization'] = `${token}`;
      if (option && option.multi) request.headers['Content-Type'] = 'multipart/form-data';
      return request;
    },
    (error: AxiosError) => {
      // 에러타입 지정
      return Promise.reject(error);
    },
  );
  return instance;
};

export const axiosInstance = getAxiosInstance;

//로그인, 회원가입이 구현된 상태라면, 요청을 보낼 때 토큰값도 함께 보내주어야 합니다. (그렇게 해야만 백엔드에서 인증 여부를 확인할 수 있습니다.)

//그렇기 때문에 **instance 를 만들면서, 인터셉터 형태로 요청을 보낼 때마다 쿠키에 저장된 토큰을 가져와서 보내도록 작성을 해주겠습니다.
//(또한 withCredentials: true 로 설정해서 백엔드에서 쿠키를 설정할 수 있도록 해줍니다.)**

//앞으로는 위에서 작성한 `axiosInstance` 를 활용해서 요청을 보낼 예정입니다.
