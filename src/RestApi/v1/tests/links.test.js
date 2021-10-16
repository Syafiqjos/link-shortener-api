const { httpRequest } = require('./__global');

const username = 'someone@gmail.com';
const password = 'somepassword';

let madeAnonLink = null;

test('Make anonymus / unauthorized link', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-1",
        "custom_url" : "bruh-custom-1"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "success",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    expect(made.data.redirect_url).toEqual(must.data.redirect_url);
    expect(made.data.custom_url).toEqual(must.data.custom_url);

    madeAnonLink = made;

    console.log(link);
});

// 

test('Error on duplicate custom-link link', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-1",
        "custom_url" : "bruh-custom-1"
    };
    const link = await httpRequest(options, data);

    expect(JSON.parse(link).status).toEqual('error');

    console.log(link);
});

test('Make authored link but error on invalid signature', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04d'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-user",
        "custom_url" : "bruh-custom-user"
    };
    const link = await httpRequest(options, data);

    expect(JSON.parse(link).status).toEqual('error');

    console.log(link);
});

// 
let madeLink = null;

test('Make authored link', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-user",
        "custom_url" : "bruh-custom-user"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "success",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    expect(made.data.redirect_url).toEqual(must.data.redirect_url);
    expect(made.data.custom_url).toEqual(must.data.custom_url);

    madeLink = made;

    console.log(link);
});

test('Get link by id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'GET',
    };
    const data = {
        "redirect_url" : "bruh-redirect-user",
        "custom_url" : "bruh-custom-user"
    };
    const link = await httpRequest(options);

    const must = {
        status: "success",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    expect(made.data.redirect_url).toEqual(must.data.redirect_url);
    expect(made.data.custom_url).toEqual(must.data.custom_url);

    console.log(link);
});

test('Error on Patch anon / unauthored link by id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeAnonLink.data._id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const data = {
        "redirect_url" : "bruh-redirect-user",
        "custom_url" : "bruh-custom-user"
    };

    const link = await httpRequest(options, data);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Patch user link by id but unauthorized', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-1",
        "custom_url" : "bruh-custom-1"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "error",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Patch user link by id but invalid token signature', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04d'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-1",
        "custom_url" : "bruh-custom-1"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Patch user link by id Authorized but with duplicate custom_link', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-1",
        "custom_url" : "bruh-custom-1"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    
    console.log(link);
});

test('Patch user link by id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-2",
        "custom_url" : "bruh-custom-2"
    };
    const link = await httpRequest(options, data);

    const must = {
        status: "success",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    expect(made.data.redirect_url).toEqual(must.data.redirect_url);
    expect(made.data.custom_url).toEqual(must.data.custom_url);

    console.log(link);
});

test('Error on Delete anon / unauthored link by id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeAnonLink.data._id,
        method: 'DELETE'
    };
    const link = await httpRequest(options);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Delete user link by id but unauthorized', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeAnonLink.data._id,
        method: 'DELETE'
    };
    const link = await httpRequest(options);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Delete user link by id but unauthorized', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'DELETE'
    };
    const link = await httpRequest(options);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Delete user link by id but invalid token signature', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04d'
        }
    };
    const link = await httpRequest(options);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Error on Delete user link by id but id not found', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id + 'a',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const link = await httpRequest(options);

    const must = {
        status: "error"
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);

    console.log(link);
});

test('Delete user link by id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/links/' + madeLink.data._id,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjJhNzNkYmFmZDk5YWQxMDQ2N2E0OCIsImlhdCI6MTYzMzg1NjYwM30.Pv99paz8bJYVsgW6hlveqikNKq94QzaObcuYA5gcR04'
        }
    };
    const data = {
        "redirect_url" : "bruh-redirect-2",
        "custom_url" : "bruh-custom-2"
    };
    const link = await httpRequest(options);

    const must = {
        status: "success",
        data
    }

    const made = JSON.parse(link);
    expect(made.status).toEqual(must.status);
    expect(made.data.redirect_url).toEqual(must.data.redirect_url);
    expect(made.data.custom_url).toEqual(must.data.custom_url);

    console.log(link);
});