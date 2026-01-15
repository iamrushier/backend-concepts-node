// src/routes/file.routes.ts
import { Router, type Request, type Response } from "express";
import { upload } from "../middleware/multer.js";
import { minioClient, BUCKET_NAME } from "../minio.js";
import crypto from "crypto";
import sharp from "sharp"; // For security hardening

const router = Router();

router.post(
    "/upload", // Route

    upload.single("file"), // Multer middleware

    async (req: Request, res: Response) => { // Controller
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }

        // 🔒 HARD VALIDATION
        try {
            await sharp(req.file.buffer).metadata();
        } catch {
            return res.status(400).json({ error: "Invalid image file" });
        }

        const ext = req.file.mimetype.split("/")[1];
        const objectName = `images/${crypto.randomUUID()}.${ext}`;

        await minioClient.putObject(
            BUCKET_NAME,
            objectName,
            req.file.buffer,
            req.file.size,
            {
                "Content-Type": req.file.mimetype,
                "Cache-Control": "public, max-age=31536000",
            }
        )
        res.json({
            message: "Upload successful",
            objectName,
        });
    }
)

router.get(
    "/images/:objectName",

    async (req: Request, res: Response) => {
        const { objectName } = req.params;
        if (!objectName || typeof objectName !== "string") {
            return res.status(400).json({ message: "Invalid objectName" })
        }
        const stat = await minioClient.statObject(
            BUCKET_NAME,
            objectName
        );

        res.setHeader("Content-Type", stat.metaData["content-type"]);
        res.setHeader("Cache-Control", "public, max-age=31536000");

        const stream = await minioClient.getObject(
            BUCKET_NAME,
            objectName
        );

        stream.pipe(res);
    }
)


export default router;