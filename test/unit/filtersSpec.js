'use strict';

/* jasmine specs for filters go here */

 beforeEach(module('spBlogger.admin.filters'));

describe('Wordcount Filter Test\n', function(){
	
	it('Should count the number of words as 3',inject(function(wordcountFilter){
		expect(wordcountFilter('Three words here')).toEqual(3);
	}));
	
});



describe('filter', function() {
beforeEach(module('spBlogger.admin.filters'));
describe('Permalink Filter Test\n', function() {
it('Should Replace all spaces with hyphens and convert to lowercase', inject(function(permalinkFilter) {
expect(permalinkFilter('I had 3 spaces')).toEqual('i-had-3-spaces');
}));
});
});

//describe('filter', function() {
  //beforeEach(module('myApp.filters'));


  //describe('interpolate', function() {
    //beforeEach(module(function($provide) {
      //$provide.value('version', 'TEST_VER');
    //}));


    //it('should replace VERSION', inject(function(interpolateFilter) {
      //expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    //}));
  //});
//});
