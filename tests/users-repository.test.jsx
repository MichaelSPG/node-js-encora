import UsersRepository  from '../modules/user-repository.js';
import fs from 'fs';

process.env.DEBUG = 'jest*';
const TEST_USERS_FILE_PATH = 'test-users.json';

afterEach(() => {
    // Delete the test file at the end of the tests
    if (fs.existsSync(TEST_USERS_FILE_PATH)) {
        fs.unlinkSync(TEST_USERS_FILE_PATH);
    }
});

describe('UsersRepository', () => {
  test('add method should add user to the repository', async () => {
    const usersRepository = new UsersRepository(TEST_USERS_FILE_PATH);
    const user = { name: 'Federico', email: 'federico@example.com', address: '123 Sec St' };

    await usersRepository.add(user);
    

    const users = await usersRepository.getAll();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(expect.objectContaining(user));
  });

  test('add method should throw error if email already exists', async () => {
    const usersRepository = new UsersRepository(TEST_USERS_FILE_PATH);
    const existingUser = { name: 'Existing User', email: 'existing@example.com', address: '123 Main St' };
    await usersRepository.add(existingUser);

    const newUser = { name: 'New User', email: 'existing@example.com', address: '456 Elm St' };
    await expect(usersRepository.add(newUser)).rejects.toThrow('A user with this email already exists.');
});
test('add method should throw error for invalid name', async () => {
  const usersRepository = new UsersRepository(TEST_USERS_FILE_PATH);
  const newUser = { name: 'Short', email: 'short@example.com', address: '123 Main St' };
  await expect(usersRepository.add(newUser)).rejects.toThrow('Name must have more than 6 characters and should not contain special characters.');
});

test('add method should handle concurrent access', async () => {
  const usersRepository = new UsersRepository(TEST_USERS_FILE_PATH);
  const newUser1 = { name: 'Concurrent User 1', email: 'concurrent1@example.com', address: '123 Main St' };
  const newUser2 = { name: 'Concurrent User 2', email: 'concurrent2@example.com', address: '456 Elm St' };

  await Promise.all([
      usersRepository.add(newUser1),
      usersRepository.add(newUser2)
  ]);

  const users = await usersRepository.getAll();
  expect(users.length).toBe(2);
});

test('add method should throw error for invalid email', async () => {
  const usersRepository = new UsersRepository(TEST_USERS_FILE_PATH);
  const newUser = { name: 'Invalid Email', email: 'invalid-email', address: '123 Main St' };
  await expect(usersRepository.add(newUser)).rejects.toThrow('Email is required and should have a valid format.');
});
});