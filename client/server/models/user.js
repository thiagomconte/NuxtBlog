const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false}
});

UserSchema.pre("save", function (next) {
    let user = this;
    if (this.isModified("password") || this.isNew) {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          return next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }else{
      next();
    }
  });
  
  UserSchema.methods.comparePassword = function (password, next) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
  };

module.exports = model("User", UserSchema);
