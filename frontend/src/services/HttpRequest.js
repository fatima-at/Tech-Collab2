import * as e from '../Endpoints';

export const post = async (url, body, headersType, signal, overrideToken) => {

    let headers = {};
    if (headersType === 'token') {
        headers = e.HeadersWithToken(overrideToken);
    }
    else if (headersType === 'auth') {
        headers = e.HeadersWithoutToken();
    }

    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';

    let localizedBody = {};
    if (body !== null) {

        localizedBody = {
            ...body,
        }
    }

    if (!window.navigator.onLine) {
        return new Error('Internet connection error');
    }
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body !== null ? JSON.stringify(localizedBody) : body,
        signal: signal
    }).then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
            console.log('error message: post request, ' + e + `,\nurl: ` + url);
            return e;
        });
}
export const put = async (url, body, headersType, encrypted, signal) => {

    let headers = {};
    if (headersType === 'token') {
        headers = e.HeadersWithToken();
    }
    else if (headersType === 'auth') {
        headers = e.HeadersWithoutToken();
    }

    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';

    let localizedBody = {};
    if (body !== null) {

        localizedBody = {
            ...body,
        }
    }
    if (!window.navigator.onLine) {
        return new Error('Internet connection error');
    }
    return await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body !== null ? JSON.stringify(localizedBody) : body,
        signal
    }).then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
            console.log('error message: post request, ' + e + `,\nurl: ` + url);
            return e;
        });
}

export const get = async (url, body, headersType, signal) => {
    let headers;
    if (headersType === 'token') {
        headers = e.HeadersWithToken();
    }
    else if (headersType === 'auth') {
        headers = e.HeadersWithoutToken();
    }

    let localizedBody = {};
    if (body !== null) {

        localizedBody = {
            ...body,
        }
    }
    if (!window.navigator.onLine) {
        return new Error('Internet connection error');
    }
    return await fetch(url, {
        method: 'GET',
        headers: headers,
        body: body !== null ? JSON.stringify(localizedBody) : body,
        signal: !!signal ? signal : undefined
    }).then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
            console.log('error message: get request, ' + e + `,\nurl: ` + url);
            return e;
        });
}

export const deleteApi = async (url, body, headersType, signal) => {
    let headers;
    if (headersType === 'token') {
        headers = e.HeadersWithToken();
    }
    else if (headersType === 'auth') {
        headers = e.HeadersWithoutToken();
    }

    let localizedBody = {};
    if (body !== null) {

        localizedBody = {
            ...body,
        }
    }
    if (!window.navigator.onLine) {
        return new Error('Internet connection error');
    }
    return await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: body !== null ? JSON.stringify(localizedBody) : body,
        signal
    }).then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
            console.log('error message: post request, ' + e + `,\nurl: ` + url);
            return e;
        });
}

export const patchApi = async (url, body, headersType, signal) => {
    let headers;
    if (headersType === 'token') {
        headers = e.HeadersWithToken();
    }
    else if (headersType === 'auth') {
        headers = e.HeadersWithoutToken();
    }

    body['_method'] = "PATCH";

    return await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body !== null ? JSON.stringify(body) : body,
        signal
    }).then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
            console.log('error message: post request, ' + e + `,\nurl: ` + url);
            return e;
        });
}