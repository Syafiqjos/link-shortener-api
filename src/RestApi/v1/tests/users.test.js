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

test('Error on Login User to get jwt token without provide email and password and fullname', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options));

    expect(response.status).toEqual('error');
}); 

test('Error on Login User to get jwt token with specific field only (email, password)', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    expect(JSON.parse(await httpRequest(options, { email })).status).toEqual('error');
    expect(JSON.parse(await httpRequest(options),{ password }).status).toEqual('error');
}); 

test('Error on Login Unregistered user', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, { email: 'kadal@gmail.com', password: 'somepass' }));

    token = response.data;

    expect(response.status).toEqual('error');
});

test('Error on Login Registered user with invalid pass', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, { email, password: 'invalidpass' }));

    expect(response.status).toEqual('error');
});

test('Login Registered user to get jwt token', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, { email, password }));

    token = response.data;
    console.log(token);

    expect(response.status).toEqual('success');
});

test('Error on Patch Registered user without auth token', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = JSON.parse(await httpRequest(options, 
        { 
            fullname: 'Underwater Eylelae',
            phone: '101010101'
        }
    ));

    expect(response.status).toEqual('error');
});

test('Patch Registered user with auth token', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/user',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    const response = JSON.parse(await httpRequest(options, 
        { 
            fullname: 'Underwater Eylelae',
            phone: '101010101'
        }
    ));

    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data.email).toEqual(email);
    expect(response.data.fullname).toEqual('Underwater Eylelae');
    expect(response.data.phone).toEqual('101010101');
});