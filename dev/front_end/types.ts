export interface ISiteSettings {
  id: number;
  name: string;
  position: string;
  description: string;
  favicon: IImage;
  logo: IImage;
  background_image: IImage;
  hero_images: IImage[];
  brand_color: string;
  primary_color: string;
  secondary_color: string;
  text_color: string;
}

export interface IPage {
  title: string;
  slug: string;
  content: string;
  icon: IIcon | null;
  image: IImage | null;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
  order: number;
}

export interface ILayout {
  pages: IPage[];
  siteSettings: ISiteSettings;
}

export interface INewsContext {
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
}

export interface INews {
  slug: string;
  date_published: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: IImage;
  is_active: boolean;
  author: string;
  categories: ICategory[] | string[];
}

export interface IPagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IActualites extends IPagination<INews> {
  page: number;
}

export interface ICategory {
  slug?: string;
  name: string;
  news: INews[];
}

export type IActiveState = Record<
  ICategory["name"],
  {
    isActive: boolean;
    news: ICategory["news"];
  }
>;

export interface IContactDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  embedded_map: string;
  image: IImage | null;
  show_contact_form: boolean;
}

export interface IImage {
  name: string;
  image: string;
  alt: string;
}

export interface IIcon {
  name: string;
  icon: string;
  alt: string;
}
