module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 0,
    'no-alert': 0,
  },
};


// This will tell ESlint to use the Airbnb ruleset we just installed. It will also allow files 
// with a js ending to contain JSX and switch off warnings for console and alert statements.