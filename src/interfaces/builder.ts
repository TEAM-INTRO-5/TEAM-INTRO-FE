import { type } from 'os';

export interface MenuAProps {
  routerName: string; // 이동할 페이지 경로
  buttonName: string; // 버튼 이름
}

export interface MenuBProps {
  routerName: string; // 이동할 페이지 경로
  buttonId: number; // 버튼 이름
}

export interface getIntroPageResponse {
  status: number;
  msg: string;
  data: {
    intro_page_id: number;
    intro_page_status: 'PRIVATE' | 'PUBLIC';
    theme: {
      type: 'ThemeA' | 'ThemeB';
      color: string;
    };
    company_info: any;
    site_info: any;
    header_and_footer: any;
    widgets: any;
  };
}

export interface createIntroPageRequest {
  widget_type_list: string[];
}

export interface updateIntroPageRequest {
  status: boolean;
  widget_status_list: boolean[];
  order_list: number[];
}

export interface updateChannelRequest {
  widget_status: boolean;
  instagram_status: boolean;
  instagram: string;
  linked_in_status: boolean;
  linked_in: string;
  youtube_status: boolean;
  youtube: string;
  notion_status: boolean;
  notion: string;
  naver_blog_status: boolean;
  naver_blog: string;
  brunch_stroy_status: boolean;
  brunch_stroy: string;
  facebook_status: boolean;
  facebook: string;
}

export interface updateCompanyInfoRequest {
  representative: string;
  logo: string;
  contact_email: string;
  phone_number: string;
  fax_number: string;
}

export interface updateThemeRequest {
  theme_type: 'ThemeA' | 'ThemeB';
  color: string;
}

export interface updateHeaderAndFooterRequest {
  header_and_footer_status_list: boolean[];
}

export interface updateKeyVisualRequest {
  widget_status: boolean;
  background: string;
  filter: string;
  slogan: string;
  slogan_detail: string;
}

export interface updateMissionVisionRequest {
  widget_status: boolean;
  mission: string;
  mission_detail: string;
  vision: string;
  vision_detail: string;
}

export interface updateSiteInfoRequest {
  pavicon: string;
  sub_domain: string;
  title: string;
  description: string;
}
