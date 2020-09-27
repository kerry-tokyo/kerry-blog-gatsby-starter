import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Image from "gatsby-image";

import BaseLayout from "components/layout/BaseLayout";
import { NewsList } from "components/list/NewsList";

import { Hero } from "components/hero/Hero";

import s from "components/list/NewsList.scss";

// tslint:disable no-default-export
export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <BaseLayout>
      <Helmet title="Home" />

      <Hero
        normal
        title="Kerry Gatsby Starter is a modern starter that uses TypeScript, React and
        CSS modules."
      />

      <NewsList>
        {posts
          .filter((post) => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div key={post.id}>
                <div className={s.news__list__image__container}>
                  <Link to={post.frontmatter.slug}>
                    <Image
                      fluid={post.frontmatter.image.childImageSharp.fluid}
                      alt="news list image"
                      className={s.news__list__image}
                    />
                  </Link>
                </div>
                <div className={s.news__list__title__container}>
                  <h3 className={s.news__list__title}>
                    {post.frontmatter.title}
                  </h3>
                  <div className={s.news__list__avatar__container}>
                    <Image
                      className={s.news__list__avatar}
                      fluid={
                        post.frontmatter.author.avatar.childImageSharp.fluid
                      }
                    />
                  </div>
                </div>
                <div className={s.news__list__sub__container}>
                  <h6 className={s.news__list__category}>
                    {post.frontmatter.category}
                  </h6>
                  <h6 className={s.news__list__date}>
                    {post.frontmatter.date}
                  </h6>
                </div>
                <p>{post.frontmatter.excerpt}</p>
              </div>
            );
          })}
      </NewsList>
    </BaseLayout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
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
    }
  }
`;
