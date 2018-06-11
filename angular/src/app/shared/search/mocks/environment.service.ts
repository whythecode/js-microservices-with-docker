export class MockEnvironmentService {

  public config = {
    BASE_PATH: '/',
    PEOPLE_PATH: 'assets/data/people.json',
  };

  public loadEnvironment () {

    return Promise.resolve();
  }
}
