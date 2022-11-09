import path from 'path';
import { inspect } from 'util';

import jestOpenAPI from '..';

const dirContainingApiSpec = path.resolve(
  '../../commonTestResources/exampleOpenApiFiles/valid/colonInUrlBug',
);

describe('Recreate bug', () => {
  beforeAll(() => {
    const pathToApiSpec = path.join(dirContainingApiSpec, 'openapi.yml');
    jestOpenAPI(pathToApiSpec);
  });

  const res = {
    status: 200,
    req: {
      method: 'POST',
      path: '/api/something/example:one',
    },
    body: {
      one: 'foo',
    },
  };

  it('passes', () => {
    expect(res).toSatisfyApiSpec();
  });

  it('fails when using .not', () => {
    let assertion = () => expect(res).not.toSatisfyApiSpec();
    expect(assertion).toThrow(
      inspect({
        body: {
          one: 'foo',
        },
      }),
    );
  });
});
