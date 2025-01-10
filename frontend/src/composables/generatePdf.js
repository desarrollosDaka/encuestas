
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ServiceResponse from '@/services/Response'

const service_response = new ServiceResponse()
const bd_service_response = service_response.getFuentesData()

export function generatePdf(elementHtml) {

    const element = document.getElementById(elementHtml);

    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "letter");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 20; // Ajusta este valor para cambiar el margen
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth - 2 * margin;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const scaleFactor = 0.75; // Ajusta este valor para escalar la imagen

        let heightLeft = imgHeight * scaleFactor;
        let position = margin;

        pdf.addImage(imgData, "PNG", margin, position, imgWidth * scaleFactor, imgHeight * scaleFactor);
        heightLeft -= pdfHeight - 2 * margin;

        while (heightLeft >= 0) {

            position = heightLeft - imgHeight * scaleFactor + margin

            pdf.addPage();
            pdf.addImage(imgData, "PNG", margin, position, imgWidth * scaleFactor, imgHeight * scaleFactor);
            heightLeft -= pdfHeight - 2 * margin;
        }

        pdf.save("EncuestaPage.pdf");
    });

}


export async function generatePdfFromArray(dataArray, user, elementHtml) {
    const pdf = new jsPDF("p", "mm", "letter");
    const element = document.getElementById(elementHtml);
    const margin = 20;
    const lineHeight = 10;
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;

    // Renderizar la imagen en la primera página
    await html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const scaleFactor = 0.95;

        pdf.addImage(imgData, "PNG", margin, margin, imgWidth * scaleFactor, imgHeight * scaleFactor);
    });

    // Añadir una nueva página para las preguntas y respuestas
    pdf.addPage();
    let yPosition = margin;

    // Añadir preguntas y respuestas en las siguientes páginas
    for (const data of dataArray) {
        if (data.IdTipreg !== 8) {
            const linesPregunta = pdf.splitTextToSize(data.TextoPregunta, pageWidth);
            pdf.setTextColor(0, 0, 255); // Color azul para las preguntas

            linesPregunta.forEach((line) => {
                if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }
                pdf.text(line, margin, yPosition);
                yPosition += lineHeight;
            });

            const where = {
                IdEncuesta: data.IdEncuesta,
                IdUserResponse: user,
                IdQuestion: data.IdQuestion
            };

            await service_response.unique({ params: where });

            const linesRespuesta = pdf.splitTextToSize(bd_service_response.value[0]?.TextoRespuesta, pageWidth);
            pdf.setTextColor(0, 0, 0); // Color negro para las respuestas

            for (const line of linesRespuesta) {
                if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }
                pdf.text(line, margin, yPosition);
                yPosition += lineHeight;
            }
        }
    }

    pdf.save("encuestasQuestions.pdf");
}

