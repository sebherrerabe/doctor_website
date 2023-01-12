export interface ISiteSettings {
  id: number;
  name: string;
  position: string;
  description: string;
  favicon: string;
  logo: string;
  background_image: string;
  main_image: string;
  brand_color: string;
  primary_color: string;
  secondary_color: string;
  text_color: string;
}

export interface IPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  icon: string;
  image: string | null;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
  order: number;
}

export interface ILayout {
  pages: IPage[];
  siteSettings: ISiteSettings;
}

export interface INews {
  id: number;
  date_published: string;
  title: string;
  description: string;
  content: string;
  image: string;
  is_active: boolean;
  author: string;
}
