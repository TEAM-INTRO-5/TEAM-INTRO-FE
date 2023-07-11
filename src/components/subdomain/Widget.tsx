import useStore from '@/store';
import exp from 'constants';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { headerName } from '@/data/headerName';
import { channelList } from '@/data/channel';
import { HeaderPageProps } from '@/interfaces/subdoamin';
import { type } from 'os';
import { useMutation } from '@tanstack/react-query';
import { downloadDashboard } from '@/apis/dashborad';
import { set } from 'date-fns';

export function KeyVisual({ theme, data }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-01" className="h-[400px] w-full flex relative">
        <div
          className={
            'w-full h-full z-10 ' + (data.filter === 'BLACK' ? 'opacity-50 bg-[#000]' : 'opacity-50 bg-[#fff]')
          }
        ></div>
        <span
          className={
            "absolute w-[600px] top-[120px] left-[100px] font-['LINE'] text-[36px] z-[11] font-[700] " +
            (data.filter === 'BLACK' ? 'text-white' : 'text-black')
          }
        >
          {data.slogan}
        </span>
        <span
          className={
            "absolute w-[900px] top-[240px] left-[100px] font-['LINE'] font-[400] text-[22px] z-[11] " +
            (data.filter === 'BLACK' ? 'text-white' : 'text-black')
          }
        >
          {data.slogan_detail}
        </span>
        {data.background === '' ? null : (
          <img src={data.background} className="w-full h-full object-cover absolute" alt="키비주얼 배경 이미지" />
        )}{' '}
      </section>
    );
  } else {
    return (
      <section id="w-01" className="h-[450px] w-full flex relative">
        <div
          className={
            'w-full h-full z-10 ' + (data.filter === 'BLACK' ? 'opacity-50 bg-[#000]' : 'opacity-50 bg-[#fff]')
          }
        ></div>
        <span
          className={
            "absolute w-[800px] top-[120px] left-[250px] font-['Korail'] text-[36px] z-[11] font-[700] text-center " +
            (data.filter === 'BLACK' ? 'text-white' : 'text-black')
          }
        >
          {data.slogan}
        </span>
        <span
          className={
            "absolute w-[1000px] top-[240px] left-[130px] font-['Korail'] text-[24px] z-[11] font-[500] text-center " +
            (data.filter === 'BLACK' ? 'text-white' : 'text-black')
          }
        >
          {data.slogan_detail}
        </span>
        {data.background === '' ? null : (
          <img src={data.background} className="w-full h-full object-cover absolute" alt="키비주얼 배경 이미지" />
        )}
      </section>
    );
  }
}

export function MissionVision({ theme, data }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-02" className="h-[300px] w-full flex relative font-['LINE']">
        {/* 미션 */}
        <div className="w-[50%] h-full bg-GrayScaleNeutral-100">
          <div className="h-[141px] w-[255px] m-[auto] mt-[70px] relative">
            <span className="font-[700] text-[22px]">Mission</span>
            <span className="font-[500] text-[10px] text-GrayScaleNeutral-700 ml-[5px]">미션</span>
            <Image
              src="/우주선.png"
              height={50}
              width={50}
              alt="미션을 나타내는 우주선 이미지"
              className="absolute top-[1px] right-[4px]"
            />
            <div className="mt-[20px] black h-[auto] w-full">
              <p className="font-[700] text-[13px]">{data.mission}</p>
              <p className="font-[500] text-[12px] w-[auto] h-[70px] overflow-hidden mt-[8px]">{data.mission_detail}</p>
            </div>
          </div>
        </div>
        {/* 비전 */}
        <div className="w-[50%] h-full bg-GrayScaleNeutral-150">
          <div className="h-[141px] w-[255px] m-[auto] mt-[70px] relative">
            <span className="font-[700] text-[22px]">Vission</span>
            <span className="font-[500] text-[10px] text-GrayScaleNeutral-700 ml-[5px]">비전</span>
            <Image
              src="/망원경.png"
              height={50}
              width={50}
              alt="미션을 나타내는 우주선 이미지"
              className="absolute top-[1px] right-[4px]"
            />
            <div className="mt-[20px] black h-[auto] w-full">
              <p className="font-[700] text-[13px]">{data.vision}</p>
              <p className="font-[500] text-[12px] w-[auto] h-[70px] overflow-hidden mt-[8px]">{data.vision_detail}</p>
            </div>
          </div>{' '}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-02" className="h-[320px] w-full relative">
        {/* 미션 */}
        <div className="w-full h-[140px] border border-white mt-[20px]">
          <div className="h-[60%] w-[calc(100%-200px)] ml-[100px] mt-[20px] relative">
            <span className="font-[700] text-[23px] text-[#FFB800]">Mission</span>
            <div className="mt-[20px] flex h-[auto] w-[1050px]">
              <div className="font-[700] text-[20px] w-[50%] font-['Korail']">{data.mission}</div>
              <div className="font-[500] text-[16px] w-[50%] overflow-hidden">{data.mission_detail}</div>
            </div>
          </div>
        </div>
        {/* 비전 */}
        <div className="w-full h-[140px] border border-white mt-[20px]">
          <div className="h-[60%] w-[calc(100%-200px)] ml-[100px] mt-[20px] relative">
            <span className="font-[700] text-[23px] text-[#FFB800]">Vission</span>
            <div className="mt-[20px] flex h-[auto] w-[1050px]">
              <div className="font-[700] text-[20px] w-[50%] font-['Korail']">{data.vision}</div>
              <div className="font-[500] text-[16px] w-[50%] overflow-hidden ">{data.vision_detail}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export function Header({ theme, data, header_and_footer_status_list }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-15" className="h-[41px] w-full flex flex-row-reverse relative">
        {data.logo === '' ? null : (
          <Image
            src={data.logo}
            className="w-[23px] h-[23px] absolute top-[9px] left-[11px]"
            alt="company logo image"
            width={23}
            height={23}
          />
        )}
        <span className="font-['LINE'] text-[12px] absolute top-[13px] left-[40px] font-[700]">
          {data.company_name}
        </span>
        <div className="mt-[7px] mr-[25px] text-GrayScaleNeutral-550">
          {header_and_footer_status_list?.map((toggle, index) => {
            if (toggle) {
              return (
                <span key={index} className="font-['Roboto'] text-[10px] ml-[26px]">
                  {headerName[index]}
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-15" className="h-[41px] w-full flex flex-row-reverse relative">
        {data.logo === '' ? null : (
          <Image
            src={data.logo}
            className="w-[23px] h-[23px] absolute top-[9px] left-[11px]"
            alt="company logo image"
            width={23}
            height={23}
          />
        )}{' '}
        <span className="font-[700] text-[12px] absolute top-[13px] left-[40px]">{data.company_name}</span>
        <div className="mt-[7px] mr-[25px] text-GrayScaleNeutral-550">
          {header_and_footer_status_list?.map((toggle, index) => {
            if (toggle) {
              return (
                <span key={index} className="font-['Roboto'] text-[10px] ml-[26px]">
                  {headerName[index]}
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
    );
  }
}

export function Footer({ theme, data }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-16" className="h-[140px] w-full bg-GrayScaleNeutral-150 flex relative font-['LINE']">
        <div className="w-[370px] ml-[99px] mt-[70px] mb-[25px] text-GrayScaleNeutral-400">
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[70px]">phone</div>
            <div className="font-[300]">{data.phone_number}</div>
          </div>
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[70px]">FAX</div>
            <div className="font-[300]">{data.fax_number}</div>
          </div>
          <div className="font-[500] text-[12px] flex">
            <div className="w-[70px]">Address</div>
            <div className="font-[300]"></div>
          </div>
        </div>
        <div className="w-[350px] ml-[80px] mt-[87px] text-GrayScaleNeutral-400 mb-[25px]">
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[60px]">대표</div>
            <div className="font-[300]">{data.representative}</div>
          </div>
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[60px]">Email</div>
            <div className="font-[300]">{data.contact_email}</div>
          </div>
        </div>
        <div className="w-[240px] ml-[30px] mt-[30px] text-GrayScaleNeutral-400 mb-[25px] flex flex-col">
          <div className="border w-[110px] pl-[13px] py-[5px] text-[14px] bg-white border-GrayScaleNeutral-400 text-GrayScaleNeutral-650 ml-[130px] mt-[20px]">
            기업 상세 정보
          </div>
          <div className="font-[300] text-[10px] flex ml-[175px] mt-[10px]">주식회사 질링스</div>
          <div className="font-[300] text-[10px] ml-[40px] flex">
            Copyright&#169;Zillinks.Co.Ltd. All Right Reserved
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-16" className="h-[140px] w-full bg-GrayScaleNeutral-550 flex relative font-['Korail']">
        <div className="w-[350px] ml-[99px] mt-[60px] mb-[25px] text-white">
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[70px]">phone</div>
            <div className="font-[300]">{data.phone_number}</div>
          </div>
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[70px]">FAX</div>
            <div className="font-[300]">{data.fax_number}</div>
          </div>
          <div className="font-[500] text-[12px] flex">
            <div className="w-[70px]">Address</div>
            <div className="font-[300]"></div>
          </div>
        </div>
        <div className="w-[330px] ml-[70px] mt-[77px] text-white mb-[25px]">
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[60px]">대표</div>
            <div className="font-[300]">{data.representative}</div>
          </div>
          <div className="font-[500] text-[12px] mb-[1px] flex">
            <div className="w-[60px]">Email</div>
            <div className="font-[300]">{data.contact_email}</div>
          </div>
        </div>
        <div className="w-[250px] ml-[60px] mt-[20px] text-white mb-[25px] flex flex-col">
          <div className="border w-[110px] pl-[16px] py-[5px] text-[12px] rounded-[18px] border-GrayScaleNeutral-400 ml-[135px] mt-[20px]">
            기업 상세 정보
          </div>
          <div className="font-[300] text-[10px] flex ml-[170px] mt-[10px]">주식회사 질링스</div>
          <div className="font-[300] text-[10px] flex ml-[40px]">
            Copyright&#169;Zillinks.Co.Ltd. All Right Reserved
          </div>
        </div>
      </section>
    );
  }
}

export function ProductService({ theme, data }: HeaderPageProps) {
  const products = data.products_and_services_elements;

  if (theme === 'ThemeA') {
    return (
      <section id="w-04" className="h-[402px] font-['LINE'] mt-[20px]">
        <div className="ml-[100px] flex">
          <span className="font-[700] text-[23px]">Products & Services</span>
          <span className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[15px] ml-[10px]">
            제품 소개
          </span>
        </div>

        <div className="w-[1200px] h-[299.19px] m-[0_auto] mt-[42.19px] mr-[] flex">
          {products?.map((items: any) => {
            return (
              <div
                key={items.products_and_services_element_id}
                className="w-[300px] h-[320px] bg-[#fdfdfd] border border-solid border-[#ececec] rounded-[1.4px] m-[0_auto]"
              >
                <div className="w-[250px] h-[259.81px] ml-[18px] mt-[16px] text-center">
                  <span className="font-bold text-[15px]/[100%]">{items.name}</span>
                  {items.image ? (
                    <Image
                      src={items.image}
                      alt=""
                      className="w-[191px] h-[140px] mt-[16px] ml-[30px]"
                      width={191}
                      height={140}
                    />
                  ) : (
                    <Image
                      src="/productno.png"
                      alt=""
                      className="w-[191px] h-[140px] mt-[16px] ml-[30px]"
                      width={191}
                      height={140}
                    />
                  )}
                  <p className="font-bold text-[10.54px]/[100%] mt-[16.88px]">{items.title}</p>
                  <p className="font-normal text-[9.84px]/[170%] mt-[8.44px]">{items.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-03" className="h-[auto] pb-[20px]">
        <div className="ml-[100px] mt-[30px]">
          <span className="mr-[9px] font-[700] text-[23px] text-[#FFB800]">Products & Services</span>
        </div>
        <div className="w-[1080px] h-[auto] m-[0_auto] mt-[40px] flex flex-wrap">
          {products?.map((items: any) => {
            return (
              <div
                key={items.products_and_services_element_id}
                className="w-[280px] h-[320px] bg-[#fdfdfd] border border-solid border-[#ececec] rounded-[36px] shadow-[3.5px_9.4px_11.8px_0px__rgba(197,197,197,0.25)] mx-[40px]"
              >
                <div className="w-[230px] h-[259.81px] ml-[20px]">
                  {items.image ? (
                    <Image
                      src={items.image}
                      alt=""
                      className="w-[200px] h-[140px] mt-[16px] rounded-2xl ml-[20px]"
                      width={200}
                      height={140}
                    />
                  ) : (
                    <Image
                      src="/productno.png"
                      alt=""
                      className="w-[200px] h-[140px] mt-[16px] rounded-2xl ml-[20px]"
                      width={200}
                      height={140}
                    />
                  )}
                  <span className="font-bold text-[20px]/[100%] mt-[26px] flex justify-center">{items.name}</span>
                  <p className="font-bold text-[10.54px] text-center mt-[15px]">{items.title}</p>
                  <p className="font-normal text-[9.84px] mt-[8.44px] flex justify-center text-center ">
                    {items.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export function TeamMember({ theme, data }: HeaderPageProps) {
  const teammembers = data.team_member_elements;
  if (theme === 'ThemeA') {
    return (
      <section id="w-04" className="h-[auto] font-['LINE'] mt-[30px] mb-[60px]">
        <div className="ml-[100px] flex items-center">
          <span className="mr-[9px] font-[700] text-[23px]">Meat the Team</span>
          <span className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[10px] pl-[2px]">팀 소개</span>
        </div>

        <div className="w-[1200px] h-[auto] ml-[100px] mt-[42.19px] flex flex-wrap">
          {teammembers?.map((team: any) => {
            return (
              <div key={team.team_member_element_id} className="w-[220px] h-[337px] ml-[5px]">
                {team.profile ? (
                  <Image src={team.profile} alt="" className="w-[169px] h-[198px]" width={169} height={198} />
                ) : (
                  <Image src="/프로필.png" alt="" className="w-[169px] h-[198px]" width={169} height={198} />
                )}
                <div className="w-[169px] h-[337px] mt-[11.4px]">
                  <span className="font-bold text-[11px]/[100% mt-[5px]">{team.name}</span>
                  <p className="font-bold text-[10px]/[100%] text-[#797979] mt-[10px]">
                    {team.group}/{team.position}
                  </p>
                  <p className="font-normal text-[9.84px]/[150%] mt-[8.44px]">{team.tagline}</p>
                  <p className="font-normal text-[9.84px]/[100%] mt-[14px]">{team.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-04" className="font-['LINE'] h-[795px]">
        <div className="ml-[100px] pt-[30px]">
          <span className="mr-[9px] font-[700] text-[23px] text-[#FFB800]">Meat the Team</span>
          <p className="text-[#000] text-[30px] mt-[20px] pl-[2px] font-['Korail']">팀원들을 소개합니다.</p>
        </div>

        <div className="w-[1080px] h-[auto] m-[0_auto] mt-[25px] flex flex-wrap font-['Korail'] ">
          {teammembers.map((team: any) => (
            <div
              key={team.team_member_element_id}
              className="w-[250px] h-[300px] ml-[20px] mb-[15px] rounded-3xl bg-[#fff] shadow-[3.5px_9.4px_11.8px_0px__rgba(197,197,197,0.25)] text-center"
            >
              <div className="w-[130px] h-[130px] m-[0_auto] mt-[12px]">
                {team.profile ? (
                  <Image
                    src={team.profile}
                    alt=""
                    className="w-[130px] h-[130px] rounded-[160px]"
                    width={130}
                    height={130}
                  />
                ) : (
                  <Image
                    src="/프로필.png"
                    alt=""
                    className="w-[130px] h-[130px] rounded-[160px]"
                    width={130}
                    height={130}
                  />
                )}
              </div>
              <div className="w-[250px] h-[337px] mt-[11.4px]">
                <p className="font-bold text-[11px] text-center mb-3">{team.name}</p>
                <p className="w-[200px] font-bold text-[10px] text-[#797979] text-center m-[0_auto]">
                  {team.group}/{team.position}
                </p>
                <p className="w-[190px] font-normal text-[9.84px] mt-[8.44px] text-center m-[0_auto]">{team.tagline}</p>
                <p className="font-normal text-[9.84px] mt-[14px] text-center">{team.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export function ContactUs({ theme, data }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-05" className="h-[200px]">
        ContactUs A
      </section>
    );
  } else {
    return (
      <section id="w-05" className="h-[200px]">
        ContactUs B
      </section>
    );
  }
}

export function Press({ theme, data }: HeaderPageProps) {
  const news = data.news_elements;

  if (theme === 'ThemeA') {
    return (
      <section id="w-06" className="h-[auto] font-['LINE'] my-[30px]">
        <div className="ml-[100px] flex items-center">
          <span className="mr-[9px] font-[700] text-[23px]">News Room</span>
          <span className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            보도 자료
          </span>
        </div>
        <div className="w-[1200px] mt-[43px] ml-[100px]">
          {news.map((item: any) => {
            return (
              <div
                key={item.news_element_id}
                className="w-[1190px] border-t-[1.4px] border-b-[1.4px] border-[#DFDFDF] flex"
              >
                <div className="w-[100px] h-[100px] ml-[34px] my-[10px] flex flex-col items-center justify-center">
                  <p className="text-[34px] font-bold text-[#4B48DF] text-center">3</p>
                  <div className="mt-[-12px]">
                    <span className="text-[10px] font-bold text-[#868686] pr-[5px]">Jul</span>
                    <span className="text-[10px] font-bold text-[#868686]">{item.date}</span>
                  </div>
                </div>
                <div className="w-[700px] ml-[39px] mt-[35px]">
                  <p className="text-[14px]/[110%] font-bold">{item.title}</p>
                  <p className="text-[11px]/[170%] text-[#868686] mt-[10px]">{item.description}</p>
                </div>
                <div className="w-[160px] h-[80px] ml-[80px] pt-[6px]">
                  {item.image ? <img src={item.image} alt="" /> : <img src="/기사사진.png" alt="" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-06" className="h-[auto] mt-[20px]">
        <div className="ml-[100px]">
          <span className="mr-[9px] font-[700] text-[23px] text-[#FFB800]">News Room</span>
          <p className="text-[#000] text-[30px] mt-[20px] pl-[2px] font-['Korail']">새로운 소식</p>
        </div>
        <div className="w-[1080px] h-[auto] m-[0_auto] mt-[25px]">
          {news.map((item: any) => (
            <div key={item.news_element_id} className="w-[1080px] flex mb-[40px]">
              <div>
                {item.image ? (
                  <img src={item.image} className="w-[180px] h-[100px] rounded-[24px]" alt="" />
                ) : (
                  <img src="/기사사진.png" className="w-[180px] h-[100px] rounded-[24px]" alt="" />
                )}
              </div>
              <div className="w-[820px] ml-[40px]">
                <p className="text-[20px]/[110%] font-bold">{item.title}</p>
                <p className="text-[8px] text-[#939393]">{item.date}</p>
                <p className="text-[13px] text-[#464646]">{item.description}</p>
              </div>
            </div>
          ))}
          <div className="w-[229px] h-[41px] m-[0_auto] border border-[#868686] rounded-full">
            <button className="w-[229px] h-[41px] m-[0_auto] text-[#868686] text-[13px]">더 보기 (3/N)</button>
          </div>
        </div>
      </section>
    );
  }
}

export function Download({ theme, data, intro_page_id }: HeaderPageProps) {
  const [type, setType] = useState('MEDIAKIT');
  const { mutate: downloadDashboardMutation } = useMutation(
    () => downloadDashboard({ type: type, email: '', intro_page_id: intro_page_id }),
    {
      onSuccess: (data) => {
        console.log('success', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );
  if (theme === 'ThemeA') {
    return (
      <section id="w-07" className="h-[120px] font-['LINE'] bg-primary-500 text-white flex">
        <div className="font-[700] text-[25px] pt-[45px] pl-[100px]">DOWNLOAD</div>
        <a href={data.media_kit_file} download target="_blank">
          <button
            className="flex bg-white text-black py-[10px] px-[15px] drop-shadow-xl h-[45px] ml-[620px] mt-[40px]"
            onClick={() => {
              setType('MEDIAKIT');
              downloadDashboardMutation();
            }}
          >
            미디어 키트
            <img src="/attach_file.svg" className="w-[17px] h-[17px] translate-y-[3px]" />
          </button>
        </a>
        <a href={data.intro_file} download target="_blank">
          <button
            className="flex bg-white text-black py-[10px] px-[15px] drop-shadow-xl h-[45px] ml-[50px] mt-[40px]"
            onClick={() => {
              setType('INTROFILE');
              downloadDashboardMutation();
            }}
          >
            회사 소개서
            <img src="/attach_file.svg" className="w-[17px] h-[17px] translate-y-[3px]" />
          </button>
        </a>
      </section>
    );
  } else {
    return (
      <section
        id="w-07"
        className="h-[110px] font-['Korail'] bg-GrayScaleNeutral-100 rounded-[112px] my-[20px] mx-[50px] flex"
      >
        <div className="font-[700] text-[22px] pt-[45px] pl-[50px] w-[750px]">{data.description}</div>
        <a href={data.media_kit_file} download target="_blank">
          <button
            className="flex bg-GrayScaleNeutral-800 text-white pt-[13px] pl-[22px] pr-[15px] drop-shadow-xl h-[45px] ml-[110px] mt-[35px] rounded-[80px] text-[12px]"
            onClick={() => {
              setType('MEDIAKIT');
              downloadDashboardMutation();
            }}
            type="button"
          >
            미디어 키트
            <img src="/attach_file_white.svg" className="w-[17px] h-[17px] ml-[3px]" />
          </button>
        </a>
        <a href={data.intro_file} download target="_blank">
          <button
            className="flex bg-GrayScaleNeutral-800 text-white pt-[13px] pl-[22px] pr-[15px] drop-shadow-xl h-[45px] ml-[20px] mt-[35px] rounded-[80px] text-[12px]"
            onClick={() => {
              setType('INTROFILE');
              downloadDashboardMutation();
            }}
          >
            회사 소개서
            <img src="/attach_file_white.svg" className="w-[17px] h-[17px] ml-[3px]" />
          </button>
        </a>
      </section>
    );
  }
}

export function History({ theme, data }: HeaderPageProps) {
  const historys = data.history_elements;
  if (theme === 'ThemeA') {
    return (
      <section id="w-08" className="h-[auto] font-['LINE'] my-[40px]">
        <div className="ml-[100px] flex items-center">
          <span className="mr-[9px] font-[700] text-[23px]">History</span>
          <span className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">연혁</span>
        </div>

        <div className="mt-[15px] flex flex-col md:grid grid-cols-9 mx-auto p-2 text-GrayScalePrimary-800">
          {historys.map((item: any, i: any) => (
            <React.Fragment key={item.history_element_id}>
              {i % 2 === 0 ? (
                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-[1px] bg-primary-400 pointer-events-none"></div>
                    </div>
                    <div className="w-5 h-5 ml-[2px] absolute top-1/2 -mt-3 rounded-full bg-white border-4 border-primary-400"></div>
                  </div>
                  <div className="col-start-6 col-end-10 p-4 my-4 mr-auto mt-[60px]">
                    <p className="font-bold text-[17px]/[100%]">{item.date}</p>
                    <p className="font-bold text-[9px]/[100%] mt-[13px]">{item.title}</p>
                    <p className="font-bold text-[10px]/[170%] mt-[5px] text-[#464646]">{item.description}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row-reverse md:contents">
                  <div className="col-start-1 col-end-5 ml-auto mt-[60px]">
                    <h3 className="mb-1 flex justify-end font-bold text-[17px]/[100%]">{item.date}</h3>
                    <p className="leading-tight text-justify flex justify-end font-bold text-[9px]/[100%] mt-[13px]">
                      {item.title}
                    </p>
                    <p className="leading-tight text-justify font-bold text-[9px]/[100%] mt-[5px]">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-[1px] bg-primary-400 pointer-events-none"></div>
                    </div>
                    <div className="w-5 h-5 ml-[2px] absolute top-1/2 -mt-3 rounded-full bg-white border-4 border-primary-400"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
          <button className="w-[113px] h-[33px] border border-solid border-[#4B48DF] ml-[580px]">MORE (3/N)</button>
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-08" className="h-[auto]">
        <div className="ml-[40px]">
          <span className="mr-[9px] ml-[60px] font-[700] text-[23px] text-[#FFB800]">History</span>
          <p className="text-[#000] ml-[57px] text-[30px] mt-[20px] pl-[2px] font-['Korail']">질링스가 걸어온 길</p>

          <div className="w-[1080px] h-[auto] m-[auto] rounded-[25px] shadow-[0px_0.7px_8.5px_0px__rgba(197,197,197,0.30)] mt-[30px] pb-[30px]">
            <ul className="w-[800px] h-[400px] m-[0px_auto] pt-[40px]">
              {historys.map((item: any, i: any) => (
                <li key={i} className="relative flex items-baseline gap-6 pb-8">
                  <div className="before:absolute before:left-[5.5px] before:h-full before:w-[2.5px] before:bg-review">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="12"
                      className="bi bi-circle-fill fill-review"
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <p className="text-[22px] font-bold text-[#464646]">{item.date}</p>
                      <p className="text-sm mt-[11px] text-[14px] font-bold text-[#464646]">{item.title}</p>
                      <p className="text-[11px] text-[#464646]">{item.description}</p>
                    </div>
                    <div className="w-[85px] h-[85px] absolute right-0">
                      {item.image ? (
                        <img src={item.image} className="w-[85px] h-[85px] mt-[10px] rounded-xl" alt="" />
                      ) : (
                        <img src="/기본이미지.png" className="w-[85px] h-[85px] mt-[10px]" alt="" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="w-[229px] h-[41px] m-[0_auto] border border-[#868686] rounded-full">
              <button className="w-[229px] h-[41px] m-[0_auto] text-[#868686] text-[13px]">더 보기 (3/N)</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export function Result({ theme, data }: HeaderPageProps) {
  if (theme === 'ThemeA') {
    return (
      <section id="w-10" className="font-['LINE'] h-[auto] my-[30px]">
        <div className="ml-[100px] flex items-center mt-[14px]">
          <span className="mr-[9px] font-[700] text-[23px]">Key Achievements</span>
          <span className="text-GrayScalePrimary-600 font-[400] text-[12px] w-[256px] mt-[8px] pl-[2px]">
            핵심 성과
          </span>
        </div>

        <div className="w-[1200px] h-[150px] ml-[60px] mt-[42.19px] flex flex-wrap">
          {[1, 2, 3, 4].map((_, i) => (
            <div className="w-[300px] h-[113px]" key={i}>
              <p className="font-bold text-[36px]/[100%] text-primary-500 text-center mt-[15px]">100%</p>
              <p className="text-[20px]/[100%] text-[#000] mt-[20px] text-center">초기 투자금 유치</p>
              <p className="text-[16px]/[100%] mt-[12px] text-[#939393] text-center">성과 지표 부가 설명</p>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-10" className="h-[300px] mb-[40px]">
        <div className="ml-[100px] mt-[40px]">
          <span className="mr-[9px] font-[700] text-[23px] text-[#FFB800]">Key Achievements</span>
          <p className="text-[#000] text-[30px] mt-[20px] pl-[2px] font-['Korail']">우리는 성장하고 있습니다.</p>
        </div>
        <div className="w-[1080px] h-[114px] m-[0_auto] mt-[42.19px] flex flex-wrap space-x-5">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              className="w-[255px] h-[140px] rounded-2xl bg-[#fff] shadow-[0px_1px_12px_0px__rgba(197,197,197,0.3)]"
              key={i}
            >
              <p className="font-bold text-[32px]/[100%] text-[#000] text-center mt-[30px] font-['Korail']">7억원</p>
              <p className="font-bold text-[18px]/[100%] text-[#000] mt-[13px] text-center">초기 투자금 유치</p>
              <p className="text-[10px]/[120%] mt-[5px] text-[#000] text-center">
                2018년 5개 투자사로부터 초기 투자 자금 유치
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export function Channel({ theme, data }: HeaderPageProps) {
  const channelValues = Object.values(data);
  if (theme === 'ThemeA') {
    return (
      <section id="w-13" className="h-[200px] w-full relative mt-[20px]">
        <span className="font-[700] text-[22px] font-[LINE] ml-[100px]">SNS Channel</span>
        <span className="font-[500] text-[10px] text-GrayScaleNeutral-700 ml-[5px] mt-[30px]">채널</span>
        <div className="flex mt-[30px] w-[calc(100%-200px)] ml-[100px] h-[50px] justify-center">
          {channelList.map((items, index) => {
            if (channelValues[index * 2 + 1]) {
              return (
                <button
                  className="flex flex-row mr-[4px]"
                  key={index}
                  onClick={() => {
                    const url = channelValues[index * 2 + 1];
                    if (typeof url === 'string') {
                      window.open(url, '_blank');
                    }
                  }}
                >
                  <img src={items.img} className="w-[50px] h-[50px]" />
                </button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section id="w-13" className="h-[210px] w-full relative mt bg-GrayScaleNeutral-100 mt-[40px]">
        <div className="font-[700] text-[#FFB800] ml-[100px] pt-[30px] text-[23px]">SNS Channel</div>
        <div className="flex mt-[30px] w-[calc(100%-200px)] ml-[100px] h-[50px] justify-center">
          {channelList.map((items, index) => {
            if (channelValues[index * 2 + 1]) {
              return (
                <button
                  className="flex flex-row mr-[4px] bg-white w-[70px] h-[70px] rounded-[14px] drop-shadow-xl mx-[20px] items-center justify-center"
                  key={index}
                  onClick={() => {
                    const url = channelValues[index * 2 + 1];
                    if (typeof url === 'string') {
                      window.open(url, '_blank');
                    }
                  }}
                >
                  <img src={items.img} className="w-[50px] h-[50px]" />
                </button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
    );
  }
}
