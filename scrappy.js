var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(fileName){

  var webpage = 'http://substack.net/images/';
  var website = 'http://substack.net';

  request(webpage, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Convert the body of the response into a cheerio object for jquery
      var $ = cheerio.load(body);
      // Create a write stream on a file
      var file = fs.createWriteStream(fileName);
      // loop through each row of the table to get the data
      $('table').find('tr').each(function(i, elem){      
        var permission = $(this).find('td:first-child').text();
        var url = website + $(this).find('a').attr('href');
        var type = $(this).find('td').last().text().split('.')[1];
      // only write to file if there's a file type (not a directory)
        if (type){file.write(permission + ',' + url + ',' + type + '\n');}
      });

    } else {
      console.log(error);
    }
  });

}