import React, { ReactNode } from "react";

import { Container } from "components/container/Container";

import s from "./Hero.scss";

interface HeroProps {
  title: string;
  text?: string;
  strong?: string;
  normal?: boolean;
}

export const Hero = ({ text, title, strong, normal }: HeroProps) => {
  const isText = normal;
  if (isText) {
    return (
      <div className={s.hero__normal}>
        <Container>
          <div className={s.hero__col}>
            <h1 className={s.title}>{title}</h1>
            {text ? <p className={s.text}>{text}</p> : ""}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className={s.hero}>
      <Container>
        <div className={s.hero__col}>
          <h1 className={s.title}>
            {strong ? <span className={s.strong}>{strong}</span> : ""}
            {title}
          </h1>
          {text ? <p className={s.text}>{text}</p> : ""}
        </div>
      </Container>
    </div>
  );
};
