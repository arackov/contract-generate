import { readFileSync } from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { clientName } = req.body;

        const templatePath = path.join(process.cwd(), 'template.docx');
        const templateFile = readFileSync(templatePath);

        const zip = new PizZip(templateFile);
        const doc = new Docxtemplater(zip);
        doc.setData({ clientName });

        try {
            doc.render();
        } catch (error) {
            return res.status(500).send('Ошибка рендеринга документа.');
        }

        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=Договор.docx');
        res.send(buffer);
    } else {
        res.status(405).send('Метод не поддерживается.');
    }
}