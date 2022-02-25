import { parse, Parser } from "csv-parse"
import * as fs from "fs"

export default (file: Express.Multer.File): Parser => {
  return fs
    .createReadStream(file.path)
    .pipe(parse({ delimiter: ",", columns: true }))
}
