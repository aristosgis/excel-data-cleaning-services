import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function processExcelFile(buffer: Buffer, userId: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const sheet = workbook.worksheets[0];

  const idColumnIndex = sheet.getRow(1).values.indexOf("Property_ID");
  if (idColumnIndex === -1) {
    throw new Error("Excel file must contain 'Property_ID' column");
  }

  const seen = new Set();
  let fixedCount = 0;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    let id = row.getCell(idColumnIndex).value;

    if (seen.has(id)) {
      fixedCount++;
      const newId = `NEW_${Date.now()}_${fixedCount}`;
      row.getCell(idColumnIndex).value = newId;
    }
    seen.add(id);
  });

  const output = await workbook.xlsx.writeBuffer();
  return { fileBuffer: output, fixedCount };
}