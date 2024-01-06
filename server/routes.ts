import React from "react";
import puppeteer from "puppeteer";
import Codepen from "../app/assets/pdfs/codepen";
import { PrismaClient } from "@prisma/client";
import { renderToStaticMarkup } from "react-dom/server";
import { ElementWithTailwind } from "../app/assets/pdfs/helpers";
import * as express from "express";

const prisma = new PrismaClient();
const router = express.Router();

/** API Routes */
router.get("/users", async (_, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get("/download/:id", async (req, res) => {
    const { id } = req.params;
    const name = req.query.name as string;
    if (!id || !name) {
        res.writeHead(400);
        res.end("missing required path parameter 'id'");
    }

    const pdfBytes = await generatePDF(Codepen(name, Number(id)));

    res.writeHead(200, ["Content-Type", "application/pdf", "Content-Disposition", `attachment; filename=report${id}.pdf`]);

    res.end(pdfBytes);
});

export default router;

async function generatePDF(jsxElement: React.ReactNode) {
    try {
        // Wrap element with Tailwind CDN script tag to allow tailwind styling in statically generated files
        const elementWithTailwind = ElementWithTailwind(jsxElement);

        const html = renderToStaticMarkup(elementWithTailwind);

        // Generate PDF
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({ format: "LETTER" });
        await browser.close();

        return pdf;
    } catch (err) {
        console.error(err);
        return;
    }
}
