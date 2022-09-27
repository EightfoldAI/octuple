jest.mock('../shared/utilities/uniqueId', () => ({
    uniqueId: jest.fn((prefix) => prefix),
}));
