var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// worry about using this as a module later
// var exports = module.exports = {};

var webpage = 'http://substack.net/images/';

request(webpage, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = [];
    var $ = cheerio.load(body);
    var rows = $('table').find('tr').text();
    $('table').find('tr').each(function(i, elem){

      console.log($(this).find('td:first-child').text());
    });

    // for (var i = 0; i < $rows.length; i++){
    // }

  } else {
    console.log('FAIL!');
  }
})