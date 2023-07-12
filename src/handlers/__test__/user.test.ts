import * as user from '../user'

describe("user handler", ()=>{
    it("It should create a new user", async()=>{
        const req = {body: "Testbody", password: "test"}
        const res = {json({token}){
            expect(token).toBeTruthy()
        }}

        await user.createNewUser(req, res, () => {})
    })
})