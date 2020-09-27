import React, { ReactNode } from "react";
import s from "./NewsList.scss";

interface NewsListProps {
  children: ReactNode;
}

export const NewsList = ({ children }: NewsListProps) => (
  <div className={s.news__list}>{children}</div>
);
