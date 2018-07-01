
const request = require('supertest');

const should = require('should');
const app = require('../../');
const models = require('../../models');

describe('GET /users is ', () =>{
    const users = [
        {id: 1, name: 'alice'},
        {id: 2, name: 'bek'},
        {id: 3, name: 'chlis'}
    ];
   before(()=>models.sequelize.sync({force:true}));
   before(()=>{
       return models.User.bulkCreate(users);
   });
    describe('Success ', () =>{
        it('user...', (done) => {
            request(app)
            .get('/users')
            .end((err, res) =>{
                res.body.should.be.instanceOf(Array);
                console.log(res.body);
                done();
            })
        });
        it('2...', (done) => {
            request(app)
            .get('/users?limit=2')
            .end((err, res) =>{
                res.body.should.have.length(2);
                console.log(res.body);
                done();
            })
        });
    });
    
    describe('Error ', () =>{
        it('two...', (done) => {
            request(app)
            .get('/users?limit=two')
            .expect(400)
            .end(done)
        });
    });
    
});



describe('GET /users/ID is ', () =>{
    describe('성공시 ', () =>{
        it('유저 아이디 확인', (done) => {
            request(app)
            .get('/users/1')
            .end((err, res) =>{
                res.body.should.have.property('id', 1);
                console.log(res.body);
                done();
            })
        });
    });

    
    describe('Error ', () =>{
        it('not number 400...', (done) => {
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
        });
        it('not number 404...', (done) => {
            request(app)
            .get('/users/4')
            .expect(404)
            .end(done)
        });
    });
    
    
});

describe('DEL /user/1', () => {
    describe('succes', () => {
        it('204 ', (done)=>{
            request(app)
            .delete('/users/1')
            .expect(204)
            .end(done);
        })
    });
    describe('fail', () => {
        it('400 ', (done)=>{
            request(app)
            .delete('/users/one')
            .expect(400)
            .end(done);
        })
    });
});



describe('POST /user/name', () => {
    const users = [
        {id: 1, name: 'alice'},
        {id: 2, name: 'bek'},
        {id: 3, name: 'chlis'}
    ];
   before(()=>models.sequelize.sync({force:true}));
   before(()=>{
       return models.User.bulkCreate(users);
   });
    describe('succes', () => {
        let name= 'daniel',body;
        before(done =>{
           request(app)
            .post('/users')
            .send({name})
            .expect(201)
            .end((err, res)=>{
                body = res.body;
                done();
            });
        });
        
        it('생성유저반환 ', ()=>{
            body.should.have.property('id');
        });
        
        it('생성유저반환 ', ()=>{
            body.should.have.property('name', name);
        });
    });

    describe('실패시', () =>{
        it('400 return ', (done)=>{
          request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('409 return ', (done)=>{
          request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done);
        });
    })
});



describe.only('PUT /user/name', () => {
    describe('succes', () => {
        
        
        it('변경유저반환 ', (done)=>{
            const name = 'chally';
            request(app)
            .put('/users/3')
            .send({name})
            .end((err, res)=>{
                res.body.should.have.property('name', name)
                done();
            });
        });
        
    });
});

