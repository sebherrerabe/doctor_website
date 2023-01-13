import { ICategory, IContactDetails, ILayout, INews, IPage, IPagination, ISiteSettings } from "../types";

import axios from "axios";

const apiHost = process.env.API_HOST;

export const getSiteSettings = async () => {
  const { data: siteSettings } = await axios.get<ISiteSettings>(`${apiHost}/api/site-settings`);
  return siteSettings;
};

export const getPageList = async () => {
  const { data: pages } = await axios.get<IPage[]>(`${apiHost}/api/pages`);
  return pages;
};

export const getPageDetail = async (slug?: string) => {
  const { data: page } = await axios.get<IPage>(`${apiHost}/api/pages/${slug || ""}`);
  return page;
};

export const getNewsListByCategory = async () => {
  const { data: newsByCategory } = await axios.get<ICategory[]>(`${apiHost}/api/news/category/`);
  return newsByCategory;
};

export const getNewsListByDate = async () => {
  const { data: newsByDate } = await axios.get<ICategory[]>(`${apiHost}/api/news/date/`);
  return newsByDate;
};

export const getHighlights = async () => {
  const { data: highlights } = await axios.get<INews[]>(`${apiHost}/api/news/?highlights`);
  return highlights;
};

export const getNewsList = async ({ page }: { page?: number } = {}) => {
  const { data: news } = await axios.get<IPagination<INews>>(`${apiHost}/api/news/${page ? `?page=${page}` : ""}`);
  return news;
};

export const getNewsDetail = async (slug?: string) => {
  const { data: news } = await axios.get<INews>(`${apiHost}/api/news/${slug || ""}`);
  return news;
};

export const getLayout = async (): Promise<ILayout> => {
  const [siteSettings, pages] = await Promise.all([getSiteSettings(), getPageList()]);
  return {
    pages,
    siteSettings,
  };
};

export const getContactDetails = async () => {
  const { data: contactDetails } = await axios.get<IContactDetails>(`${apiHost}/api/contact-details`);
  return contactDetails;
};
