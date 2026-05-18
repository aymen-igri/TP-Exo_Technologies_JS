import { Format } from "../enums/format";
import { Status } from "../enums/status";

export interface IBook {
  id: string,
  title: string,
  author: string,
  price: number,
  pageCountReaded: number,
  pageCount: number,
  format: Format,
  status: Status
  suggestedBy: String,
  finished: boolean
}