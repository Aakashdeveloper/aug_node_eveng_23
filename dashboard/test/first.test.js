let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Api',() => {
    it('Should return 200 for health',(done) => {
        chai.request('http://127.0.0.1:7710')
        .get('/health')
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.equal('Health Ok');
            done();
        })
        .catch((err) => {
            throw errl
        })
    })
})
