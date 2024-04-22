export class TextFileReader {
  /*
   * Read all lines from a text file, line by line
   */
  async readLines(file: File, {skipEmpty = false} = {}): Promise<string[]> {
    let lines = this.#splitLines(await this.readAll(file));
    return skipEmpty ? lines.filter(text => text) : lines;
  }
  
  /*
   * Read all text from the file in a single chunk
   */
  async readAll(file: File): Promise<string> {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener('load', e => resolve(reader.result));
      reader.readAsText(file);
    });
  }
  
  #splitLines(text: string): string[] {
    return text.split(/\r\n|\n|\r/g);
  }
}
