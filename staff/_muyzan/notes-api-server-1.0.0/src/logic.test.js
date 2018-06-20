const expect = require("expect");
const logic = require("./logic");

describe("notes (logic)", () => {
  beforeEach(() => (logic._notes.length = 0));

  it("should add note", () => {

    logic.addNote("my note");

    expect(logic._notes.length).toBe(1);

    const [note] = logic._notes;

    expect(note.text).toBe("my note");
    expect(note.id).toBeDefined();
    
  });

  it("should list notes", () => {
    logic.addNote("my note");
    logic.addNote("my note2");
    logic.listNotes();

    expect(logic._notes.length).toBe(2);

    const [note, note2] = logic._notes;

    expect(note.text).toBe("my note");
    expect(note2.text).toBe("my note2");
    expect(note.id).toBeDefined();
    expect(note2.id).toBeDefined();
  });

  it("should remove a note", () => {
    logic.addNote("my note");

    const [note] = logic._notes;

    logic.listNotes();

    expect(logic._notes.length).toBe(1);

    logic.removeNote(note.id);

    expect(logic._notes.length).toBe(0);
  });

  it("logic.addNote() should launch an error", () => {
    expect(() => {
      logic.addNote().to.thowError("invalid input");
    });
  });

  describe('search notes', () => {
    it('should return results on matching text', () => {
        expect(logic._notes.length).toBe(0)

        const id1 = logic.addNote('my note 1')
        const id2 = logic.addNote('my note 11')
        const id3 = logic.addNote('my note 111')

        const res = logic.findNotes('11')

        expect(res).toBeDefined()
        expect(res.length).toBe(2)

        const [note1, note2] = res
        
        expect(note1).toBeDefined()
        expect(note1.id).toBe(id2)
        expect(note1.text).toBe('my note 11')

        expect(note2).toBeDefined()
        expect(note2.id).toBe(id3)
        expect(note2.text).toBe('my note 111')
    })
})


});
