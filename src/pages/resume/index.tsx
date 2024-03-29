// import { Document, Page, pdfjs } from "react-pdf";
// import PDFPreview from "./PDFpreview";
import { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../../components/Nav/Nav";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import {
  getResume,
  updateResume,
  uploadResumeFile,
  deleteResumeFile,
  deleteResume,
} from "../api/resume";
import { useQuery } from "@tanstack/react-query";
import ClickButton from "../../components/common/clickButton";

export default function Resume() {
  const [resume, setResume] = useState(null);

  const query = useQuery({
    queryKey: ["resume"],
    queryFn: () => getResume("Pa2BIvea0YyQftuOdIRw"),
  });

  useEffect(() => {
    if (query.data) {
      setResume(query.data);
    }
  }, [query.data]);

  const handleFileChange = async (e) => {
    await setResume(null);
    const file = e.target.files[0];
    uploadResumeFile(file, setResume);
  };

  const deleteFile = async () => {
    const checkDelete = window.confirm("삭제하시겠습니까?");
    if (checkDelete) {
      setResume(null);
      deleteResumeFile(resume);
      deleteResume("Pa2BIvea0YyQftuOdIRw");
    }
  };

  // 라이브버리 사용해 pdf render 구현
  // const [page, setPageNumber] = useState<number>(1);
  // const pageNumber = Array.from({ length: page }, (v, i) => i);

  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  // 이거 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  // const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
  //   setPageNumber(numPages);
  // };

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
            className="text-3xl p-2 bg-white rounded-lg text-main text-center leading-relaxed
            font-bold w-3/6 h-16"
          >
            이력서 선택
            <input
              type="file"
              onChange={handleFileChange}
              id="file"
              className="hidden"
            />
          </label>
          <ClickButton
            onclick={() => updateResume(resume, "Pa2BIvea0YyQftuOdIRw")}
            text={"이력서 등록"}
            fontSize={"1.875rem"}
            width={"50%"}
            height={"4rem"}
          />
          <ClickButton
            onclick={deleteFile}
            text={"이력서 삭제"}
            fontSize={"1.875rem"}
            width={"50%"}
            height={"4rem"}
          />
        </div>

        {resume ? (
          // 라이브러리 사용해 pdf render 구현
          // <div>
          //   <Document
          //     file={{ url: resumeFile }}
          //     onLoadSuccess={onDocumentLoadSuccess}
          //   >
          //     {pageNumber.map((pages, idx) => {
          //       return <Page key={idx} pageNumber={pages + 1} />;
          //     })}
          //   </Document>
          // </div>

          <iframe
            src={resume}
            seamless
            className="w-width60 h-height60"
          ></iframe>
        ) : (
          // <div className="w-width60">
          //   <PDFPreview pdf={resumeFile} />
          // </div>

          <div className="m-60 text-4xl text-gray200">
            등록된 이력서가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
