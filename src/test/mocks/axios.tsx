export default {
  get: jest.fn(() => Promise.resolve({})),
  post: jest.fn().mockResolvedValue({ data: {} }),
};
