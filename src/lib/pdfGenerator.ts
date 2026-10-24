import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

export async function exportCVToPDF(
  elementId: string,
  filename = "CV_Alexis_Alfaro_Salazar_Arquitecto_TI.pdf"
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  // Use html-to-image which natively supports modern CSS color functions (lab, oklch, color-mix)
  // via browser SVG foreignObject rendering instead of html2canvas AST parser.
  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 2.2,
    backgroundColor: "#ffffff",
    cacheBust: true,
  });

  // Calculate dimensions accurately
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (img.naturalHeight * pdfWidth) / img.naturalWidth;

  let heightLeft = imgHeight;
  let position = 0;

  // Page 1
  pdf.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
  heightLeft -= pdfHeight;

  // Subsequent pages (with 3mm threshold to avoid accidental trailing blank page)
  while (heightLeft > 3) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
}
