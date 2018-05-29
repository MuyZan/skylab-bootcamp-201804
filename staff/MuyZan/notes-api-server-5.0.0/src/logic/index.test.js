"use strict";

const mongoose = require("mongoose");
const expect = require("expect");
const logic = require(".");
const { User, Note } = require("../models");
const _ = require('lodash')

describe("logic (notes)", () => {
  before(() => mongoose.connect("mongodb://localhost/skylab-bootcamp-201804-test"));

  beforeEach(() => Promise.all([User.remove() /*, Note.deleteMany()*/]));

  describe("register user", () => {

    it("should succeed on correct data", () => logic.registerUser("John", "Doe", "jd@mail.com", "123")
      .then(res => expect(res).toBeTruthy()));

    it("should throw error on no name", () => logic.registerUser()
      .catch(({ message }) => expect(message).toBe("name is not a string")));

    it("should throw error on empty name", () => logic.registerUser("")
      .catch(({ message }) => expect(message).toBe("name is empty or blank")));

    it("should throw error on blank name", () => logic.registerUser("      ")
      .catch(({ message }) => expect(message).toBe("name is empty or blank")));

    it("should throw error on no surname", () => logic.registerUser("John")
      .catch(({ message }) => expect(message).toBe("surname is not a string")));

    it("should throw error on empty surname", () => logic.registerUser("john", "")
      .catch(({ message }) => expect(message).toBe("surname is empty or blank")));

    it("should throw error on blank surname", () => logic.registerUser("John", "      ")
      .catch(({ message }) => expect(message).toBe("surname is empty or blank")));

    it("should throw error on no email", () => logic.registerUser("John", "Doe")
      .catch(({ message }) => expect(message).toBe("email is not a string")));

    it("should throw error on empty email", () => logic.registerUser("john", "Doe", "")
      .catch(({ message }) => expect(message).toBe("email is empty or blank")));

    it("should throw error on blank email", () => logic.registerUser("John", "Doe", "      ")
      .catch(({ message }) => expect(message).toBe("email is empty or blank")));

    it("should throw error on no password", () => logic.registerUser("John", "Doe", "jd@mail.com")
      .catch(({ message }) => expect(message).toBe("password is not a string")));

    it("should throw error on empty password", () => logic.registerUser("john", "Doe", "jd@mail.com", "")
      .catch(({ message }) => expect(message).toBe("password is empty or blank")));

    it("should throw error on blank password", () => logic.registerUser("John", "Doe", "jd@mail.com", "      ")
      .catch(({ message }) => expect(message).toBe("password is empty or blank")));
  });

  describe("authenticate user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(() => logic.authenticateUser("jd@mail.com", "123"))
      .then(id => expect(id).toBeDefined())
    );

    it("should throw error on no email", () => logic.authenticateUser()
      .catch(({ message }) => expect(message).toBe("email is not a string")));

    it("should throw error on empty email", () => logic.authenticateUser("", "123")
      .catch(({ message }) => expect(message).toBe("email is empty or blank")));

    it("should throw error on blank email", () => logic.authenticateUser("      ", "123")
      .catch(({ message }) => expect(message).toBe("email is empty or blank")));

    it("should throw error on no password", () => logic.authenticateUser("jd@mail.com")
      .catch(({ message }) => expect(message).toBe("password is not a string")));

    it("should throw error on empty password", () => logic.authenticateUser("jd@mail.com", "")
      .catch(({ message }) => expect(message).toBe("password is empty or blank")));

    it("should throw error on blank password", () => logic.authenticateUser("jd@mail.com", "      ")
      .catch(({ message }) => expect(message).toBe("password is empty or blank")));

    it("should throw error on credentials", () => logic.authenticateUser("xx@mail.com", "890")
      .catch(({ message }) => expect(message).toBe("wrong credentials")));
  });

  describe("retrieve user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(({ id }) => { return logic.retrieveUser(id) })
      .then(user => {
        expect(user).toBeDefined();

        const { id, name, surname, email, _id, password, notes } = user;

        expect(id).toBeDefined();
        expect(name).toBe("John");
        expect(surname).toBe("Doe");
        expect(email).toBe("jd@mail.com");

        expect(_id).toBeUndefined();
        expect(password).toBeUndefined();
        expect(notes).toBeUndefined();
      }));

    it("should throw error on no id", () => logic.retrieveUser()
      .catch(({ message }) => expect(message).toBe("id is not a string")));

    it("should throw error on invalid id type", () => logic.retrieveUser(true)
      .catch(({ message }) => expect(message).toBe("id is not a string")));

    it("should throw error on empty or blank id", () => logic.retrieveUser("")
      .catch(({ message }) => expect(message).toBe("id is empty or blank")));

    it("should throw error on empty or blank id", () => logic.retrieveUser("     ")
      .catch(({ message }) => expect(message).toBe("id is empty or blank")));

    it("should throw error on no user found", () => logic.retrieveUser("123456781234567812345678")
      .catch(({ message }) => expect(message).toBe(`no user found with id 123456781234567812345678`)));
  });

  describe("update user", () => {
    it("should succeed on correct data", () => User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
      .then(({ id }) => {
        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", "jw@mail.com", "456")
          .then(res => {
            expect(res).toBeTruthy();

            return User.findById(id);
          })
          .then(user => {
            expect(user).toBeDefined();

            const { name, surname, email, password } = user;

            expect(user.id).toBe(id);
            expect(name).toBe("Jack");
            expect(surname).toBe("Wayne");
            expect(email).toBe("jw@mail.com");
            expect(password).toBe("456");
          });
      })
    )
    //TODO error cases
  });

  describe("unregister user", () => {
    it("should succeed on correct data", () =>
      User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => {
          return logic.unregisterUser(id, "jd@mail.com", "123")
            .then(res => {
              expect(res).toBeTruthy();
              return User.findById(id);
            })
            .then(user => {
              expect(user).toBeNull();
            });
        }));

        it("should throw error on wrong credentials", () => logic.unregisterUser("123456781234567812345678", "xx@gmail.com", "234")
        .catch(({ message }) => expect(message).toBe(`wrong credentials`)));

  

  });

  describe("add note", () => {
    it("should succeed on correct data", () =>
      User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => {
          return logic.addNote(id, "my note")
            .then(noteId => {
              expect(typeof noteId).toBe("string");
              expect(noteId).toBeDefined();

              return User.findById(id)
                .then(user => {
                  expect(user).toBeDefined();
                  expect(user.notes).toBeDefined();
                  expect(user.notes.length).toBe(1);

                  const [{ id, text }] = user.notes;
                  expect(id).toBe(noteId);
                  expect(text).toBe("my note");
                })
            });
        }));

    it("should throw error on wrong user id", () => {
      const userId = "123456781234567812345678";

      return logic.addNote(userId, "my note")
        .catch(({ message }) => expect(message).toBe(`no user found with id ${userId}`));
    })

    it('shold fail on no user id', ()=> {
      return logic.addNote()
        .catch(({message}) => expect(message).toBe('userId is not a string'))
    })

    it('shold fail on no user id', ()=> {
      return logic.addNote('')
        .catch(({message}) => expect(message).toBe('userId is empty or blank'))
    })

    it('should fail on blank user id', ()=>{
      return logic.addNote('    ')
        .catch(({message})=> expect(message).toBe('userId is empty or blank'))

    })

    it('should fail on no text', ()=>{
      const userId = "123456781234567812345678";

      return logic.addNote(userId)
        .catch(({message}) => expect(message).toBe('text is not a string'))
    })

    it('should fail on empty text', ()=>{
      const userId = "123456781234567812345678";

      return logic.addNote(userId, '')
        .catch(({message}) => expect(message).toBe('text is empty or blank'))
    })

    it('should fail on blank text', ()=>{
      const userId = "123456781234567812345678";

      return logic.addNote(userId, '    ')
        .catch(({message}) => expect(message).toBe('text is empty or blank'))
    })


 

  });

  describe("retrieve note", () => {
    it("should succed on correct data", () => {
      return User.create({ name: "John", surname: "Doe", email: "jd@mail.com", password: "123" })
        .then(({ id }) => User.findByIdAndUpdate(id, { $push: { notes: { text: "ding patatas" } } }, { new: true }))
        .then(user => logic.retrieveNote(user.id, user.notes[0].id))
        .then((notes) => {
          expect(notes[0].text).toBe("ding patatas")
        })
    });

    
  });

  after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)));

});
