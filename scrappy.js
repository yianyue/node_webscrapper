var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// worry about using this as a module later
// var exports = module.exports = {};

var webpage = 'http://substack.net/images/';
var website = 'http://substack.net';

request(webpage, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = [];
    var $ = cheerio.load(body);

    $('table').find('tr').each(function(i, elem){
      var permission = $(this).find('td:first-child').text();
      var url = website + $(this).find('a').attr('href');
      var type = $(this).find('td').last().text().split('.')[1];
    });

  } else {
    console.log('FAIL!');
  }
})