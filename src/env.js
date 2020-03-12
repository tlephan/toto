/**
 *  Expose all environment variables
 */
module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    FORGOT_PASSWORD_KEY: process.env.FORGOT_PASSWORD_KEY,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH // phanlethanh
};
