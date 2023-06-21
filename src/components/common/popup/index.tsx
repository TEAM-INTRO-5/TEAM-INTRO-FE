import { PrimaryButton } from '../button';
import { DetailModalProps, popup } from '@/interfaces/popup';

type ConfirmModalProps = {
  msg1: string;
  msg2?: string;
  closeModal: () => void;
};

export function Popup({ text, cancle, confirm, isOpen, onClick }: popup) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-10 backdrop-invert bg-white/30">
          <div className="w-[350px] h-[256px] fixed rounded-lg border border-solid border-[#b3b2c0] bg-[#fff]">
            <div className="w-[330px] mt-[70px] h-[32px] m-[0px_auto] text-center">
              <span className="font-normal text-[19px]/[160%]">{text}</span>
            </div>
            <div className="w-[214px] h-[48px] mt-[62px] ml-[68px]">
              <button
                className="w-[104px] h-[40px] border border-solid border-[#000] rounded-lg mr-[6px] font-bold text-lg text-[#6e6d86]"
                onClick={onClick}
              >
                {cancle}
              </button>
              <button
                className="w-[104px] h-[40px] rounded-lg bg-[#4b48df] text-[#fff] font-bold text-lg"
                onClick={onClick}
              >
                {confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConfirmModal({ msg1, msg2, closeModal }: ConfirmModalProps) {
  return (
    <>
      <div className="modal-contents w-[420px] h-64 flex items-center flex-col pt-14 space-y-10">
        <p className="text-xl break-keep">
          {msg1} <br /> {msg2}
        </p>
        <section className="text-center space-x-2">
          <button
            onClick={closeModal}
            className="w-32 h-12 rounded-lg border border-black text-GrayScalePrimary-600 font-bold text-xl"
          >
            취소
          </button>
          <PrimaryButton
            text="확인"
            type="primary"
            onClick={() => {}}
            classname="w-32 h-12 rounded-lg text-xl font-bold"
          />
        </section>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </>
  );
}

export function DetailModal({ closeModal, email, name, type, date, content }: DetailModalProps) {
  return (
    <>
      <div className="modal-contents w-[520px] h-[600px] rounded-2xl pt-10 px-[54px] py-9">
        <section className="flex justify-between">
          <h3 className="font-bold text-xl">자세히 보기</h3>
          <button className="h-fit" onClick={closeModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_782_10000" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_782_10000)">
                <path
                  d="M6.4 19.071L5 17.6692L10.6 12.0618L5 6.4544L6.4 5.05255L12 10.6599L17.6 5.05255L19 6.4544L13.4 12.0618L19 17.6692L17.6 19.071L12 13.4636L6.4 19.071Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </button>
        </section>

        <section className="space-y-4">
          <article className="mt-[30px] space-x-[57px] flex items-center">
            <span className="font-bold">이메일</span>
            <p className="flex space-x-2 items-center">
              <span>{email}</span>
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_782_10007" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_782_10007)">
                    <path
                      d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
              </button>
            </p>
          </article>
          <article className="space-x-[71px]">
            <span className="font-bold">이름</span>
            <span>{name}</span>
          </article>
          <article className="space-x-[71px]">
            <span className="font-bold">구분</span>
            <span>{type}</span>
          </article>
          <article className="space-x-[71px]">
            <span className="font-bold">요청</span>
            <span>{date}</span>
          </article>
          <article className="space-x-[71px]">
            <span className="font-bold">확인</span>
            <span>-</span>
          </article>
          <article>
            <span className="font-bold">내용</span>
            <p className="h-[180px] p-6 mt-[10px] border border-GrayScalePrimary-400 rounded-lg overflow-y-auto break-keep">
              {content}
            </p>
          </article>
        </section>

        <section className="text-right mt-5">
          <button
            onClick={closeModal}
            className="border rounded-lg w-32 h-12 text-xl font-bold text-GrayScalePrimary-600 inline-block"
          >
            닫기
          </button>
        </section>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
}
