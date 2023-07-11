export interface HeaderPageProps {
  theme: string;
  data: any;
  header_and_footer_status_list?: boolean[];
  intro_page_id?: number;
}

export interface postIntroPageUserRequest {
  sub_domain: string;
  keyword?: string;
  share?: string;
}
