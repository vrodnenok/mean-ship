'use strict';

describe 'Main View', ->
  page = undefined
  beforeEach ->
    browser.get('http:localhost:9000')
    page = require('./main.po')
    return
  it 'should include jumbotron with correct data', ->
    expect(page.body.getText()).toMatch(/Sign up/)
    return