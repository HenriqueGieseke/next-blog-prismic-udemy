module.exports = {
  //informar quais caminhos ignorar
  testPathIgnorePatterns: ['/node_modules', '/.next/'],
  //caminho do arquivo de setup inicial executado pelo jest
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  //o que o babel precisa transpilar para o jest interpretar
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  //informa quais arquivos identity-obj-proxy vai transpilar
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
  //Receber relatório de cobertura
  collectCoverage: true,
  //quais arquivos o relatório vai cobrir
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/_app.tsx',
    '!src/**/_document.tsx',
  ],
  //define o tipo de relatório
  coverageReporters: ['lcov', 'json'],
};
