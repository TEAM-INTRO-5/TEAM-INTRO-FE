import { Store } from '@/interfaces/store';
import { create } from 'zustand';

const useStore = create<Store>((set) => ({
  // upload image
  uploadImage: {},
  setUploadImage: (uploadImage) => set({ uploadImage }),
  resetUploadImage: () => set({ uploadImage: {} }),
  // builder - 순서 변경 토글
  isChangeOederToggle: false,
  setIsChangeOederToggle: (isChangeOederToggle) => set({ isChangeOederToggle }),
  // builder - 공개 숨김 토글
  isPublicToggle: false,
  setIsPublicToggle: (isPublicToggle) => set({ isPublicToggle }),
  // builder - 위젯
  widgets: [
    {
      widget_id: 1,
      toggle: true,
      order_list: 1,
    },
    {
      widget_id: 2,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 3,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 4,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 5,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 6,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 7,
      toggle: false,
      order_list: 1,
    },
    { widget_id: 8, toggle: false, order_list: 1 },
    {
      widget_id: 9,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 10,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 11,
      toggle: false,
      order_list: 1,
    },
    {
      widget_id: 12,
      toggle: false,
      order_list: 1,
    },
    { widget_id: 13, toggle: false, order_list: 1 },
    {
      widget_id: 14,
      toggle: false,
      order_list: 1,
    },
  ],
  setWidget: (arr) => {
    set(() => ({ widgets: arr }));
  },
  setToggle: (id: number) => {
    set((state) => ({
      widgets: state.widgets.map((widget) => {
        if (widget.widget_id === id) {
          return { ...widget, toggle: !widget.toggle };
        } else {
          return widget;
        }
      }),
    }));
  },
  // builder - theme
  theme: { theme_type: 'ThemeA', color: '#725f5f' }, // A or B
  setTheme: (theme) => set({ theme }),
  // builder - site info edit
  siteInfo: {
    pavicon: '',
    title: '',
    description: '',
    sub_domain: '',
  },
  setPaivcon: (pavicon) => {
    set((state) => ({ siteInfo: { ...state.siteInfo, pavicon } }));
  },
  setSiteInfo: (siteInfo) => {
    set((state) => ({ siteInfo: { ...state.siteInfo, ...siteInfo } }));
  },

  // builder - company info edit
  companyInfo: {
    representative: '',
    logo: '',
    contact_email: '',
    phone_number: '',
    fax_number: '',
    biz_number: '',
    company_name: '',
    start_date: '',
  },
  setLogo: (logo) => {
    set((state) => ({ companyInfo: { ...state.companyInfo, logo } }));
  },
  setCompanyInfo: (companyInfo) => {
    set((state) => ({ companyInfo: { ...state.companyInfo, ...companyInfo } }));
  },

  // 제품/서비스 소개 부분
  buttondes: { buttonname: '' },
  setButtondes: (buttondes) => set({ buttondes }),

  add: false,
  setAdd: (add) => set({ add }),

  imgurl: '',
  setImgurl: (imgurl) => set({ imgurl }),
  products: [
    // {
    //   id: 1,
    //   name: '키비주얼/슬로건',
    //   title: '키비주얼/슬로건',
    //   description: '',
    //   image: '',
    // },
  ],

  setProducts: (arr) => set(() => ({ products: arr })),

  productservices: {
    order_list: '',
    description: '',
    text: '',
    link: '',
    setOrder_list: (order_list) => {
      set((state) => ({ productservices: { ...state.productservices, order_list } }));
    },
    setDescription: (description) => {
      set((state) => ({ productservices: { ...state.productservices, description } }));
    },
    setText: (text) => {
      set((state) => ({ productservices: { ...state.productservices, text } }));
    },
    setLink: (link) => {
      set((state) => ({ productservices: { ...state.productservices, link } }));
    },
  },
  // builder - header, footer
  header_and_footer_status_list: [true, false, true, false, true, false, true, false, true, false, true, false, true],
  setHeaderAndFooter: (index) => {
    set((state) => {
      const arr = state.header_and_footer_status_list.map((item, i) => {
        if (i === index) {
          return !item;
        }
        return item;
      });
      return { header_and_footer_status_list: arr };
    });
  },
  // 배열로 받은 값을 header_and_footer_status_list 에 넣어준다.
  setHeaderAndFooterList: (arr) => {
    set(() => ({ header_and_footer_status_list: arr }));
  },

  // builder - keyvisual
  keyVisual: {
    background: '',
    filter: 'BLACK',
    slogan: '',
    slogan_detail: '',
  },
  setBackground: (background) => {
    set((state) => ({ keyVisual: { ...state.keyVisual, background } }));
  },
  setKeyVisual: (keyVisual) => {
    set((state) => ({ keyVisual: { ...state.keyVisual, ...keyVisual } }));
  },
  setSloganDetail: (slogan_detail) => {
    set((state) => ({ keyVisual: { ...state.keyVisual, slogan_detail } }));
  },
  // builder - missionvision
  missionVision: {
    mission: '',
    mission_detail: '',
    vision: '',
    vision_detail: '',
  },
  setMissionDetail: (mission_detail) => {
    set((state) => ({ missionVision: { ...state.missionVision, mission_detail } }));
  },
  setVisionDetail: (vision_detail) => {
    set((state) => ({ missionVision: { ...state.missionVision, vision_detail } }));
  },
  setMissionVision: (missionVision) => {
    set((state) => ({ missionVision: { ...state.missionVision, ...missionVision } }));
  },
  // builder - channel
  channel: {
    instagram_status: false,
    instagram: '',
    linked_in_status: false,
    linked_in: '',
    youtube_status: false,
    youtube: '',
    notion_status: false,
    notion: '',
    naver_blog_status: false,
    naver_blog: '',
    brunch_stroy_status: false,
    brunch_stroy: '',
    facebook_status: false,
    facebook: '',
  },
  setChannel: (channel) => {
    set((state) => ({ channel: { ...state.channel, ...channel } }));
  },
  // builder - partner
  partner: {},
  // builder - download
  download: {
    description: '',
    media_kit_file: '',
    intro_file: '',
  },
  setDownload: (download) => {
    set((state) => ({ download: { ...state.download, ...download } }));
  },
  // 팀 멤버
  teamadd: false,
  setTeamAdd: (teamadd) => set({ teamadd }),
  teamimgurl: '',
  setTeamImgurl: (teamimgurl) => set({ teamimgurl }),
  teammembers: [
    // {
    //   id: 1,
    //   name: '홍길동',
    //   group: '지원사업부',
    //   position: '주임',
    //   tagline: '스타트업 전문 패스트 빌더입니다.',
    //   email: 'example@gmail.com'
    //   profile: ''
    // },
  ],

  setTeamMember: (arr) => set(() => ({ teammembers: arr })),

  // 보도자료
  newsadd: false,
  setNewsAdd: (newsadd) => set({ newsadd }),
  newsimgurl: '',
  setNewsImgurl: (newsimgurl) => set({ newsimgurl }),
  news: [
    // {
    //   id: 1,
    //   name: '홍길동',
    //   group: '지원사업부',
    //   position: '주임',
    //   tagline: '스타트업 전문 패스트 빌더입니다.',
    //   email: 'example@gmail.com'
    //   profile: ''
    // },
  ],

  setNews: (arr) => set(() => ({ news: arr })),

  // 연혁
  historyadd: false,
  setHistoryAdd: (historyadd) => set({ historyadd }),
  historyimgurl: '',
  setHistoryImgurl: (historyimgurl) => set({ historyimgurl }),
  historys: [
    // {
    //   id: 1,
    //   name: '홍길동',
    //   group: '지원사업부',
    //   position: '주임',
    //   tagline: '스타트업 전문 패스트 빌더입니다.',
    //   email: 'example@gmail.com'
    //   profile: ''
    // },
  ],

  setHistorys: (arr) => set(() => ({ historys: arr })),

  // 핵심 성과
  resultadd: false,
  setResultAdd: (resultadd) => set({ resultadd }),
  resultimgurl: '',
  setResultImgurl: (resultimgurl) => set({ resultimgurl }),
  results: [
    // {
    //   id: 1,
    //   name: '홍길동',
    //   group: '지원사업부',
    //   position: '주임',
    //   tagline: '스타트업 전문 패스트 빌더입니다.',
    //   email: 'example@gmail.com'
    //   profile: ''
    // },
  ],

  setResults: (arr) => set(() => ({ results: arr })),
}));

export default useStore;
