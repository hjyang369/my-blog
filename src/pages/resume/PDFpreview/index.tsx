import React, { useRef, useEffect } from "react";
import * as pdfjs from "pdfjs-dist/build/pdf"; // 'pdfjs-dist'에서 'build/pdf'를 가져옵니다.

const PDFPreview = ({ pdf }) => {
  const pdfContainer = useRef(null);
  let pdfInstance = null;

  useEffect(() => {
    // PDF.js 설정
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.disableFontFace = true;

    // PDF 렌더링 함수
    const renderPDF = async () => {
      try {
        let loadingTask;

        if (pdf instanceof File) {
          // 파일 데이터가 전달된 경우
          const fileReader = new FileReader();
          fileReader.onload = async (event: ProgressEvent<FileReader>) => {
            const typedArray = new Uint8Array(
              event.target.result as ArrayBuffer
            );
            loadingTask = pdfjs.getDocument({ data: typedArray });
            await renderPdfFromLoadingTask(loadingTask);
          };
          fileReader.readAsArrayBuffer(pdf);
        } else if (typeof pdf === "string" && pdf.startsWith("http")) {
          // URL이 전달된 경우
          loadingTask = pdfjs.getDocument({ url: pdf });

          await renderPdfFromLoadingTask(loadingTask);
        } else {
          throw new Error("유효하지 않은 PDF 데이터입니다.");
        }
      } catch (error) {
        console.error("PDF 렌더링 오류:", error);
      }
    };

    const renderPdfFromLoadingTask = async (loadingTask) => {
      const pdfDocument = await loadingTask.promise;

      const viewer = pdfContainer.current;

      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const pdfPage = await pdfDocument.getPage(pageNum);

        const viewport = pdfPage.getViewport({ scale: 5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = "60rem";

        viewer.appendChild(canvas);

        await pdfPage.render({
          canvasContext: context,
          viewport: viewport,
        });
      }

      pdfInstance = pdfDocument;
    };

    renderPDF();

    return () => {
      // 컴포넌트가 unmount될 때 cleanup
      if (pdfInstance !== null) {
        pdfInstance.destroy();
        pdfInstance = null;
      }
    };
  }, [pdf]);

  return <div ref={pdfContainer} />;
};

export default PDFPreview;
