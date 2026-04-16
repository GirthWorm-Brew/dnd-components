import { Container } from "react-bootstrap";
import { documentsRetrieve } from "../../modules/open5e/sdk.gen";
import { Document } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHandbookData } from "./useHandbookData";

export default function DocumentPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: document, loading } = useHandbookData(
    stub,
    documentsRetrieve,
    (data): data is Document => (data as Document)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div>
        <p>Condtion not found</p>
      </div>
    );
  }
  return (
    <Container className="page tocDepthH3">
      <main id="p1" data-index="0">
        <h1>Document</h1>
        <h2 className="wide">
          {document.name} -{" "}
          {document.publication_date.substring(
            0,
            document.publication_date.indexOf("T"),
          )}
        </h2>
        <p>{}</p>
        <a className="artist" href={document.permalink}>
          {document.publisher.name}
        </a>
      </main>
      <div className="footnote">
        <p className="">{document.display_name}</p>
      </div>
      <div className="pageNumber auto"></div>
    </Container>
  );
}
