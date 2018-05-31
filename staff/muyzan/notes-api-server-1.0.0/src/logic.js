
class Note {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

const logic = {
  _notes: [],

  addNote(text) {

    if(typeof text !== 'string') throw Error('invalid input')

    const note = new Note(text);

    this._notes.push(note);

    return note.id
  },

  listNotes() {
    return this._notes
  },

  removeNote(id) {

    //if(typeof id !== 'number') throw Error('the id should be a number')

    for (var i = 0; i < this._notes.length; i++)
      if (this._notes[i].id === id) {
        this._notes.splice(i, 1);
        break;
      }
  },

  findNotes(text){
    return this._notes.filter(note => note.text.includes(text))
  }
}

module.exports = logic;
