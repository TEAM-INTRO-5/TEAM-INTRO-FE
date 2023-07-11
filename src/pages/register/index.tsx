import { checkid, checknum, emailcheck, emailconfirm, signup } from '@/apis/auth';
import Button from '@/components/button';
import { Popup } from '@/components/common/popup';
import Input from '@/components/input';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

interface EnterForm {
  email: string;
  password: string;
  login_id: string;
  biz_num: string;
  code: string;
  password_confirm?: string;
}

function Legister() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIderrmessage('');
    setNumerrmessage('');
    setemaildata('');
    setConFirmdata('');
    setIsOpen(false);
  };
  const [signupmessage, setSignupmessage] = useState('');
  const [idmessage, setIdmessage] = useState('');
  const [iderrmessage, setIderrmessage] = useState('');
  const [nummesaage, setNummessage] = useState('');
  const [numerrmesaage, setNumerrmessage] = useState('');
  const [emailmesaage, setemailmessage] = useState('');
  const [emaildata, setemaildata] = useState('');
  const [confirmmessage, setconfirmmessage] = useState('');
  const [confirmdata, setConFirmdata] = useState('');
  const [confirmerrmessage, setconfirmerrmessage] = useState('');
  const [enabled, setEnabled] = useState(false);

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    term: false,
    privacy: false,
    age: false,
  });

  // 버튼 활성화 여부 업데이트 함수
  useEffect(() => {
    const areAllChecked = Object.values(checkboxes).every((value) => value === true);

    setEnabled(areAllChecked);
  }, [checkboxes]);

  // 전체 동의 체크박스 상태 업데이트 함수
  const handleAllCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);

    setCheckboxes((prevState) => ({
      term: isChecked,
      privacy: isChecked,
      age: isChecked,
    }));
  };
  // 체크박스 상태 업데이트 함수
  const handleCheckboxChange = (name: any) => {
    setCheckboxes((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [test, setTest] = useState('hi');
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<EnterForm>({ mode: 'onChange' });
  const router = useRouter();
  const { mutate: signupmutate, error: singuperr } = useMutation(signup, {
    onSuccess: (data) => {
      setSignupmessage('회원가입이 완료되셨습니다!');
      openModal();
      router.replace('login');
    },
    onError: (err: AxiosError) => {},
  });
  const { mutate: checkidmutate, error: checkiderror } = useMutation(checkid, {
    onSuccess: (data) => {
      setIdmessage('사용 가능한 아이디입니다.');
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
      setIderrmessage(data.value);
      if (data.value === '존재하는 ID 입니다.') {
        openModal();
      }
    },
  });
  const { mutate: checknummutate, error: checknumerror } = useMutation(checknum, {
    onSuccess: (data) => {
      setNummessage(data);
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
      setNumerrmessage(data.value);
      if (data.value === '이미 존재하는 사업자등록번호입니다.') {
        openModal();
      }
    },
  });
  const {
    mutate: checkemailmutate,
    isLoading: emailLoading,
    error: checkemailerror,
  } = useMutation(emailcheck, {
    onSuccess: (data) => {
      setemailmessage(data);
      setemaildata('메일이 발송되었습니다.');
      openModal();
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
    },
  });
  const { mutate: checkconfirmmutate, error: checkconfirmerror } = useMutation(emailconfirm, {
    onSuccess: (data) => {
      setconfirmmessage(data);
      setConFirmdata('인증되었습니다.');
      openModal();
    },
    onError: (err: AxiosError) => {
      const Eresponse = err.response?.data;
      const { data }: any = Eresponse;
      setconfirmerrmessage(data.value);
    },
  });

  const login_id = watch('login_id');
  const biz_num = watch('biz_num');
  const email = watch('email');
  const code = watch('code');
  const checkidonClick = () => {
    checkidmutate({ login_id });
  };
  const checknumonClick = () => {
    checknummutate({ biz_num });
  };
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
  const onValid = (data: EnterForm) => {
    const user = {
      login_id: data.login_id,
      email: data.email,
      password: data.password,
      biz_num: data.biz_num,
    };
    if (idmessage && nummesaage && confirmmessage && enabled) {
      signupmutate(user);
    } else if (idmessage && nummesaage && confirmmessage) {
      alert('이용 약관 동의는 필수 항목입니다.');
    } else {
      alert('인증을 모두 완료 하여야합니다.');
    }
  };

  return (
    <div>
      <div className="h-[65px] border-solid border-b-[1px] border-primary-500">
        <Image src="/zlllinks.png" alt="emblem1" width={150} height={52.5} className="ml-[20px] mt-[10px]" />
      </div>
      <div className="w-[100px] h-[24px] m-[0_auto] mt-[30px]">
        <p className="text-2xl/[100%] font-bold ">회원가입</p>
      </div>

      <div className="w-[501px] h-[542px] flex flex-col m-[0_auto] mt-[28px]">
        <form id="join" onSubmit={handleSubmit(onValid)}>
          <div className="flex items-center mb-[12px]">
            <Input
              register={register('login_id')}
              required
              name="id"
              label="아이디*"
              type="text"
              size="small"
              placeholder="아이디를 입력해주세요."
            />
            {idmessage ? (
              <Button text="중복확인" active={true} type="button" size="xsmall" />
            ) : login_id ? (
              <Button disable={true} text="중복확인" type="button" onClick={checkidonClick} size="xsmall" />
            ) : (
              <Button disable={false} text="중복확인" type="button" onClick={checkidonClick} size="xsmall" />
            )}

            {/* idmessage? <Button text="중복확인" active={true} type="button" onClick={checkidonClick} size="xsmall"/>  */}
          </div>
          {idmessage ? (
            <div className="mb-[10px] text-right">
              <span className="text-[13px]/[100%] font-normal text-[#4264da]">{idmessage}</span>
            </div>
          ) : iderrmessage ? (
            <div className="mb-[10px] text-right">
              <span className="text-[13px]/[100%] font-normal text-[#4264da]">{iderrmessage}</span>
            </div>
          ) : null}

          <div className="flex items-center mb-[14px]">
            <Input
              register={register('biz_num')}
              required
              name="bznum"
              label="사업자등록번호*"
              type="text"
              size="small"
              placeholder="사업자등록번호 10자리."
            />
            {nummesaage ? (
              <Button text="인증확인" active={true} type="button" size="xsmall" />
            ) : biz_num ? (
              <Button disable={true} text="인증요청" type="button" onClick={checknumonClick} size="xsmall" />
            ) : (
              <Button disable={false} text="인증요청" type="button" onClick={checknumonClick} size="xsmall" />
            )}
          </div>
          {nummesaage ? (
            <div className="mb-[10px] text-right">
              <span className="text-[13px]/[100%] font-normal text-[#4264da]">{nummesaage}</span>
            </div>
          ) : numerrmesaage ? (
            <div className="mb-[10px] text-right">
              <span className="text-[13px]/[100%] font-normal text-[#4264da]">{numerrmesaage}</span>
            </div>
          ) : null}
          <div className="mb-[14px]">
            <Input
              register={register('password', {
                required: '비밀번호는 필수 입력 항목입니다.',
                pattern: {
                  value: /^(?=.*[A-Za-z0-9])(?=.*[@!#$%^&+=])(?!.*\s).{10,}$/,
                  message: '10자 이상의 영문, 숫자, 특수문자 조합을 입력해주세요.',
                },
              })}
              required
              name="register_password"
              label="비밀번호*"
              type="password"
              size="large"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className="mb-[10px] text-right">
            <span className="text-[13px]/[100%] font-normal text-[#4264da]">{errors.password?.message as string}</span>
          </div>
          <div className="mb-[14px]">
            <Input
              register={register('password_confirm', {
                required: '비밀번호 확인은 필수 입력 항목입니다.',
                validate: {
                  check: (value) => {
                    if (getValues('password') !== value) {
                      return '비밀번호가 일치하지 않습니다.';
                    }
                  },
                },
              })}
              required
              name="register_password_check"
              label="비밀번호 확인*"
              type="password"
              size="large"
              placeholder="비밀번호를 재입력해주세요."
            />
          </div>
          <div className="mb-[10px] text-right">
            <span className="text-[13px]/[100%] font-normal text-[#4264da]">
              {errors.password_confirm?.message as string}
            </span>
          </div>

          <div className="flex items-center mb-[14px]">
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
            {emailmesaage ? (
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
          <div className="mb-[10px] text-right">
            <span className="text-[13px]/[100%] font-normal text-[#4264da]">{errors.email?.message}</span>
          </div>
          {emailmesaage ? (
            <div className="flex ml-[55px]">
              <Input register={register('code')} required name="code" type="text" size="small" />
              {confirmmessage ? (
                <Button disable={false} text="인증완료" active={true} type="button" size="xsmall" />
              ) : code ? (
                <Button disable={true} text="확인" onClick={checkconfirmonClick} type="button" size="xsmall" />
              ) : (
                <Button disable={false} text="확인" type="button" onClick={checkconfirmonClick} size="xsmall" />
              )}
            </div>
          ) : null}
          <div className="mb-[10px] text-right">
            <span className="text-[13px]/[100%] font-normal text-[#4264da]">{confirmerrmessage}</span>
          </div>
        </form>
        <div className="mt-[32px] pb-[14px] border-solid border-b-[1px] border-GrayScalePrimary-150">
          <Input
            name="keep"
            label="전체동의"
            type="register_checkbox"
            checked={allChecked}
            onChange={handleAllCheckedChange}
          />
        </div>
        <div className="space-y-[12px] mt-[12px]">
          <Input
            name="keep"
            label="(필수) 이용 약관 동의"
            type="login_checkbox"
            checked={checkboxes.term}
            onChange={() => handleCheckboxChange('term')}
          />
          <Input
            name="keep"
            label="(필수) 개인정보 수집 및 이용 동의"
            type="login_checkbox"
            checked={checkboxes.privacy}
            onChange={() => handleCheckboxChange('privacy')}
          />
          <Input
            name="keep"
            label="(필수) 14세 이상입니다"
            type="login_checkbox"
            checked={checkboxes.age}
            onChange={() => handleCheckboxChange('age')}
          />
        </div>
        <div className="m-[0_auto] mt-[32px]">
          {idmessage && nummesaage && confirmmessage && enabled ? (
            <Button disable={true} text="회원가입" form="join" size="xlarge" />
          ) : (
            <Button disable={false} text="회원가입" form="join" size="xlarge" />
          )}
        </div>
      </div>

      <Popup
        text={iderrmessage || numerrmesaage || emaildata || confirmdata || signupmessage}
        cancle="취소"
        confirm="확인"
        isOpen={isOpen}
        onClick={closeModal}
      />
    </div>
  );
}

export default Legister;
