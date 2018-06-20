/**
 *Provides a security box to host a secret
 *
 
 *
 */

var keep;
var retrieve;
var updatePassword;

(function() {
  var box = {
    password: "",
    secret: ""
  };

  /**
   * Saves a secret inside the box.
   * 
   * @param {string} password - The box access credential.
   * @param {string} secret - The secret to keep securely inside the box.
   * 
   * @throws {Error} - If password is invalid or incorrect, or secret is invalid.
   */

  keep = function(password, secret) {
    return (box.password = password), (box.secret = secret);
  };
  /**
   * Recovers the secret from inside the box.
   * 
   * @param {string} password - The box access credential.
   * 
   * @throws
   */

  retrieve = function(password) {
    if (password === box.password) {
      return box.secret;
    } else {
        throw Error("Your current password is incorrect!");
    }
  };
  updatePassword = function(password, newPassword) {
    if (box.password === password) {
      box.password = newPassword;
    } else {
      throw Error("Your current password is incorrect!");
    }
  };
})();
