var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(fileName){

  var webpage = 'http://substack.net/images/';
  var website = 'http://substack.net';

  request(webpage, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var file = fs.createWriteStream(fileName);

      $('table').find('tr').each(function(i, elem){      
        var permission = $(this).find('td:first-child').text();
        var url = website + $(this).find('a').attr('href');
        var type = $(this).find('td').last().text().split('.')[1];

        if (type){file.write(permission + ',' + url + ',' + type + '\n');}
      });

    } else {
      console.log('FAIL!');
    }
  });

}