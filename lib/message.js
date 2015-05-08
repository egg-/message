/**
 * message.js: message handler
 *
 * @version 0.0.1
 * @author egg <i@egg.pe.kr>
 */

'use strict';

var pool = {
	error: {}
};

/**
 * @namespace message.error
 */
var error = {
	/**
	 * return error object
	 * @memberOf message.error
	 * @param {string | message~ERROR} err error type or error object.
	 * @return {message~ERROR}
	 */
	get: function(err) {
		if (typeof err === 'string') {
			if (typeof pool.error[err] === 'undefined') {
				pool.errors[err] = [
					500, 'unkown error type.'
				];
			}

			err = {
				type: err,
				code: pool.error[err][0],
				message: pool.error[err][1]
			};
		}

		return err;
	}
};


/**
 * @namespace message
 */
module.exports = {
	/**
	 * load message pool.
	 * @param {string} key `error`
	 */
	load: function(key, messages) {
		if (typeof pool[key] === 'undefined') {
			throw new Error('not support type.');
		}

		pool[key] = messages;
	},
	error: error
};


/**
 * @typedef {object} message~ERROR
 * @property {string} type error type (`common.***`)
 * @property {number} code error code (`400`, `403`)
 * @property {string} message error message.
 * @example
 * {
 * 	"code": 403,
 * 	"type": "common.forbidden",
 * 	"message": "access forbidden, The request may not be properl authorize.y"
 * }
 */