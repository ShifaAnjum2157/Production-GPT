import bcrypt from 'bcryptjs';
export const hashPassword = async (password) => {
    try {
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        console.log(error)
    }
}
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}