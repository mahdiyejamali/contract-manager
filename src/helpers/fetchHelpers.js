'use strict';

const errorHandler = response => response.ok
    ? response
    : Promise.reject(response);

const parseResponse = response => response.json();

exports.errorHandler = errorHandler;
exports.parseResponse = parseResponse;
