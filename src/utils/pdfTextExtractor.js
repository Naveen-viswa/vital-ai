// src/utils/pdfTextExtractor.js
import { getDocument } from 'pdfjs-dist/build/pdf.mjs'
import 'pdfjs-dist/build/pdf.worker.mjs'

export async function extractTextFromPdfjs(pdfFile) {
  const fileReader = new FileReader()
  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result)

        const pdf = await getDocument({
          data: typedArray,
          useSystemFonts: true,
          cMapUrl: 'pdfjs-dist/cmaps/',
          cMapPacked: true,
        }).promise

        const pageTextPromises = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          const text = textContent.items
            .map((item) => item.str)
            .join(' ')
          pageTextPromises.push(text)
        }

        const allText = (await Promise.all(pageTextPromises))
          .join('\n')
          .replace(/\s+/g, ' ')
          .trim()

        resolve(allText)
      } catch (error) {
        reject(error)
      }
    }
    fileReader.onerror = () => reject(new Error('Failed to read PDF'))
    fileReader.readAsArrayBuffer(pdfFile)
  })
}
