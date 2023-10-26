## Modern Testing Workshop

- packages to install

```zh
pnpm i -D @playwright/test @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event @types/jest @types/testing-library__jest-dom @vitest/coverage-c8 @vitest/coverage-istanbul @vitest/ui jsdom msw vitest
```

#### Tech tools

- https://pnpm.io
- https://vitejs.dev
- https://react-hook-form.com
- https://zod.dev
- https://tailwindcss.com
- https://zustand-demo.pmnd.rs
- https://tanstack.com
- https://vitest.dev
- https://playwright.dev

```sh
$ pnpm install
```

```sh
$ pnpm start
```

#### E2e testing

```sh
$ npx playwright install
```

```sh
$ pnpm test:e2e
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)

## Set up React Testing Library and Vitest

- create ./src/test-utils/testing-library-util.tsx that will be a copy of the root component

## Set up MSW for mocking API calls

- pnpm i -D msw
- the msw is a mocking library which will intercept the requests and responses in the integration tests
- create ./src/mocks/handler/todoHandler.ts
- create ./src/mocks/handler/index.ts
- create ./src/mocks/server.ts
- update the ./src/setupTests.ts

## Integration tests

- write integration tests for the fetch todos function of WorkTodosPage.tsx by creating ./src/pages/tests/WorkTodosPage.test.ts
- run the tests, pnpm run test, and see if the todos are rendered

#### TanStack Query persist cache between tests

- the beforeEach does not work

```ts
beforeEach(() => {
  queryClient.clear();
});
```

### Writing tests

- install dependencies
- update the package.json by adding unit tests scripts runner
- write test for the helpers/compute.ts
- run test
- update vite config
- write mocks
- write test for the pages/
- run test using different scripts
- add playwright config
- update the package.json by adding e2e tests scripts runner
- write tests in e2e folder for home page and heroes
- run tests
- show playwright code gen for adding new villain
- run test
