import { deleteuser, emailcheck, emailconfirm, repass, user, usermodify } from '@/apis/auth';
import Button from '@/components/button';
import { Popup } from '@/components/common/popup';
import Input from '@/components/input';
import { getCookie } from '@/utils/cookies';
import { cls } from '@/utils/utile';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setTimeout } from 'timers';

interface EnterForm {
  password: string;
  new_password: string;
  new_passwordConfirm: string;
  id: string;
  email: string;
  bizNum: string;
  code: string;
  image: FileList;
}
function RePass() {
  const [emailmesaage, setEmailMessage] = useState('');
  const [emaildata, setEmailData] = useState('');
  const [confirmmessage, setConFirmMessage] = useState('');
  const [confirmdata, setConFirmdata] = useState('');
  const [confirmerrmessage, setConFirmErrMessage] = useState('');
  const [SignMessage, setSignMessage] = useState('');

  const { isLoading, data } = useQuery(['user'], user);

  const login_id = data?.login_id;
  const biz_num = data?.biz_num;

  const [method, setMethod] = useState<'info' | 'pass'>('info');
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<EnterForm>();
  const email = watch('email');
  const oldpass = watch('password');
  const newpass = watch('new_password');
  const newpasscon = watch('new_passwordConfirm');
  const code = watch('code');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setEmailMessage('');
    setConFirmMessage('');
    setSignMessage('');
    setIsOpen(false);
  };

  const image = watch('image');
  const [avatarPreview, setAvatarPreview] = useState('');
  // const [avatar, setAvatar] = useState("");
  const [marketing, setMarketing] = useState(false);
  const alarmonClick = () => {
    setMarketing(!marketing);
  };

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [image]);

  const {
    mutate: usermutate,
    isLoading: userLoading,
    error: usererror,
  } = useMutation(usermodify, {
    onSuccess: (data) => {
      setSignMessage('성공적으로 저장 되었습니다.');
      openModal();
      setTimeout(() => {
        router.replace('/dashboard/main');
      }, 2000);
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
    },
  });
  const {
    mutate: checkemailmutate,
    isLoading: emailLoading,
    error: checkemailerror,
  } = useMutation(emailcheck, {
    onSuccess: (data) => {
      setEmailMessage('메일이 발송되었습니다.');
      setEmailData(data);
      openModal();
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
    },
  });
  const { mutate: checkconfirmmutate, error: checkconfirmerror } = useMutation(emailconfirm, {
    onSuccess: (data) => {
      setConFirmMessage('인증되었습니다.');
      setConFirmdata(data);
      openModal();
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
      setConFirmErrMessage(data.value);
    },
  });
  const checkemailonClick = () => {
    if (errors.email?.message) {
      return;
    } else {
      if (emailLoading) return;
      checkemailmutate({ email, dup_check: false });
    }
  };
  const checkconfirmonClick = () => {
    checkconfirmmutate({ code });
  };

  const oninfoClick = () => {
    reset();
    setMethod('info');
  };
  const onpassClick = () => {
    reset();
    setMethod('pass');
  };

  const { mutate, error } = useMutation(repass, {
    onSuccess: (data) => {
      alert('비밀번호가 변경되었습니다');
    },
    onError: (err: AxiosError) => {},
  });
  // 비밀번호 재설정
  const onValid = (data: EnterForm) => {
    const user = {
      password: data.password,
      new_password: data.new_password,
    };
    mutate(user);
  };
  // 기본정보 수정
  const token = getCookie('access_token');
  const onValids = async (data: EnterForm) => {
    const image = watch('image');

    const form = new FormData();
    form.append('image', data.image[0]);
    form.append('name', `${image}`);
    form.append('type', 'string');
    try {
      const response = await axios.post('/api/s/user/uploadImage', form, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const avatar = response.data.data.upload_path;

      const user = {
        email: data.email,
        profile: avatar,
        marketing: marketing,
      };
      if (confirmdata) {
        usermutate(user);
      }
    } catch (error) {}
  };
  // 회원 탈퇴
  const deletetoken = getCookie('access_token');
  const { mutate: deletemutate } = useMutation(deleteuser, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  const userDeleteClick = () => {
    deletemutate(deletetoken);
  };
  return (
    <div>
      <div className="h-[65px] border-solid border-b-[1px] border-primary-500">
        <Image src="/zlllinks.png" alt="emblem1" width={150} height={52.5} className="ml-[20px] mt-[10px]" />
      </div>
      <div className="flex">
        <div className="w-[296px] h-[100vh] border-solid border-r-[1px] border-[#c1c0cc]">
          <div className="w-[146px] h-[30px] ml-[75px] mt-[24px] flex">
            <Image src="/account_circle.png" alt="account_circle" width={30} height={30} className="mr-[10px]" />
            <span className="text-xl/[140%] font-bold">마이페이지</span>
          </div>
          <div className="w-[240px] h-[102px] mt-[32px] ml-[28px] flex flex-col">
            <div
              className={cls(
                'h-[48px] flex items-center',
                method === 'info' ? 'bg-[#f6f6fd] border-r-[4px] border-solid border-[#4b48df]' : '',
              )}
            >
              <button
                onClick={oninfoClick}
                className={cls(
                  'font-medium text-base/[100%] ml-[142px]',
                  method === 'info' ? 'text-[#000]' : 'text-[#a5a4b5]',
                )}
              >
                기본 정보
              </button>
            </div>
            <div
              className={cls(
                'h-[48px] flex items-center',
                method === 'pass' ? 'bg-[#f6f6fd] border-r-[4px] border-solid border-[#4b48df]' : '',
              )}
            >
              <button
                onClick={onpassClick}
                className={cls(
                  'font-medium text-base/[100%] ml-[101px]',
                  method === 'pass' ? 'text-[#000]' : 'text-[#a5a4b5]',
                )}
              >
                비밀번호 재설정
              </button>
            </div>
          </div>
        </div>

        <div className="w-[984px] bg-[#F8F8FA]">
          <div className="w-[900px] h-[70px] border border-solid border-[#eaeaee] bg-[#fff] rounded-xl ml-[38px] mt-[24px]">
            {method === 'pass' ? (
              <p className="text-[22px]/[100%] font-bold ml-[calc(50%-139px/2-0.5px)] mt-[24px]">비밀번호 재설정</p>
            ) : (
              <p className="text-[22px]/[100%] font-bold ml-[calc(50%-139px/2-0.5px)] mt-[24px] font-sans">기본 정보</p>
            )}
          </div>
          {method === 'pass' ? (
            <div className="w-[900px] h-[620px] border border-solid border-[#eaeaee] bg-[#fff] rounded-xl mt-[18px] ml-[38px]">
              <form onSubmit={handleSubmit(onValid)} className="w-[500px] h-[70px] m-[0_auto]">
                <div className="w-[500px] h-[70px] mt-[104px] text-right">
                  <Input
                    register={register('password', {
                      required: '비밀번호는 필수 입력 항목입니다.',
                      pattern: {
                        value: /^(?=.*[A-Za-z0-9])(?=.*[@!#$%^&+=])(?!.*\s).{10,}$/,
                        message: '10자 이상의 영문, 숫자, 특수문자 조합을 입력해주세요.',
                      },
                    })}
                    name="old_repass"
                    label="기존 비밀번호*"
                    type="password"
                    size="large"
                    placeholder="기존 비밀번호를 입력하세요."
                  />

                  <span className="text-[13px]/[100%] font-normal text-[#4264da]">
                    {errors.password?.message as string}
                  </span>
                </div>
                <div className="w-[500px] mb-[20px] mt-[38px] text-right">
                  <Input
                    register={register('new_password', {
                      required: '새로운 비밀번호는 필수 입력 항목입니다.',
                      pattern: {
                        value: /^(?=.*[A-Za-z0-9])(?=.*[@!#$%^&+=])(?!.*\s).{10,}$/,
                        message: '10자 이상의 영문, 숫자, 특수문자 조합을 입력해주세요.',
                      },
                    })}
                    name="repass"
                    label="새 비밀번호*"
                    type="password"
                    size="large"
                    placeholder="새 비밀번호를 입력하세요."
                  />
                  <span className="text-[13px]/[100%] font-normal text-[#4264da]">
                    {errors.new_password?.message as string}
                  </span>
                </div>
                <div className="w-[500px] h-[66px] text-right">
                  <Input
                    register={register('new_passwordConfirm', {
                      required: '비밀번호 확인은 필수 입력 항목입니다.',
                      validate: {
                        check: (value) => {
                          if (getValues('new_password') !== value) {
                            return '비밀번호가 일치하지 않습니다.';
                          }
                        },
                      },
                    })}
                    name="repass_check"
                    label="새 비밀번호 확인*"
                    type="password"
                    size="large"
                    placeholder="새 비밀번호를 다시 입력해주세요."
                  />
                  <span className="text-[13px]/[100%] font-normal text-[#4264da]">
                    {errors.new_passwordConfirm?.message as string}
                  </span>
                </div>
                <div className="ml-[160px] mt-[62px]">
                  {oldpass && newpass && newpasscon ? (
                    <Button disable={true} text="비밀번호 변경" size="xlarge" />
                  ) : (
                    <Button disable={false} text="비밀번호 변경" size="xlarge" />
                  )}
                </div>
                {/* {errors.new_passwordConfirm?.message as string} */}
              </form>
            </div>
          ) : (
            <>
              {data ? (
                <div className="w-[900px] h-[620px] border border-solid border-[#eaeaee] bg-[#fff] rounded-xl mt-[18px] ml-[38px]">
                  <form onSubmit={handleSubmit(onValids)} className="w-[500px] m-[0_auto]">
                    <div className="h-[55px] mt-[42px]">
                      <Input
                        register={register('id')}
                        name="snsemail"
                        label="아이디"
                        type="text"
                        size="large"
                        value={login_id}
                        disabled
                      />
                    </div>
                    <div className="flex items-center mb-[10px]">
                      <Input
                        register={register('email', {
                          required: '이메일은 필수 항목입니다.',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                            message: '이메일 형식이 아닙니다.',
                          },
                        })}
                        required
                        name="email"
                        label="이메일*"
                        type="text"
                        size="small"
                        placeholder="example@zillings.com"
                      />
                      {emaildata ? (
                        <Button disable={false} text="요청완료" active={true} type="button" size="xsmall" />
                      ) : email ? (
                        <Button
                          disable={true}
                          text={emailLoading ? 'Loading...' : '인증요청'}
                          onClick={checkemailonClick}
                          type="button"
                          size="xsmall"
                        />
                      ) : (
                        <Button
                          disable={false}
                          text={emailLoading ? 'Loading...' : '인증요청'}
                          type="button"
                          onClick={checkemailonClick}
                          size="xsmall"
                        />
                      )}
                    </div>
                    {emaildata ? (
                      <div className="flex">
                        <Input register={register('code')} required name="code" type="text" size="small" />
                        {confirmdata ? (
                          <Button disable={false} text="인증완료" active={true} type="button" size="xsmall" />
                        ) : code ? (
                          <Button
                            disable={true}
                            text="확인"
                            onClick={checkconfirmonClick}
                            type="button"
                            size="xsmall"
                          />
                        ) : (
                          <Button
                            disable={false}
                            text="확인"
                            type="button"
                            onClick={checkconfirmonClick}
                            size="xsmall"
                          />
                        )}
                      </div>
                    ) : null}
                    <div className="mb-[10px] text-right">
                      <span className="text-[13px]/[100%] font-normal text-[#4264da]">{confirmerrmessage}</span>
                    </div>
                    <div className="mb-[10px]">
                      <Input
                        register={register('bizNum')}
                        name="my_biznum"
                        label="사업자등록번호*"
                        type="text"
                        size="large"
                        value={biz_num}
                        disabled
                      />
                    </div>
                    <div className="w-[500px] h-[153px] flex mt-[25px]">
                      <span className="w-[138px] h-[16px] font-bold text-[16px]/[100%] text-GrayScalePrimary-800">
                        프로필 이미지
                      </span>
                      <label className="w-[356px] ml-[4px] cursor-pointer border-[#CFCED7] flex items-center justify-center border-2 border-solid rounded-[4px]">
                        {avatarPreview ? (
                          <Image
                            src={avatarPreview}
                            className="w-[350px] h-[147px]"
                            alt="profile"
                            width={350}
                            height={147}
                          />
                        ) : (
                          <svg
                            className="h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        <input {...register('image')} className="hidden" type="file" />
                      </label>
                    </div>
                    <div className="w-[500px] h-[40px] flex items-center mt-[20px]">
                      <span className="w-[138px] h-[16px] font-bold text-[16px]/[100%] text-GrayScalePrimary-800">
                        알림 동의
                      </span>
                      <Input name="keep" label="" type="alarm" onClick={alarmonClick} />
                    </div>
                    <div className="ml-[160px] mt-[32px]">
                      {avatarPreview ? (
                        <Button disable={true} text="저장하기" size="xlarge" />
                      ) : (
                        <Button disable={false} text="저장하기" size="xlarge" />
                      )}
                    </div>
                    <button
                      onClick={userDeleteClick}
                      type="button"
                      className="ml-[220px] mt-[32px] text-[#DF4848] text-[18px]"
                    >
                      회원 탈퇴
                    </button>
                  </form>
                </div>
              ) : (
                ''
              )}
            </>
          )}
        </div>
      </div>
      <Popup
        text={emailmesaage || confirmmessage || SignMessage || confirmerrmessage}
        cancle="취소"
        confirm="확인"
        isOpen={isOpen}
        onClick={closeModal}
      />
    </div>
  );
}

export default RePass;
