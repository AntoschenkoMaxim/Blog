const REQUIRED_MESSAGE = 'This field is required!'

const validationData = {
  email: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regexErrorMessage: 'Email field is incorrect!',
  },
  password: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    regex: /^.*(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).*$/,
    regexErrorMessage: 'Password field is incorrect!',
  },
  firstName: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    regex: /^[A-Za-z]+$/,
    regexErrorMessage: 'Name field is incorrect!',
  },
  lastName: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    // regex: ,
    regexErrorMessage: 'Last name field is incorrect!',
  },
  location: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    // regex: ,
    regexErrorMessage: 'Location field is incorrect!',
  },
  title: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    // regex: ,
    regexErrorMessage: 'Title field is incorrect!',
  },
  description: {
    required: true,
    requiredErrorMessage: REQUIRED_MESSAGE,
    // regex: ,
    regexErrorMessage: 'Description field is incorrect!',
  },
}

export default validationData
