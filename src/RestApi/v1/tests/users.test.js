const { httpRequest } = require('./__global');

const email = 'jesttest@gmail.com';
const password = 'jestpass';
const fullname = 'Jestname Alacrity';

let token = '';

test('Error on Register User to get jwt token without provide email and password and fullname', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const response = JSON.parse(await httpRequest(options));

    expect(response.status).toEqual('error');
});

test('Error on Register User to get jwt token with specific field only (email, password, fullname)', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    expect(JSON.parse(await httpRequest(options, { email })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options, { password })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options, { fullname })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options, { email, password })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options, { email, fullname })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options, { password, fullname })).status).toEqual('error');
});

test('Register User to get jwt token', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, { email, password, fullname }));

    expect(response.status).toEqual('success');
});

test('Error on Register Existed User', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, { email, password, fullname }));

    expect(response.status).toEqual('error');
});