

import server from './src/mocks/server'
import "@testing-library/jest-dom";

//Object.assign(global, { fetch: fetch, Request, Response });
global.matchMedia = global.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    }
  }

beforeAll(() => {
    server.listen({ onUnhandledRequest: "bypass" })
    
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        })),
    });

});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

