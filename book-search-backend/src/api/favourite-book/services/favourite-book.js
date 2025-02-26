'use strict';

/**
 * favourite-book service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favourite-book.favourite-book');
