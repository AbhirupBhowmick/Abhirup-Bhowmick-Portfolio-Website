import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    let targetPath = "";
    
    // Look in standard Next.js path options
    const pathsToTry = [
      path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "resume", "abhirup_bhowmick_cv.pdf"),
      path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "resume", "ABHIRUP_BHOWMICK_CV.pdf"),
      path.join(/*turbopackIgnore: true*/ process.cwd(), "frontend", "public", "resume", "abhirup_bhowmick_cv.pdf"),
      path.join(/*turbopackIgnore: true*/ process.cwd(), "frontend", "public", "resume", "ABHIRUP_BHOWMICK_CV.pdf"),
    ];

    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        targetPath = p;
        break;
      }
    }

    if (!targetPath) {
      throw new Error("Resume asset unavailable.");
    }

    const stats = fs.statSync(targetPath);
    const sizeBytes = stats.size;
    let sizeStr = "";
    if (sizeBytes < 1024) {
      sizeStr = `${sizeBytes} B`;
    } else if (sizeBytes < 1024 * 1024) {
      sizeStr = `${(sizeBytes / 1024).toFixed(1)} KB`;
    } else {
      sizeStr = `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    
    const modifiedDate = new Date(stats.mtime);
    const month = modifiedDate.toLocaleString("en-US", { month: "long" });
    const year = modifiedDate.getFullYear();
    
    // Semantic versioning dynamically generated from modified timestamp
    const monthCode = modifiedDate.getMonth() + 1;
    const dayCode = modifiedDate.getDate();
    const version = `v2.${monthCode}.${dayCode}`;

    return NextResponse.json({
      filename: path.basename(targetPath),
      size: sizeStr,
      modified: `${month} ${year}`,
      version,
      url: `/resume/${path.basename(targetPath)}`
    });
  } catch (error: any) {
    console.error("Resume metadata error:", error);
    return NextResponse.json(
      { error: "Resume asset unavailable.", message: error.message },
      { status: 404 }
    );
  }
}
