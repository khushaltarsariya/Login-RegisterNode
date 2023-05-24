import { check } from "express-validator"

exports.checkUserDetails = () =>{
    return[
        check('email')
        .notEmpty()
        .withMessage('Email Require')
        .trim()
        .escape(),

        check('password')
        .notEmpty()
        .withMessage('password show be more than eight character')
        .trim()
        .escape()
    ]
}

exports.loginUserDetails=()=>{
    return[
    check('email')
    .notEmpty()
    .withMessage('Email Require')
    .trim()
    .escape(),

    check('password')
    .notEmpty()
    .withMessage('password show be more than eight character')
    .trim()
    .escape()
    ]
}