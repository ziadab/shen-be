import { parse } from "csv-parse"
import * as fs from "fs"
import { csvParser } from "../types"

export default (file: Express.Multer.File): csvParser[] => {
  const students: csvParser[] = []
  fs.createReadStream(file.path)
    .pipe(parse({ delimiter: ",", columns: true }))
    .on("data", (csvRow: csvParser) => {
      students.push(csvRow)
      console.log(csvRow)
    })
    .on("end", () => {
      console.log("end...")
    })

  return students
}
