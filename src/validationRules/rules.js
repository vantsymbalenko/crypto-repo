const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// password must contain at least 8 characters, one letter and one number
const passwordPattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const firstNamePattern = /^[a-zA-Z-а-яА-ЯёЁ]{2,}$/;
const lastNamePattern = /^[a-zA-Z-а-яА-ЯёЁ]{2,}$/;
const mobilePattern = /^[0-9]+$/;

export const emailRule = value => emailPattern.test(value);
export const passwordRule = value => passwordPattern.test(value);
export const firstNameRule = value => firstNamePattern.test(value);
export const lastNameRule = value => lastNamePattern.test(value);
export const mobileRule = value => mobilePattern.test(value);
