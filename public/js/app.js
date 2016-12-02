$('.menu .item')
  .tab()
;

$('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'name',
        rules: [
          {
            type   : 'minLength[6]',
            prompt : 'Your account name must be at least {ruleValue} characters'
          },
          {
          	type : 'empty',
          	prompt : 'Please enter a username'
          }
        ]
      },
      identifier: 'password',
      rules: [
      	{
      		type : 'minLength[6]',
      		prompt : 'Your password name must be a least {ruleValue} chracters long'
      	},
      	{
      		type : 'empty',
      		prompt : 'Please Enter a password.'
      	}
      ]
    }
  })
;