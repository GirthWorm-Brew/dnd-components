import { Container } from "react-bootstrap";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useEffect, useState } from "react";
import "./phb.standalone.css";
import "./Page.css";
import { useParams } from "react-router";
import { CharacterClass } from "../../modules/open5e/types.gen";
import { classesRetrieve } from "../../modules/open5e/sdk.gen";
import { useHandbookData } from "./useHandbookData";

async function parseMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
type ParsedContent = {
  table: string;
  desc: string;
};

export default function ClassPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: charClass, loading } = useHandbookData(
    stub,
    classesRetrieve,
    (data): data is CharacterClass =>
      (data as CharacterClass)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!charClass) {
    return (
      <div>
        <p>Class not found</p>
      </div>
    );
  }
  return (
    <Container className="phb page soft">
      <h1>Class</h1>
      <div className="columnWrapper" id="p2" data-index="1">
        <h2>{charClass.name}</h2>
        <div
          className="classDescription"
          dangerouslySetInnerHTML={{ __html: content.desc }}
        >
          {charClass.desc}
        </div>
        <div
          className="wide classTable"
          dangerouslySetInnerHTML={{ __html: content.table }}
        />
        {charClass.name}
      </div>
      {/* Also commented out because it breaks the page */}
      {/* <a className="artist" href={char.document__url}>
          {char.document__slug}
        </a> */}
      <div className="footnote">
        <p className="">{charClass.document.name}</p>
      </div>
      <div className="pageNumber auto"></div>
    </Container>
  );
}
