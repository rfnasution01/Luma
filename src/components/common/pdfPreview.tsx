export default function PDFPreview({ pdfUrl }) {
  return (
    <div className="scrollbar flex h-full flex-col overflow-auto rounded-2xl">
      {pdfUrl ? (
        <iframe
          title="PDF Preview"
          src={pdfUrl}
          className="h-[120rem] w-full phones:h-[80rem]"
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  )
}
