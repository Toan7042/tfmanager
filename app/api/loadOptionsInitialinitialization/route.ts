import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const basePath = path.join(process.cwd(), "app/data/optionapiinitialinitialization");

    // LOAD .TXT, MỖI DÒNG LÀ 1 PHẦN TỬ
    const countryData = fs.readFileSync(path.join(basePath, "file_option_country.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    const nameGenData = fs.readFileSync(path.join(basePath, "file_option_namegen.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    const phoneGenData = fs.readFileSync(path.join(basePath, "file_option_phonegen.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    const mailGenData = fs.readFileSync(path.join(basePath, "file_option_mailgen.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    const languageData = fs.readFileSync(path.join(basePath, "file_option_language.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    const userAgentData = fs.readFileSync(path.join(basePath, "file_option_useragent.txt"), "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
    // LOAD JSON
    const phoneModels = ["RAND-ITEM", ...JSON.parse(fs.readFileSync(path.join(basePath, "jsonPhoneInfo_data.json"), "utf-8")).devices.map((device: { MODEL: string }) => device.MODEL)];
    const carrierData = ["AS-COUNTRY", ...JSON.parse(fs.readFileSync(path.join(basePath, "jsonCarrier_data.json"), "utf-8")).map((device: { ISO: string }) => device.ISO)];    

    return NextResponse.json({
      staperchangetypePHONEINFO: phoneModels,
      staperchangeUSERAGENT: userAgentData,
      staperchangetypeNAME: nameGenData,
      staperchangeCOUNTRY: countryData,
      staperchangeCarrier: carrierData,
      staperchangePHONENUMBER: phoneGenData,
      staperchangeEMAIL: mailGenData,
      staperchangeLANGUAGE: languageData
    }, { status: 200 });

  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
