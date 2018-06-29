"use strict"

require("dotenv").config()

const { mongoose, models: { User, Country, Photo }} = require(".")
const expect = require("expect")

const { env: { DB_URL }} = process

describe("models", () => {
    const userData = { username: "JohnDoe", password: "123", location: "EUA" }
    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all([User.remove(), Country.deleteMany(), Photo.deleteMany()]))

    describe("create different models", () => {

        it("should succeed creating a new user", () => {
            const user = new User(userData)
            
            return user.save()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.username).toBe("JohnDoe")
                    expect(user.password).toBe("123")
                    expect(user.location).toBe("EUA")
                })
        })

        it("should succeed assigning two countries to a user", () => 
            User.create(userData)
                .then((user) => {
                    const japan = new Country({ name : "Japan", userId: user.id,  })
                    const peru = new Country({ name : "Peru", userId: user.id,  })
                    return Promise.all([japan, peru])
                    .then((p) => {
                        p.map((v, i) => user.countries.push({name : v.name, id : v.id}))

                        expect(p[0].id).not.toBe(p[1].id)
                        expect(p[0].userId).toBe(p[1].userId)
                        if (p[0].name === "Japan"){
                            expect(p[1].name).toBe("Peru")
                        } else {
                            expect(p[1].name).toBe("Japan")
                            expect(p[0].name).toBe("Peru")
                        }

                        user.save()
                    }).then(res => {
                        const uc = user.countries
                        expect(uc.length).toBe(2)
                        if (uc[0].name === "Japan"){
                            expect(uc[1].name).toBe("Peru")
                        } else {
                            expect(uc[1].name).toBe("Japan")
                            expect(uc[0].name).toBe("Peru")
                        }
                        expect(uc[0].name).not.toBe(uc[1].name)
                        expect(japan.userId).toBe(peru.userId)
                    })
                })
        )

        it("should succeed adding a photo to a country into a user", () => 
            User.create(userData)
                .then((user) => {   
                    const _url = "http://en.toureast.com/portals/0/img/country/japan/japan_header.jpg" 
                    const photo = new Photo({ url: _url})         
                    const place = Country.create({ name : "Japan", userId: user.id })
                    return Promise.all([photo, place])
                    .then((promises) => {
                        let ph = "", c = ""
                        if(promises[0].url){ ph = promises[0]; c = promises[1]
                        } else { ph = promises[1]; c = promises[0]}
                        c.photos.push(ph)
                        return c.save()
                        .then((cntry) => {
                            user.countries.push({name : cntry.name, id : cntry.id})

                            return user.save()
                        })
                        .then(() => {
                            const uc = user.countries
                            expect(uc.length).toBe(1)
                            return Country.findById({ _id : uc[0].id })  
                        })
                        .then((cp0) => {
                            const uc0 = cp0.photos[0]
                            expect(cp0.photos.length).toBe(1)

                            expect(cp0.userId).toBe(user.id)
                            expect(typeof cp0.id).toBe("string")
                            expect(cp0.name).toBe("Japan")

                            expect(typeof uc0.id).toBe("string")
                            expect(uc0.url).toBe(_url)
                        })
                    })
                })
        )
    })
    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)) )
})