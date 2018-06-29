"use strict"

const { expect } = require("chai")
const logic = require(".")
const travelApi = require("api")

describe("logic (top10travels-app)", () => {
    const userData = { username: "JohnDoe", password: "123", location: "EUA" }
    const { username, password, location } = userData

    beforeEach(done => {
        const { username, password } = userData

        travelApi.authenticateUser(username, password)
            .then(userId => 
                travelApi.unregisterUser(userId, username, password)
            )
            .then(() => done())
            .catch(() => done())
    })

    describe("register", () => {
        it("should succeed on correct data", () => 
            logic.registerUser(username, password, location)
                .then(res => {
                    expect(res).to.be.true
                    return (logic.login(username, password))
                    .then(res => {
                        expect(res).to.be.true
    
                        expect(logic.userId).not.to.equal("NO-ID")
                    })
                })
        )
    })

    describe("login", () => {
        it("should succeed on correct data", () => 
            logic.registerUser(username, password, location)
                .then((res) => {
                    return logic.login(username, password)})
                .then(res => {
                    expect(res).to.be.true

                    expect(logic.userId).not.to.equal("NO-ID")
                })
        )
    })

    describe("retrieve user", () => {
        it("should succeed on correct data", () => 
            logic.registerUser(username, password, location)
                .then(() => logic.login(username, password))
                .then(() => logic.retrieveUser())
                .then(res => {
                    expect(res).to.exist
                    expect(res.username).to.equal("JohnDoe")
                    expect(res.location).to.equal("EUA")
                    expect(logic.userId).not.to.equal("NO-ID")
                })
        )
    })

    describe("unregister user", () => {
        it("should succeed on correct data", () => 
            logic.registerUser(username, password, location)
                .then(() => logic.login(username, password))
                .then(() => logic.unregister(username, password))
                .then(res => {
                    expect(res).to.be.true
                    expect(logic.userId).to.equal("NO-ID")
                })
        )
    })
})