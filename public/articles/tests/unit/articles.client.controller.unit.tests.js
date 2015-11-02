//describe() method, which informs the test tool this test is going to examine ArticlesController. 
describe('Testing Articles Controller', function() {
  var _scope, ArticlesController;


 //Inside the beforeEach() method, we created a new custom Jasmine Matcher, called toEqualData. 
 //This matcher will compare a regular object and a $resource wrapped object using the angular.equal() method. 
 //We added this matcher because $resource adds quite a few properties to our objects, so the basic comparison matcher will not work.
  beforeEach(function() {
    module('mean');

    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController', {
        $scope: _scope
      });
    });
  });

//use the $httpBackend.expectGET() method, which sets a new backend request assertion. 
//This means that the test expects an HTTP request that fulfills this assertion, and will respond with a certain response. 
//You then used the controller's find() method, which will create a pending HTTP request. The cycle ends when you call the $httpBackend.flush() method, which will simulate the server's response.
  it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
    inject(function($httpBackend) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });
      var sampleArticles = [sampleArticle];

      $httpBackend.expectGET('api/articles').respond(sampleArticles);

      _scope.find();
      $httpBackend.flush();

      expect(_scope.articles).toEqualData(sampleArticles);
    });
  }));
  
 // identical to the first one but will test the controller's findOne() method. On top of the $httpBackend service, 
 // it also uses the $routeParams service to set the articleId route parameter. 
  it('Should have a findOne method that uses $resource to retreive a single of article', inject(function(Articles) {
    inject(function($httpBackend, $routeParams) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });

      $routeParams.articleId = 'abcdef123456789012345678';

      $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

      _scope.findOne();
      $httpBackend.flush();

      expect(_scope.article).toEqualData(sampleArticle);
    });
  }));
});