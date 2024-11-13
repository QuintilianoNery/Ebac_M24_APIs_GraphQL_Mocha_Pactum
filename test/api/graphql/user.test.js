const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl("http://lojaebac.ebaconline.art.br/graphql");
let token;

beforeEach(async () => {
    token = await spec()
        .post('/')
        .withGraphQLQuery(`
        mutation AuthUser($email: String, $password: String){
        authUser(email: $email, password: $password) {
            success
            token
        }
        }
`)
        .withGraphQLVariables({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJson('data.authUser.success', true
        )
        .returns('data.authUser.token')
})

it('Lista de usuários', async () => {
    await spec()
        .post('/')
        .withHeaders('Authorization', `Bearer ${token}`)
        .withGraphQLQuery(`
            query {
            Users {
                email
                id
                profile{
                firstName
                }
            }
            }

    `)
        .expectStatus(200)
        .expectJsonMatch({
            data: {
                Users: eachLike({
                    id: like('6717128dba6d5c2a89c2c4b9'),
                    email: like('jana36@gmail.com'),
                    profile: {
                        firstName: like('Jana')
                    }
                })
            }
        })

});




