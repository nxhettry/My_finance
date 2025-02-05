import User from "@/models/model.user";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const createUser = async (email: string, password: string) => {
  return await User.create({
    username: email.split("@")[0],
    email: email,
    password: password,
  });
};
