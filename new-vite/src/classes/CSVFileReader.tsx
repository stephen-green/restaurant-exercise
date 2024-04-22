import { TextFileReader } from './TextFileReader.tsx'

export class CSVFileReader {
  #separator: string;
  #trimWhitespace: boolean;
  #enableHeader: boolean;
  
  constructor({separator = ',', trimWhitespace = true, enableHeader = false} = {}) {
    this.#separator = separator;
    this.#trimWhitespace = trimWhitespace;
    this.#enableHeader = enableHeader;
  }
  
  /*
   * Reads all rows of CSV data, splitting off the header row if applicable.
   */
  async readAll(file: File): Promise<{header: string | null, rows: string[]}> {
    let header = null;
    let rows = [];
    
    let lines = await new TextFileReader().readLines(file, {skipEmpty: true});
    if (lines.length) {
      if (this.#enableHeader) {
        // First line assumed to be header
        header = this.#splitCSV(lines[0]);
        rows = lines.slice(1).map(line => this.#splitCSV(line));
      } else {
        // No header
        rows = lines.map(line => this.#splitCSV(line));
      }
    }
    
    return {
      header: header,
      rows: rows
    }
  }
  
  /*
   * Splits a line of CSV content on the separator.
   */
  #splitCSV(text: string): string[] {
    let fields = text.split(this.#separator);
    if (this.#trimWhitespace) {
      fields = fields.map(text => text.trim());
    }
    
    return fields;
  }
}
