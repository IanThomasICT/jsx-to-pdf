import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import puppeteer from "puppeteer";
import { renderToStaticMarkup } from "react-dom/server"
import Codepen from "./src/assets/pdfs/codepen"
import { PrismaClient } from "@prisma/client";
import React from "react";
import { ElementWithTailwind } from "./src/assets/pdfs/helpers"


const prisma = new PrismaClient();
const app = express()

const staticPath = "dist"
app.use(express.static(path.join(process.cwd(), staticPath)));

/** Client Routes */
app.get("/", async (_, res) => {
	res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.use(cors())

/** API Routes */
app.get("/api/download/:id", async (req, res) => {
	const { id } = req.params
	const name = req.query.name as string
	if (!id || !name) {
		res.writeHead(400);
		res.end("missing required path parameter 'id'");
	}

	const pdfBytes = await generatePDF(Codepen(name, Number(id)));

	res.writeHead(200, [
		'Content-Type', 'application/pdf',
		"Content-Disposition", `attachment; filename=report${id}.pdf`
	]);

	res.end(pdfBytes);
})

app.get("/api/users", async (_,res) => {
	const users = await prisma.user.findMany()
	res.json(users)
});

app.listen(3000, () => console.log("🚀 Server ready at: http://localhost:3000"));


export async function generatePDF(jsxElement: React.ReactNode) {
	try {
		// Wrap element with Tailwind CDN script tag to allow tailwind styling in statically generated files
		const elementWithTailwind = ElementWithTailwind(jsxElement)

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


