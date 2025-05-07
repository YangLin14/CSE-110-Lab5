# Lab 5 - Starter

**Member: Fong Yu Lin**

## Questions
1. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

    I would only use unit test to test the specific features for "message" and not for the entire message flow. These features can be creating new message, format logic, sending and saving messages, etc. However, I wouldn't use it to test the whole flow of message as unit testing is designed to test something individually on small scales. The entire message flow here means sending a message from one user and receiving it on another.

2. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.

    Unit test would be a great fit for testing this feature as it is in small scale and specific. It's also perfect to use unit test here because it doesn't no external systems or full application flows are involved.