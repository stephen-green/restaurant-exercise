export class TextFileReader {
  async readLines(file, {skipEmpty = false} = {}) {
    let lines = this.#splitLines(await this.readAll(file));
    return skipEmpty ? lines.filter(text => text) : lines;
  }
  
  async readAll(file) {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener('load', e => resolve(reader.result));
      reader.readAsText(file);
    });
  }
  
  #splitLines(text) {
    return text.split(/\r\n|\n|\r/g);
  }
}
