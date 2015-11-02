//began by requesting the Create Article page using the browser.get() method. 
//Then, we used the element() and by.css() methods to submit the form. 
//Finally, we found the error message element using by.binding() and validated the error text. 
//While this is a simple example, it illustrates well the way E2E tests work.
describe('Articles E2E Tests:', function() {
  describe('New Article Page', function() {
    it('Should not be able to create a new article', function() {
      browser.get('http://localhost:3000/#!/articles/create');
      element(by.css('input[type=submit]')).click();
      element(by.binding('error')).getText().then(function(errorText) {
        expect(errorText).toBe('User is not logged in');
      });
    });
  });
});