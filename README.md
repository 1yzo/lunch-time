## Getting Started
`npm install`
`npm start`
### Tests
`npm test`
## Approach
I stored all users as an array of objects in the root parent component's data and passed necessary information as props to the UserList and Modal components.
If you have already had coffee or lunch with another user, a coffee/lunch icon is displayed next to that user's name.
When a user clicks "Get Coffee" or "Get Lunch", the result is displayed in a modal. The array of users is persisted using localStorage whenever a user object
is added or updated.
