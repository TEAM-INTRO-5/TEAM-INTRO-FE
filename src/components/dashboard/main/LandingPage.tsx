import { createIntroPage } from '@/apis/builder';
import { PrimaryButton } from '@/components/common/button';
import { useMutation } from '@tanstack/react-query';
import Router, { useRouter } from 'next/router';

type Sentences = {
  s1: string;
  s2: string;
};

function CheckMark({ s1, s2 }: Sentences) {
  return (
    <div className="space-x-3 flex items-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_782_9569" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_782_9569)">
          <path
            d="M9.525 18L20.125 7.4L18.7 6L9.5 15.175L5.275 10.925L3.85 12.35L9.525 18ZM9.525 20C9.275 20 9.025 19.95 8.775 19.85C8.525 19.75 8.3 19.6 8.1 19.4L2.45 13.75C2.25 13.55 2.10417 13.3292 2.0125 13.0875C1.92083 12.8458 1.875 12.6 1.875 12.35C1.875 12.1 1.92083 11.85 2.0125 11.6C2.10417 11.35 2.25 11.125 2.45 10.925L3.85 9.525C4.05 9.325 4.27083 9.175 4.5125 9.075C4.75417 8.975 5.00833 8.925 5.275 8.925C5.54167 8.925 5.79583 8.975 6.0375 9.075C6.27917 9.175 6.5 9.325 6.7 9.525L9.525 12.35L17.275 4.575C17.4583 4.375 17.675 4.22917 17.925 4.1375C18.175 4.04583 18.425 4 18.675 4C18.925 4 19.175 4.04583 19.425 4.1375C19.675 4.22917 19.9 4.36667 20.1 4.55L21.525 5.95C21.725 6.15 21.875 6.37083 21.975 6.6125C22.075 6.85417 22.125 7.10833 22.125 7.375C22.125 7.64167 22.0792 7.89583 21.9875 8.1375C21.8958 8.37917 21.75 8.6 21.55 8.8L10.95 19.4C10.75 19.6 10.525 19.75 10.275 19.85C10.025 19.95 9.775 20 9.525 20Z"
            fill="#403F4E"
          />
        </g>
      </svg>

      <p className="text-sm text-GrayScalePrimary-800">
        {s1} <br />
        {s2}
      </p>
    </div>
  );
}

export default function LandingPage() {
  const { mutate: createIntroPageMutation } = useMutation(
    () => createIntroPage({ widget_type_list: ['MISSIONANDVISION'] }),
    {
      onSuccess: (data) => {
        console.log('success', data);
        Router.push('/builder');
      },
      onError: (error) => {
        console.log('error', error);
        alert('회사 소개 페이지 생성에 실패했습니다.');
      },
    },
  );

  return (
    <div className="mx-auto flex flex-col items-center mt-[117px]">
      <p className="break-keep text-center font-bold text-3xl leading-[50px] mb-8">
        간단하게 회사 소개 페이지를 <br /> 만들고 공유 할 수 있습니다
      </p>

      <section className="space-y-[10px]">
        <p className="text-GrayScalePrimary-800">
          <span className="mr-3">·</span>
          자동화 템플릿을 통해 쉽고 간편하게 회사 소개 페이지를 만들 수 있습니다.
        </p>
        <p className="text-GrayScalePrimary-800">
          <span className="mr-3">·</span>
          사업자등록번호로 연계된 서비스를 통해 기업 정보들을 자동으로 불러옵니다.
        </p>
      </section>

      <PrimaryButton
        classname="text-xl font-bold w-[350px] h-[60px] mt-[53px]"
        type="primary"
        text="회사 소개 페이지 만들기"
        onClick={() => {
          createIntroPageMutation();
        }}
      />
      <div className="h-[1px] w-[440px] bg-GrayScalePrimary-250 mt-[49px]"></div>

      <section className="mt-12 space-y-6">
        <CheckMark
          s1="한번 만들고 마는 회사 소개 페이지는 이제 그만."
          s2="가장 최신의 정보로 업데이트하고 비슷한 고민을 함께하는 비즈니스 기회들로 새로운 임팩트를 만들어보세요."
        />
        <CheckMark
          s1="회사 페이지 하나 만들려고 해야 했던 문서작업들, 확 줄여드릴게요."
          s2="창업 초기, 회사에 대해서 가장 잘 알고 있을 때, 미리 정리해보세요."
        />
      </section>
    </div>
  );
}
