import { NgwworkerPage } from './app.po';

describe('ngwworker App', () => {
  let page: NgwworkerPage;

  beforeEach(() => {
    page = new NgwworkerPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
