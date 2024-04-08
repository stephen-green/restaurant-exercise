import { TextFileReader } from './TextFileReader.js'

export class CSVFileReader {
  constructor({separator = ',', trimWhitespace = true, enableHeader = false} = {}) {
    this.separator = separator;
    this.trimWhitespace = trimWhitespace;
    this.enableHeader = enableHeader;
  }
  
  async readAll(file) {
    let header = null;
    let rows = [];
    
    let lines = await new TextFileReader().readLines(file, {skipEmpty: true});
    if (lines.length) {
      if (this.enableHeader) {
        // Skip first line, assumed to be header.
        header = this.#splitCSV(lines[0]);
        rows = lines.slice(1).map(line => this.#splitCSV(line));
      } else {
        rows = lines.map(line => this.#splitCSV(line));
      }
    }
    
    return {
      header: header,
      rows: rows
    }
  }
  
  #splitCSV(text) {
    let fields = text.split(this.separator);
    if (this.trimWhitespace) {
      fields = fields.map(text => text.trim());
    }
    
    return fields;
  }
}
