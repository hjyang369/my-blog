// 'use client"
import { useState } from "react";
import Button from "../../components/common/button";
import { Document, Page, pdfjs } from "react-pdf";
import Head from "next/head";
import Nav from "../../components/Nav/Nav";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

export default function Resume() {
  const [resumeFile, setResumeFile] = useState(null);
  const [page, setPageNumber] = useState<number>(1);
  const pageNumber = Array.from({ length: page }, (v, i) => i);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setPageNumber(numPages);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  return (
    <div>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center gap-4 p-4">
        <Nav />
        {/* 로그인, 회원가입 개발 이후 본인만 보이도록 수정 */}
        <div className="w-width60 flex items-center justify-between gap-4 ">
          <label
            htmlFor="file"
            className="text-3xl p-2 bg-white rounded-lg text-main text-center
            font-bold w-3/6"
          >
            이력서 등록
            <input
              type="file"
              onChange={handleFileChange}
              id="file"
              className="hidden"
            />
          </label>
          <Button text={"이력서 삭제"} fontSize={"1.875rem"} width={"50%"} />
        </div>
        {resumeFile ? (
          <div>
            <Document file={resumeFile} onLoadSuccess={onDocumentLoadSuccess}>
              {pageNumber.map((pages, idx) => {
                return <Page key={idx} pageNumber={pages + 1} />;
              })}
            </Document>
          </div>
        ) : (
          <div className="m-60 text-4xl text-gray200">
            등록된 이력서가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
