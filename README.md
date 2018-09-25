# SecretSanta
Secret Santa pairing app

Welcome to the (slightly above average) Secret Santa pairing App.

How to use:

- On page load the users.json file (/root/json/users.json) will be loaded and listed on the page.
- Click 'start' to run the psuedo-random pairing algorithm
- Clicking on a user will allow you to edit that users detail.
- Clicking 'add' allows another user to be added to the system.
- Once loaded click 'shuffle' to re-run the pairing system. 

Browsers:

- IE8+
- Chrome
- Firefox
- Safari (Untested)

Future features tbc:

- Delete users
- Add/delete/edit directly applied to user.json file. The project parameters specified that the json file should not be edited;
  were this lifted then each crud-like operation on the ui could send an ajax request to a back-end script and rebuild 
  the json file with the updated user data.
- Mass email functionality to notify all users of who they have paired with. Similarly would involve an ajax request sent to a 
  server side mailing script which would construct a simple html email template and loop through all users: would require testing server
  to have smtp enabled.
