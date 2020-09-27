import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";

import BaseLayout from "components/layout/BaseLayout";
import { Link } from "components/link/Link";
import Back from "assets/svg/back.svg";

import s from "./NewsTemplate.scss";

export default function NewsTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <BaseLayout>
      <div className={s.news}>
        <Link className={s.news__back__button} to="/">
          <Back />
          Back
        </Link>
        <h1 className={s.news__title}>{frontmatter.title}</h1>
        <div className={s.news__sub__container}>
          <h6 className={s.news__category}>{frontmatter.category}</h6>
          <h2 className={s.news__date}>{frontmatter.date}</h2>
        </div>

        <div className={s.news__author}>
          <div className={s.news__author__avatar__container}>
            <Image
              className={s.news__author__avatar}
              fluid={
                data.markdownRemark.frontmatter.author.avatar.childImageSharp
                  .fluid
              }
            />
          </div>
          <h6 className={s.news__author__name}>{frontmatter.author.id}</h6>
        </div>
        <div className={s.news__hero__container}>
          <Image
            className={s.news__hero}
            fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
          />
        </div>
        <div
          className={s.news__content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </BaseLayout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        category
        author {
          id
          bio
          avatar {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
