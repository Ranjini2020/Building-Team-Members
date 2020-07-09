# Building-Team-Members

This project builds a Node CLI that takes in information about employees and generates an HTML webpage 
that displays summaries for each person. Since testing is a key piece in making code maintainable, 
it's used to ensure that all unit tests pass.


## Details

It's a software engineering team generator command line application, where the application
prompts the user for information about the team manager and then information about the team members. 
The user can input any number of team members, and they may be a mix of engineers and interns. 
The entries pass all unit tests. When the user has completed building the team, the application creates an HTML 
file that displays the team roster based on the information provided by the user. 

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

### User input

The project prompts the user to build an engineering team. An engineering
team consists of a manager, and any number of engineers and interns.

### Roster output

The project generate a `team.html` page in the `output` directory, that displays
a formatted team roster. 
