﻿import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../server'
//import model from '../data/authHTTP'

const should = chai.should()
chai.use(chaiHttp)

describe( 'Проверка модуля:', () => {
    //beforeEach( function ( done ) {
    //    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    //    setTimeout( function () {
    //        console.log( 'test stop beforeEach' )
    //        done()
    //    },2000 )
    //})

    it( 'post', ( done ) => {
        chai.request( server ).post( '/api/auth' ).send( {
            email: '1@mail.ru', password: '111111'
        } ).end(( err, res ) => {
            if ( err ) return
            console.log( 'res.body =', res.body )
            res.should.have.status( 200 )
            res.body.should.be.a( 'object' )
            res.body.should.have.property( 'Errors' )
            res.body.should.have.property( 'reputation' ).equal( '0' )
            res.body.should.have.property( 'userID' )
            res.body.should.have.property( 'userName' ).equal( 'Непонятный' )
            res.body.userName.should.be.a( 'string' )
            res.body.reputation.should.be.a( 'string' )
            res.body.userID.should.be.a( 'number' )
            done()
        } )
    } )
} );

it('Неверная почта!', (done) => {
    chai.request(server).post('/api/auth').send({ email: 'bookqwe.qwe', password: '111111' }).end((err, res) => {
        expect(err.status).toBe(403)
        expect(res.body).toEqual({ emailError: 'Неверный формат почты!' })
        done()
    })
})

it('Неверная почта и пароль', (done) => {
    chai.request(server).post('/api/auth').send({ email: 'bookqwe.qwe', password: 'qwe' }).end((err, res) => {
        expect(err.status).toBe(403)
        expect(res.body).toEqual({ emailError: 'Неверный формат почты!', passwordLength: 'Длина пароля должна быть не менее 6 символов!' })
        done()
    })
})

it('Неверный пароль', (done) => {
    chai.request(server).post('/api/auth').send({ email: '1@mail.ru', password: 'qwe' }).end((err, res) => {
        expect(err.status).toBe(403)
        expect(res.body).toEqual({ passwordLength: 'Длина пароля должна быть не менее 6 символов!' })
        done()
    })
})