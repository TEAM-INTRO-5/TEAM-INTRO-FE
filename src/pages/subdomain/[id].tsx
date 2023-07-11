import { postIntroPageUser } from '@/apis/subdomain';
import {
  Channel,
  ContactUs,
  Download,
  Footer,
  Header,
  KeyVisual,
  MissionVision,
  Press,
  ProductService,
  Result,
  TeamMember,
  History,
} from '@/components/subdomain/Widget';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useStore from '@/store';
import { is } from 'date-fns/locale';
import ErrorPage from '../404';
import Loading from '../Loading';
import type { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';

interface PreviewProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
}

function Preview({ data, isLoading, isSuccess }: PreviewProps) {
  if (isLoading) return <Loading />;
  if (!isSuccess) return <ErrorPage />;
  const { widgets, theme, header_and_footer, company_info, site_info, intro_page_id } = data;
  return (
    <div>
      {
        <div className="w-full h-full">
          {/* 헤더 */}
          <Header
            theme={theme.type}
            data={company_info}
            header_and_footer_status_list={Object.values(header_and_footer)}
          />
          {/* 위젯 */}
          {widgets.map((widget: any, index: number) => {
            const widgetId = widget.widget_type;
            return (
              <div key={index}>
                {widgetId === 5 && widget.widget_status ? <KeyVisual theme={theme.type} data={widget} /> : null}
                {widgetId === 1 && widget.widget_status ? <MissionVision theme={theme.type} data={widget} /> : null}

                {widgetId === 2 && widget.widget_status ? <ProductService theme={theme.type} data={widget} /> : null}
                {widgetId === 6 && widget.widget_status ? <TeamMember theme={theme.type} data={widget} /> : null}
                {widgetId === 3 && widget.widget_status ? <ContactUs theme={theme.type} data={widget} /> : null}
                {widgetId === 11 && widget.widget_status ? <Press theme={theme.type} data={widget} /> : null}
                {widgetId === 12 && widget.widget_status ? (
                  <Download theme={theme.type} data={widget} intro_page_id={intro_page_id} />
                ) : null}
                {widgetId === 9 && widget.widget_status ? <History theme={theme.type} data={widget} /> : null}
                {/* {widgetId === 8 && widget.widget_status ? <TeamCulture theme={theme.type} /> : null} */}
                {widgetId === 7 && widget.widget_status ? <Result theme={theme.type} data={widget} /> : null}
                {/* {widgetId === 13 && widget.widget_status ? <Partners theme={theme.type} /> : null} */}
                {/* {widgetId === 4 && widget.widget_status ? <Review theme={theme.type} /> : null} */}
                {widgetId === 14 && widget.widget_status ? <Channel theme={theme.type} data={widget.sns_list} /> : null}
                {/* {widgetId === 10 && widget.widget_status ? <Patent theme={theme.type} /> : null} */}
              </div>
            );
          })}
          {/* 푸터 */}
          {header_and_footer.footer ? <Footer theme={theme.type} data={{ ...site_info, ...company_info }} /> : null}
        </div>
      }
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // 빈 배열 또는 사전 정의된 동적 경로 배열
    fallback: true, // fallback 값을 true로 설정하여 다른 경로들을 대체합니다.
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['subdomain', id], () => postIntroPageUser({ sub_domain: id as string }));

  // if (id) {
  //   try {
  //     const { data: subDomainData } = await postIntroPageUser({
  //       sub_domain: id as string,
  //     });

  //     return {
  //       props: {
  //         subDomainData,
  //         id,
  //       },
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       props: {
  //         subDomainData: null,
  //         id,
  //       },
  //     };
  //   }
  // }

  return {
    props: {
      // subDomainData: null,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Page() {
  // if (subDomainData === null) {
  //   return <ErrorPage />;
  // }
  // if (!subDomainData) {
  //   return <Loading />;
  // }
  // return <div>success</div>;
  const router = useRouter();
  console.log(router.query.id);
  const {
    data: subDomainData,
    isLoading,
    isSuccess,
  } = useQuery(['subdomain', router.query.id], () => postIntroPageUser({ sub_domain: router.query.id as string }));
  if (isLoading) return <Loading />;
  if (!isSuccess) return <ErrorPage />;
  return <Preview data={subDomainData.data} isLoading={isLoading} isSuccess={isSuccess} />;
}

// export async function getStaticPaths() {
//   const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
//   const posts = response.data;
//   const paths = posts.map((post: any) => ({ params: { id: `${post.id}` } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: { params: any }) {
//   const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
//   const post = response.data;
//   return { props: { post } };
// }

// function PostDetail({ post }: { post: any }) {
//   return (
//     <div>
//       <h5>{post.id}</h5>
//       <h4>{post.title}</h4>
//       <p>{post.body}</p>
//     </div>
//   );
// }

// export default PostDetail;
