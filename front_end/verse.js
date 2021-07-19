class Verse {
  constructor(book, chapter, start, end, text) {
    this.book = book;
    this.chapter = chapter;
    this.start = start;
    this.end = end;
    this.text = text;
  }

  getref() {
    let ref = '';
    ref = `${this.book} ${this.chapter}:${this.start}`;
    ref += this.start == this.end ? '' : `-${this.end}`; // if they are equal dont include the dash
    return ref;
  }
}
export default Verse;
