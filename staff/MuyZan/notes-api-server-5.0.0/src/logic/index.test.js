"use strict";

require('dotenv').config()

const mongoose = require("mongoose");
const { expect } = require('chai')

const logic = require(".");
const { User, Note } = require("../models");
const _ = require('lodash')

const { env: { DB_URL } } = process

describe("logic (notes)", () => {

  const userData = { name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' }
  const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', password: '456' }
  const dummyId = "123456781234567812345678";
  const dummyNoteId = '123456781234567812345678'
  const noteText = "hello"
  const indexes = []



  before(() => mongoose.connect(DB_URL));

  beforeEach(() => Promise.all([User.remove() /*, Note.deleteMany()*/]));

  describe("register user", () => {

    it("should succeed on correct data", () => logic.registerUser("John", "Doe", "jd@mail.com", "123")
      .then(res => expect(res).to.be.true)
    )

    it('shold fail on already registered user', () => {
      User.create(userData)
        .then(() => {
          const { name, surname, email, password } = userData

          return logic.registerUser(name, surname, email, password)
        })
        .catch(({ message }) => {
          expect(message).to.equal(`user with email ${userData.email} already exists `)
        })
    })

    it("should throw error on no name", () => logic.registerUser()
      .catch(({ message }) => expect(message).to.equal("name is not a string")));

    it("should throw error on empty name", () => logic.registerUser("")
      .catch(({ message }) => expect(message).to.equal("name is empty or blank")));

    it("should throw error on blank name", () => logic.registerUser("      ")
      .catch(({ message }) => expect(message).to.equal("name is empty or blank")));

    it("should throw error on no surname", () => logic.registerUser("John")
      .catch(({ message }) => expect(message).to.equal("surname is not a string")));

    it("should throw error on empty surname", () => logic.registerUser("john", "")
      .catch(({ message }) => expect(message).to.equal("surname is empty or blank")));

    it("should throw error on blank surname", () => logic.registerUser("John", "      ")
      .catch(({ message }) => expect(message).to.equal("surname is empty or blank")));

    it("should throw error on no email", () => logic.registerUser("John", "Doe")
      .catch(({ message }) => expect(message).to.equal("email is not a string")));

    it("should throw error on empty email", () => logic.registerUser("john", "Doe", "")
      .catch(({ message }) => expect(message).to.equal("email is empty or blank")));

    it("should throw error on blank email", () => logic.registerUser("John", "Doe", "      ")
      .catch(({ message }) => expect(message).to.equal("email is empty or blank")));

    it("should throw error on no password", () => logic.registerUser("John", "Doe", "jd@mail.com")
      .catch(({ message }) => expect(message).to.equal("password is not a string")));

    it("should throw error on empty password", () => logic.registerUser("john", "Doe", "jd@mail.com", "")
      .catch(({ message }) => expect(message).to.equal("password is empty or blank")));

    it("should throw error on blank password", () => logic.registerUser("John", "Doe", "jd@mail.com", "      ")
      .catch(({ message }) => expect(message).to.equal("password is empty or blank")));
  });

  describe("authenticate user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(() => logic.authenticateUser("jd@mail.com", "123"))
      .then(id => expect(id).to.exist)
    );

    it("should throw error on no email", () => logic.authenticateUser()
      .catch(({ message }) => expect(message).to.equal("email is not a string")));

    it("should throw error on empty email", () => logic.authenticateUser("", "123")
      .catch(({ message }) => expect(message).to.equal("email is empty or blank")));

    it("should throw error on blank email", () => logic.authenticateUser("      ", "123")
      .catch(({ message }) => expect(message).to.equal("email is empty or blank")));

    it("should throw error on no password", () => logic.authenticateUser("jd@mail.com")
      .catch(({ message }) => expect(message).to.equal("password is not a string")));

    it("should throw error on empty password", () => logic.authenticateUser("jd@mail.com", "")
      .catch(({ message }) => expect(message).to.equal("password is empty or blank")));

    it("should throw error on blank password", () => logic.authenticateUser("jd@mail.com", "      ")
      .catch(({ message }) => expect(message).to.equal("password is empty or blank")));

    it("should throw error on credentials", () => logic.authenticateUser("xx@mail.com", "890")
      .catch(({ message }) => expect(message).to.equal("wrong credentials")));
  });

  describe("retrieve user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(({ id }) => {
        return logic.retrieveUser(id)
      })
      .then(user => {

        expect(user).to.exist;

        const { name, surname, email, _id, password, notes } = user;

        expect(name).to.equal("John");
        expect(surname).to.equal("Doe");
        expect(email).to.equal("jd@mail.com");

        expect(_id).to.be.undefined

        expect(password).to.be.undefined

        expect(notes).to.be.undefined

      }));

    it("should throw error on no id", () => logic.retrieveUser()
      .catch(({ message }) => expect(message).to.equal("id is not a string")));

    it("should throw error on invalid id type", () => logic.retrieveUser(true)
      .catch(({ message }) => expect(message).to.equal("id is not a string")));

    it("should throw error on empty or blank id", () => logic.retrieveUser("")
      .catch(({ message }) => expect(message).to.equal("id is empty or blank")));

    it("should throw error on empty or blank id", () => logic.retrieveUser("     ")
      .catch(({ message }) => expect(message).to.equal("id is empty or blank")));

    it("should throw error on no user found", () => logic.retrieveUser("123456781234567812345678")
      .catch(({ message }) => expect(message).to.equal(`no user found with id 123456781234567812345678`)));
  });

  describe("update user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(({ id }) => {
        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", "jw@mail.com", "456")
          .then(res => {
            expect(res).to.be.true;

            return User.findById(id);
          })
          .then(user => {
            expect(user).to.exist

            const { name, surname, email, password } = user;

            expect(user.id).to.equal(id);
            expect(name).to.equal("Jack");
            expect(surname).to.equal("Wayne");
            expect(email).to.equal("jw@mail.com");
            expect(password).to.equal("456");
          });
      })
    )

    it("should fail on changing email to an already existing user\'s email", () =>

      Promise.all([
        User.create(userData),
        User.create(otherUserData)
      ])
        .then(([{ id: id1 }, { id: id2 }]) => {
          const { name, surname, email, password } = userData

          return logic.updateUser(id1, name, surname, email, password, otherUserData.email)
        })
        .catch(({ message }) => expect(message).to.equal(`user with email ${otherUserData.email} already exists`))
    )

    it('should fail on no user id', () =>
      logic.updateUser()
        .catch(({ message }) => expect(message).to.equal(`user id is not a string`))
    )

    it('should fail on empty user id', () =>
      logic.updateUser('')
        .catch(({ message }) => expect(message).to.equal('user id is empty or blank')
        )
    )

    it('should fail on blank user id', () => {
      logic.updateUser('    ')
        .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
    })

    it('should fail on no user surname', () =>
      logic.updateUser(dummyId, userData.name)
        .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
    )

    it('should fail on empty user surname', () =>
      logic.updateUser(dummyId, userData.name, '')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on blank user surname', () =>
      logic.updateUser(dummyId, userData.name, '     ')
        .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
    )

    it('should fail on no user email', () =>
      logic.updateUser(dummyId, userData.name, userData.surname)
        .catch(({ message }) => expect(message).to.equal('user email is not a string'))
    )

    it('should fail on empty user email', () =>
      logic.updateUser(dummyId, userData.name, userData.surname, '')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on blank user email', () =>
      logic.updateUser(dummyId, userData.name, userData.surname, '     ')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on no user password', () =>
      logic.updateUser(dummyId, userData.name, userData.surname, userData.email)
        .catch(({ message }) => expect(message).to.equal('user password is not a string'))
    )

    it('should fail on empty user password', () =>
      logic.updateUser(dummyId, userData.name, userData.surname, userData.email, '')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on blank user password', () =>
      logic.updateUser(dummyId, userData.name, userData.surname, userData.email, '     ')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )



  });

  describe("unregister user", () => {
    it("should succeed on correct data", () =>
      User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => {
          return logic.unregisterUser(id, "jd@mail.com", "123")
            .then(res => {
              expect(res).to.be.true;
              return User.findById(id);
            })
            .then(user => {
              expect(user).to.be.null
            });
        }));

    it("should throw error on wrong credentials", () => logic.unregisterUser("123456781234567812345678", "xx@gmail.com", "234")
      .catch(({ message }) => expect(message).to.equal(`wrong credentials`)));

    it('should fail on no user id', () =>
      logic.unregisterUser()
        .catch(({ message }) => expect(message).to.equal('user id is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.unregisterUser('')
        .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.unregisterUser('     ')
        .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
    )

    it('should fail on no user email', () =>
      logic.unregisterUser(dummyId)
        .catch(({ message }) => expect(message).to.equal('user email is not a string'))
    )

    it('should fail on empty user email', () =>
      logic.unregisterUser(dummyId, '')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on blank user email', () =>
      logic.unregisterUser(dummyId, '     ')
        .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
    )

    it('should fail on no user password', () =>
      logic.unregisterUser(dummyId, userData.email)
        .catch(({ message }) => expect(message).to.equal('user password is not a string'))
    )

    it('should fail on empty user password', () =>
      logic.unregisterUser(dummyId, userData.email, '')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )

    it('should fail on blank user password', () =>
      logic.unregisterUser(dummyId, userData.email, '     ')
        .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
    )


  });

  describe("add note", () => {
    it("should succeed on correct data", () =>
      User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => {
          return logic.addNote(id, "my note")
            .then(noteId => {
              expect(typeof noteId).to.equal("string");
              expect(noteId).to.exist;

              return User.findById(id)
                .then(user => {
                  expect(user).to.exist;
                  expect(user.notes).to.exist;
                  expect(user.notes.length).to.equal(1);

                  const [{ id, text }] = user.notes;
                  expect(id).to.equal(noteId);
                  expect(text).to.equal("my note");
                })
            });
        }));

    it("should throw error on wrong user id", () => {
      const userId = "123456781234567812345678";

      return logic.addNote(userId, "my note")
        .catch(({ message }) => expect(message).to.equal(`no user found with id ${userId}`));
    })

    it('shold fail on no user id', () => {
      return logic.addNote()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    })

    it('shold fail on no user id', () => {
      return logic.addNote('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    })

    it('should fail on blank user id', () => {
      return logic.addNote('    ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))

    })

    it('should fail on no text', () => {
      const userId = "123456781234567812345678";

      return logic.addNote(userId)
        .catch(({ message }) => expect(message).to.equal('text is not a string'))
    })

    it('should fail on empty text', () => {
      const userId = "123456781234567812345678";

      return logic.addNote(userId, '')
        .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
    })

    it('should fail on blank text', () => {
      const userId = "123456781234567812345678";

      return logic.addNote(userId, '    ')
        .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
    })




  });

  describe("retrieve note", () => {
    it("should succed on correct data", () => {
      return User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => User.findByIdAndUpdate(id, { $push: { notes: { text: "ding patatas" } } }, { new: true }))
        .then(user => logic.retrieveNote(user.id, user.notes[0].id))
        .then((note) => {
          expect(note.text).to.equal("ding patatas")
        })
    });

    it('should fail on non user id', () =>
      logic.retrieveNote()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.retrieveNote('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.retrieveNote('      ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on wrong user id', () => {
      const user = new User(userData)
      const note = new Note({ text: "hello" })

      user.notes.push(note)

      return user.save()
        .then(({ notes: [{ id: noteId }] }) => {
          return logic.retrieveNote(dummyId, noteId)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyId}`))
        })
    })

    it('should fail on no note id', () =>
      logic.retrieveNote(dummyId)
        .catch(({ message }) => expect(message).to.equal('id is not a string'))
    )

    it('should fail on empty note id', () =>
      logic.retrieveNote(dummyId, '')
        .catch(({ message }) => expect(message).to.equal('id is empty or blank'))
    )

    it('should fail on blank note id', () =>
      logic.retrieveNote(dummyId, '       ')
        .catch(({ message }) => expect(message).to.equal('id is empty or blank'))
    )

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: "Hello" })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.retrieveNote(userId, dummyNoteId)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })


  });




  describe('list notes', () => {
    it('should succeed on correct data', () => {
      const user = new User(userData)

      const notes = indexes.map(index => new Note({ text: `${noteText} ${index}` }))

      user.notes = notes

      return user.save()
        .then(({ id: userId, notes }) => {
          // const validNoteIds = []
          // const validNoteTexts = []

          // notes.forEach(({ id, text }) => {
          //     validNoteIds.push(id)
          //     validNoteTexts.push(text)
          // })
          // or
          const validNoteIds = _.map(notes, 'id')
          const validNoteTexts = _.map(notes, 'text')

          return logic.listNotes(userId)
            .then(notes => {
              expect(notes).to.exist
              expect(notes.length).to.equal(indexes.length)

              notes.forEach(({ id, text, _id }) => {
                // expect(validNoteIds.includes(id)).to.be.true
                // expect(validNoteTexts.includes(text)).to.be.true
                // or
                expect(validNoteIds).to.include(id)
                expect(validNoteTexts).to.include(text)
                expect(_id).not.to.exist
              })
            })
        })
    })

    it('should fail on non user id', () =>
      logic.listNotes()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.listNotes('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.listNotes('      ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )
  })

  describe('update note', () => {
    it('should succeed on correct data', () =>
      User.create(userData)
        .then(({ id: userId }) =>
          User.findByIdAndUpdate(userId, { $push: { notes: { text: noteText } } }, { new: true })
            .then(user => {
              const noteId = user.notes[user.notes.length - 1].id
              console.log('THIS IS THE USER:'+user)
              const newNoteText = `${noteText} 2`
              console.log(userId, noteId, newNoteText)

              return logic.updateNote(userId, noteId, newNoteText)
                .then(res => {
                  expect(res).to.be.true
                  console.log('THIS IS THE RES: ' + res)
                  return User.findById(userId)
                })
                .then(({ notes }) => {
                  const [{ id, text }] = notes
                  console.log("esto es" + id)

                 // expect(id).to.equal(noteId)
                  expect(text).to.equal(newNoteText)
                })
            })
        )
    )

    it('should fail on non user id', () =>
      logic.updateNote()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.updateNote('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.updateNote('      ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on wrong user id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ notes: [{ id: noteId }] }) => {
          return logic.updateNote(dummyId, noteId, `${noteText} 2`)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyId}`))
        })
    })

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.updateNote(userId, dummyNoteId, `${noteText} 2`)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })
  })

  describe('remove note', () => {
    it('should succeed on correct data', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId, notes: [{ id: noteId }] }) => {
          return logic.removeNote(userId, noteId)
            .then(res => {
              expect(res).to.be.true

              return User.findById(userId)
            })
            .then(({ notes }) => {
              expect(notes).to.exist
              expect(notes.length).to.equal(0)
            })
        })
    })

    it('should fail on non user id', () =>
      logic.removeNote()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.removeNote('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.removeNote('      ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on wrong user id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ notes: [{ id: noteId }] }) => {
          return logic.removeNote(dummyId, noteId)
            .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyId}`))
        })
    })

    it('should fail on no note id', () =>
      logic.removeNote(dummyId)
        .catch(({ message }) => expect(message).to.equal('id is not a string'))
    )

    it('should fail on empty note id', () =>
      logic.removeNote(dummyId, '')
        .catch(({ message }) => expect(message).to.equal('id is empty or blank'))
    )

    it('should fail on blank note id', () =>
      logic.removeNote(dummyId, '       ')
        .catch(({ message }) => expect(message).to.equal('id is empty or blank'))
    )

    it('should fail on wrong note id', () => {
      const user = new User(userData)
      const note = new Note({ text: noteText })

      user.notes.push(note)

      return user.save()
        .then(({ id: userId }) => {
          return logic.removeNote(userId, dummyNoteId)
            .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
        })
    })
  })

  describe('find notes', () => {
    it('should succeed on correct data', () => {
      const user = new User(userData)

      user.notes.push(new Note({ text: `${noteText} a` }))
      user.notes.push(new Note({ text: `${noteText} ab` }))
      user.notes.push(new Note({ text: `${noteText} abc` }))
      user.notes.push(new Note({ text: `${noteText} bc` }))
      user.notes.push(new Note({ text: `${noteText} c` }))

      const text = 'ab'

      return user.save()
        .then(({ id: userId, notes }) => {
          const matchingNotes = notes.filter(note => note.text.includes(text))

          const validNoteIds = _.map(matchingNotes, 'id')
          const validNoteTexts = _.map(matchingNotes, 'text')

          return logic.findNotes(userId, text)
            .then(notes => {
              expect(notes).to.exist
              expect(notes.length).to.equal(matchingNotes.length)

              notes.forEach(({ id, text, _id }) => {
                // expect(validNoteIds.includes(id)).to.be.true
                // expect(validNoteTexts.includes(text)).to.be.true
                // or
                expect(validNoteIds).to.include(id)
                expect(validNoteTexts).to.include(text)
                expect(_id).not.to.exist
              })
            })
        })
    })

    it('should fail on non user id', () =>
      logic.findNotes()
        .catch(({ message }) => expect(message).to.equal('userId is not a string'))
    )

    it('should fail on empty user id', () =>
      logic.findNotes('')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on blank user id', () =>
      logic.findNotes('      ')
        .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
    )

    it('should fail on no text', () =>
      logic.findNotes(dummyId)
        .catch(({ message }) => expect(message).to.equal('text is not a string'))
    )

    it('should fail on empty text', () =>
      logic.findNotes(dummyId, '')
        .catch(({ message }) => expect(message).to.equal('text is empty'))
    )
  })





  after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)));

});
