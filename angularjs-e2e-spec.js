var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var fs = require('fs'),
  path = require('path');
describe('angularjs homepage todo list', function () {
  this.timeout(150000);
  it('should add a todo', function () {
    browser.get('http://localhost:3000/#/home');
    element(by.model('login.user.loginName')).sendKeys('test1');
    element(by.model('login.user.password')).sendKeys('123456');
    var el = element(by.model('login.user.loginName'));
    //var tag = browser.executeScript('return alert(123)', el);//执行js
    //expect(3).to.eql(2);
    //screenshotsDir = path.resolve(__dirname + '../screenshots/');
    var file = path.resolve('C:\\Users\\colincao\\Desktop\\123'  + '.png');

    browser.takeScreenshot().then(function (png) {
      console.log('Writing file ' + file);
      fs.writeFileSync(file, png, {encoding: 'base64'}, console.log);
    }, console.log);//截图
    browser.sleep(4000);

    //browser.refresh();//刷新
    element.all(by.repeater('item in newdata')).get(0).click();
    element(by.css('.btn-info')).click();

    //browser.setLocation('login');
    //window.location.href = "http://localhost:3000/#/login";
    //element(by.model('vm.index')).sendKeys('0');
    var todoList = element.all(by.repeater('item in vm.titles')).get(0);
    //console.log(todoList);
    //browser.sleep(40000);
    todoList.click();
    browser.sleep(2000);
    element(by.id('merchatlists')).click();
    //var passed = jasmine.getEnv().currentSpec.results().passed();
    // Replace all space characters in spec name with dashes
    //var specName = jasmine.getEnv().currentSpec.description.replace(/ /g, '-'),
    //  baseFileName = specName,
    //  screenshotsDir = path.resolve(__dirname + '../screenshots/');
    //
    //if (!passed) {
    //}
    //element.all(by.model('deposit.manualForm.paymentType')).sendKeys('网银转账');
    //element(by.model('deposit.manualForm.receiveBankCard')).sendKeys('13144820853');
    //element(by.model('deposit.manualForm.platformName')).sendKeys('1');
    element(by.model('deposit.manualForm.amount')).sendKeys('10');
    element(by.model('deposit.manualForm.handCharge')).sendKeys('10');
    element(by.model('deposit.manualForm.payer')).sendKeys('10');
    element(by.model('deposit.manualForm.depositAddress')).sendKeys('123');
    element(by.model('deposit.manualForm.remark')).sendKeys('675');
    element(by.model('deposit.manualForm.balance')).sendKeys('775');
    element.all(by.css('.departmentbutton')).get(1).click();
    browser.sleep(4000);
    //actions = protractor.getInstance().actions();
    //actions.mouseMove(element);
    //actions.click();
    //actions.sendKeys("Some text");
    //actions.perform();`
    //by.model('vm.index').to.be(0);
    //expect(by.repeater('item in vm.titles')).to.eql(1);
    //expect(todoList.get(2).getText()).to.eql('write first protractor test');
    //
    //// You wrote your first test, cross it off the list
    //todoList.get(0).element(by.css('a')).click();
    //var completedAmount = element.all(by.css('.done-true'));
    //expect(completedAmount.count()).to.eql(2);
  });
});
//describe('NavCtrl', function() {
//  var $scope, $location, $rootScope, createController;
//
//  beforeEach(inject(function($injector) {
//    $location = $injector.get('$location');
//    $rootScope = $injector.get('$rootScope');
//    $scope = $rootScope.$new();
//
//    var $controller = $injector.get('$controller');
//
//    createController = function() {
//      return $controller('NavCtrl', {
//        '$scope': $scope
//      });
//    };
//  }));
//
//  it('should have a method to check if the path is active', function() {
//    var controller = createController();
//    $location.path('/about');
//    expect($location.path()).toBe('/about');
//    expect($scope.isActive('/about')).toBe(true);
//    expect($scope.isActive('/contact')).toBe(false);
//  });
//});
