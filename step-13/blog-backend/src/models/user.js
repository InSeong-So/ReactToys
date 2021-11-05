import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 인스턴스 메서드는 화살표 함수를 사용하면 문서 인스턴스에 접근하지 못합니다.
UserSchema.methods.setPassword = async function setPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function checkPassword(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.statics.findByUsername = function findByUsername(username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function serialize() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function generateToken() {
  const token = jwt.sign(
    // 첫 번째 파라미터는 토큰 안에 넣고 싶은 데이터를 전달합니다.
    {
      _id: this._id,
      username: this.username,
    },
    // 두 번째 파라미터는 JWT 암호키를 전달합니다.
    process.env.JWT_SECRET,
    // 세 번째 파라미터는 유효 기간을 입력합니다.
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
