module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Gunakan Babel untuk transformasi file
    },
    testEnvironment: 'jest-environment-jsdom', // Gunakan jest-environment-jsdom
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock file CSS
    },
  };
  