import {
  BuilderCheckboxProps,
  BuilderInputProps,
  BuilderSelectProps,
  BuilderUploadFileProps,
  BuilderUploadImageProps,
} from '@/interfaces/input';
import { fileCheck } from '@/utils/fileCheck';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../button';
import { set } from 'react-hook-form';
import { on } from 'events';
import useStore from '@/store';
import { useUploadFile } from '@/hooks/useUploadFile';
import Image from 'next/image';

// 기본 입력창
export function BuilderInput({
  title,
  type,
  placeholder,
  id,
  readonly,
  required,
  value,
  onChange,
  minLength,
  maxLength,
  register,
}: BuilderInputProps) {
  return (
    <>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <input
        type={type}
        {...register}
        onChange={onChange}
        className={
          'w-[264px] h-[42px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] flex py-[7px] indent-[10px] ' +
          (readonly ? 'bg-GrayScalePrimary-250 placeholder:text-GrayScalePrimary-600' : '')
        }
        placeholder={placeholder}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readonly}
        required={required}
        value={value}
      ></input>
    </>
  );
}

// 이미지 업로드 입력창
export function BuilderUploadImage({ title, ratio, imgSrc, setImgSrc, name, setUploadImg }: BuilderUploadImageProps) {
  const { resetUploadImage } = useStore();
  return (
    <>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <div
        className={
          'w-[264px] h-[138px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] indent-[10px] flex flex-col'
        }
      >
        {/* 이미지 업로드 시 업로드한 이미지 미리보기 */}
        {imgSrc === '' ? null : (
          <div className="relative overflow-hidden">
            <div>
              <img src={imgSrc} className="m-[auto] object-contain max-w-[264px] max-h-[138px]" alt="logo-img" />
            </div>
            <button
              className="w-[32px] h-[32px] absolute right-[8px] top-[7px]"
              onClick={() => {
                setImgSrc(''); // 이미지 삭제
                resetUploadImage(); // 이미지 삭제
              }}
            >
              <img src="/delete.png" />
            </button>
          </div>
        )}
        {/* 이미지 업로드 버튼 */}
        {/* 이미지가 존재하지 않는 경우, 이미지 업로드 버튼이 보이고, 이미지가 존재하는 경우 사라짐 */}
        {imgSrc === '' ? (
          <>
            <div className="w-[60px] h-[60px] rounded-[10px] bg-primary-100 mx-[auto] mt-[14px]">
              <input
                onChange={(e) => {
                  fileCheck(e, setImgSrc, ratio, setUploadImg);
                }}
                accept="image/*"
                type="file"
                name={name}
                id="file-input"
                className="hidden"
              />
              <label className="file-input__label" htmlFor="file-input">
                <Image
                  src="/union.png"
                  className="w-[20px] h-[20px] m-[auto] mt-[20px]"
                  width={20}
                  height={20}
                  alt="file-input add image"
                />
              </label>
            </div>
            <span className="font-[500] text-[14px] text-GrayScalePrimary-700 mt-[8px] ml-[55px]">
              이미지를 추가해주세요.
            </span>
            <span className="font-[500] text-[14px] text-GrayScalePrimary-400 ml-[80px]">최대 100mb</span>
          </>
        ) : null}
      </div>
    </>
  );
}

// 파일 업로드 입력창
export function BuilderUploadFile({ title, type }: BuilderUploadFileProps) {
  const [file, setFile] = useState<File>();
  const { mutate: uploadFileMutation, isSuccess } = useUploadFile(file, type);
  const { setDownload, download } = useStore();
  return (
    <>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <div
        className={
          'w-[264px] h-[138px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] indent-[10px] flex flex-col'
        }
      >
        {/* 이미지 업로드 시 업로드한 이미지 미리보기 */}
        {file === undefined ? null : (
          <div className="relative overflow-hidden flex">
            <div className="mx-auto flex flex-col mt-[20px]">
              <Image src="/pdf.svg" alt="pdf file img" className="h-[60px] w-[60px] mx-auto" width={60} height={60} />
              <p className="text-GrayScalePrimary-700 text-[14px]">{file.name}</p>
            </div>
            {/* 삭제 버튼 */}
            <button
              className="w-[32px] h-[32px] absolute right-[8px] top-[7px]"
              onClick={() => {
                setFile(undefined);
                if (type === 'mediakit') {
                  setDownload({ ...download, media_kit_file: '' });
                }
                if (type === 'introfile') {
                  setDownload({ ...download, intro_file: '' });
                }
              }}
            >
              <img src="/delete.png" />
            </button>
          </div>
        )}
        {/* 이미지 업로드 버튼 */}
        {/* 이미지가 존재하지 않는 경우, 이미지 업로드 버튼이 보이고, 이미지가 존재하는 경우 사라짐 */}
        {file === undefined ? (
          <>
            <div className="w-[60px] h-[60px] rounded-[10px] bg-primary-100 mx-[auto] mt-[14px]">
              <input
                type="file"
                name="file"
                id="file-input"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                    uploadFileMutation();
                  }
                }}
              />
              <label className="file-input__label" htmlFor="file-input">
                <Image
                  src="/union.png"
                  className="w-[20px] h-[20px] m-[auto] mt-[20px]"
                  alt="file add button image"
                  width={20}
                  height={20}
                />
              </label>
            </div>
            <span className="font-[500] text-[14px] text-GrayScalePrimary-700 mt-[8px] ml-[55px]">
              파일을 추가해주세요.
            </span>
            <span className="font-[500] text-[14px] text-GrayScalePrimary-400 ml-[80px]">최대 100mb</span>
          </>
        ) : null}
      </div>
    </>
  );
}

// 증복확인 입력창
export function DuplicateCheck({ title, type, placeholder, id, required, value, onChange }: BuilderInputProps) {
  return (
    <>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <div className="flex mt-[8px]">
        <input
          type={type}
          className={
            'w-[185px] h-[42px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 flex py-[7px] indent-[10px] font-[400] '
          }
          placeholder={placeholder}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
        ></input>
        <PrimaryButton type="primary" text="중복확인" onClick={() => {}} classname="w-[72px] h-[42px] ml-[8px]" />
      </div>
    </>
  );
}

// textarea 입력창
export function BuilderTextarea({
  title,
  placeholder,
  id,
  required,
  value,
  setValue,
  onChange: ProductChange,
  register,
}: BuilderInputProps) {
  const [textLength, setTextLength] = useState(0);
  return (
    <div className="relative">
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <textarea
        {...register}
        className={
          'w-[264px] h-[160px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] flex py-[7px] placeholder:w-[232px] placeholder:h-[100px] pt-[12px] pl-[16px] pr-[16px]'
        }
        maxLength={80} // 최대 글자수 80자
        placeholder={placeholder}
        id={id}
        required={required}
        value={value}
        onChange={
          ProductChange
            ? ProductChange
            : (e) => {
                // 글자수 표시
                setTextLength(() => e.target.value.length);
                setValue && setValue(e.target.value);
              }
        }
      ></textarea>
      <span className="absolute right-[60px] bottom-[10px] text-[12px] text-GrayScalePrimary-550">
        {textLength}자/최대 80자
      </span>
    </div>
  );
}

// 체크박스 입력창
export function BuilderCheckbox({ list, onChange, setChecked, checked, value }: BuilderCheckboxProps) {
  return (
    <>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{list.name}</div>
      <div className="w-[264px] h-[42px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[5px] flex py-[7px] indent-[10px] ">
        <input
          type="checkbox"
          className="w-[16px] h-[16px] rounded-[2px] border-[2px] border-GrayScalePrimary-300 flex indent-[10px] font-[400] ml-[10px] translate-y-[4px]"
          id={list.name + 'checkbox'}
          checked={checked}
          onChange={(e) => {
            setChecked();
          }}
        />
        <span className="text-GrayScalePrimary-150">|</span>
        <Image src={list.img} alt={list.name} width={28} height={16} className="ml-[3px]" />
        <input
          type="text"
          placeholder="예: sns 아이디 입력"
          className="ml-[10px] w-[150px]"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

// 셀렉트박스
export function BuilderSelect({ title }: BuilderSelectProps) {
  return (
    <div>
      <div className="mt-[24px] font-[700] text-[14px] text-GrayScalePrimary-700">{title}</div>
      <select className="w-[264px] h-[42px] rounded-[6px] border-[2px] border-GrayScalePrimary-300 mt-[8px] flex py-[7px] indent-[10px] font-[400]">
        {/* TODOLIST - 디자인 작업 */}
        <option value="PARTNERS">파트너</option>
        <option value="INVESTMENT">투자자</option>
      </select>
    </div>
  );
}
