const validateDto = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(403);
        const mes = error.details[0].message;
        throw new Error(mes.replaceAll('"', ""));
    }
    next();
};

module.exports = {
    validateDto,
};
