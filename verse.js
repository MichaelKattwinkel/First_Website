class Verse {
  constructor(book, chapter, start, end, text) {
    this.book = book;
    this.chapter = chapter;
    this.start = start;
    this.end = end;
    this.text = text;
  }

  getref() {
    let ref = "";
    ref = this.book + " " + this.chapter + ":" + this.start + "-" + this.end;
    return ref;
  }
}
export default Verse;
