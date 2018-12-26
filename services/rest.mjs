'use strict';
import request from 'request';

export default class Rest {
    /**
     * @param url
     * @param qs
     * @param callback
     */
    get(url, qs, callback) {
        qs = !!qs ? qs : {};
        request.get({
            url: url,
            qs: qs,
            json: true
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }
    /**
     *
     * @param url
     * @param postbody
     * @param callback
     */
    post(url, postbody, qs, callback) {
        request.post({
            url: url,
            body: postbody,
            qs,
            json: true
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }
    /**
     *
     * @param url
     * @param postbody
     * @param callback
     */
    put(url, postbody, qs, callback) {
        request.put({
            url: url,
            body: postbody,
            qs,
            json: true
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }
    /**
     *
     * @param url
     * @param qs
     * @param callback
     */
    delete(url, qs, callback) {
        qs = !!qs ? qs : {};
        request.delete({
            url: url,
            qs: qs,
            json: true
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }
}
