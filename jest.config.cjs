// jest.config.js
//module.exports = { testEnvironment: 'node' };

module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    }
  };