const { httpRequest } = require('./__global');

test('Test httpRequest must failed when options is null', async () => {
    const data = await httpRequest(null);

    expect(data).toBeFalsy();

    console.log(data);
});

test('Test httpRequest must failed when url is exists', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/6169b6483142bda6767d5848',
        method: 'GET'
    };
    const data = await httpRequest(options);

    expect(data).not.toBeFalsy();

    console.log(data);
});

test('Test httpRequest with header options', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/6169b6483142bda6767d5848',
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    };
    const data = await httpRequest(options);

    expect(data).not.toBeFalsy();

    console.log(data);
});

test('Test httpRequest POST with header options', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const toBeSent = {
        "redirect_url" : "bruh-3",
        "custom_url" : "bruh-3"
    };

    const data = await httpRequest(options, toBeSent);

    expect(data).not.toBeFalsy();

    console.log(data);
});