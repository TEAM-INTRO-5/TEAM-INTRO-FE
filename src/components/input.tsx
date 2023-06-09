import { cls } from "@/utils/utile";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    label?: string;
    name: string;
    size?: "small" | "large";
    type: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    onClick?: () => void;
    [key: string]: any;
    value?: string;
    disabled?: any;
  }
  
  export default function Input({
    register,
    required,
    label,
    size,
    type,
    name,
    onClick,
    onChange,
    checked,
    value,
    disabled,
    placeholder,
  }: InputProps) {
    return (
      <>
        {size === "large" ? (
       
        <div className={cls(name === "register_password" || name === "register_password_check" || name === "snsemail" || name === "findid_email" || name === "findbznum_email" || name === "findid_pass" || name === "findemail_pass" || name === "repass" || name === "old_repass" || name === "repass_check" || name === "my_biznum"? "flex items-center" : "flex flex-col items-start gap-[8px] p-0 justify-center mb-5 ml-[4px]" )}>
            <span className={cls("h-[16px] font-bold text-[16px]/[100%] text-GrayScalePrimary-800"
            )}>{label}</span>
            <input type={type} placeholder={placeholder} value={value} disabled={disabled? disabled: null} {...register} required={required} className={cls("h-[43px] px-3 py-2 ml-auto box-border border-solid border border-GrayScalePrimary-250 rounded-lg focus:border-primary-500 placeholder-[#DDDCE3] focus:outline-none focus:ring-primary-500 focus:border-[2px]",
             name === "findid_email" ? "w-[324px]" :name === "findbznum_email" ? "w-[270px]" :"w-[356px]")}/>
        </div>
      
        ) : null}
       
        {size === "small" ? (
        <>
            <span className={cls("h-[16px] font-bold text-[16px]/[100%] text-GrayScalePrimary-800")}>{label}</span>
        <input type={type} placeholder={placeholder} {...register} required={required} className="w-[260px] h-[43px] ml-auto px-3 py-2 box-border border-solid border border-GrayScalePrimary-250 rounded-lg focus:border-primary-500 placeholder-[#DDDCE3] focus:outline-none focus:ring-primary-500 focus:border-[2px]"/>
        </>
        
        ) : null}
       
        {type === "login_checkbox" ? (
                <div className="relative">
                 <input type="checkbox" className="w-[16px] h-[16px] mt-1 ml-[4px]" onClick={onClick} onChange={onChange} checked={checked}/>
                 <span className="absolute w-[200px] left-[24px] top-[5px] font-medium text-[13px]/[100%] text-GrayScalePrimary-900 ml-[4px]">{label}</span>
               </div>
        ): null}
        {type === "register_checkbox" ? (
                <div className="relative w-[131px] h-[24px]">
                 <input type="checkbox" className="w-[16px] h-[16px] mt-1 ml-[4px]" onChange={onChange} checked={checked}/>
                 <span className="absolute w-[110px] h-[15px] left-[24px] top-[5px] ml-[4px] font-medium text-[14px]/[100%] text-GrayScalePrimary-700">{label}</span>
               </div>
        ): null}
        {type === "alarm" ? (
                <div className="relative w-[131px] h-[24px] ml-[4px]">
                 <input type="checkbox" className="w-[16px] h-[16px] mt-1" onClick={onClick}/>
                 <span className="absolute w-[200px] h-[15px] left-[24px] top-[5px] font-medium text-[14px]/[100%] text-GrayScalePrimary-700">이메일 알림을 받습니다.</span>
               </div>
        ): null}

       
      </>
    );
  }