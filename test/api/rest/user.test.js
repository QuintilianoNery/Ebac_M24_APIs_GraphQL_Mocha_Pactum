const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br')
let token;

beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
})

it('API- Lista de usuários', async () => {
    await spec()
        .get('/api/getUsers')
        .withHeaders("Authorization", token)
        .expectStatus(200)
        .expectJsonMatch({
            users: eachLike({
                "_id": like('6717128dba6d5c2a89c2c4b9'),
                email: like('jana36@gmail.com'),
                profile: {
                    firstName: like('Jana')
                }
            })

        })

});




