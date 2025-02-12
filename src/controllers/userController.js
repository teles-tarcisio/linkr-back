import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";

export async function createUser(req, res) {
  try {
    const user = req.body;

    const verifyEmail = await userRepository.getUserByEmail(user.email);
    if (verifyEmail.rowCount > 0) {
      return res.sendStatus(409);
    }

    const password = bcrypt.hashSync(user.password, 10);
    delete user.password;
    await userRepository.createUser({ ...user, password });

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function searchUser(req, res) {
  try {
    const { user } = req.query;

    const fetchedUsers = await userRepository.searchUser(user);
    if (fetchedUsers.rowCount === 0) {
      return res.send([]);
    }

    res.status(200).send(fetchedUsers.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
