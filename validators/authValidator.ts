import { checkSchema } from 'express-validator';

export const signupWithCredentialsValidator = checkSchema({
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  contactNumber: {
    isString: {
      errorMessage: 'Contact number must be a string',
    },
    notEmpty: {
      errorMessage: 'Contact number is required',
    },
  },
  token: {
    isString: {
      errorMessage: 'Token must be a string',
    },
    notEmpty: {
      errorMessage: 'Token is required',
    },
  },
  role: {
    optional: true,
    isString: {
      errorMessage: 'Role must be a string',
    },
  },
});
export const signInWithCredentialsValidator = checkSchema({
    token: {
      isString: {
        errorMessage: 'Token must be a string',
      },
      notEmpty: {
        errorMessage: 'Token is required',
      },
    },
  });
  export const signupWithGoogleValidator = checkSchema({
    token: {
      isString: {
        errorMessage: 'Token must be a string',
      },
      notEmpty: {
        errorMessage: 'Token is required',
      },
    },
    name: {
      isString: {
        errorMessage: 'Name must be a string',
      },
      notEmpty: {
        errorMessage: 'Name is required',
      },
    },
    role: {
      isString: {
        errorMessage: 'Role must be a string',
      },
      optional: true,
    },
  });
  
  export const signInWithGoogleValidator = checkSchema({
    token: {
      isString: {
        errorMessage: 'Token must be a string',
      },
      notEmpty: {
        errorMessage: 'Token is required',
      },
    },
  });
  


