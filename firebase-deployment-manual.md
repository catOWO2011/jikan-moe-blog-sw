# Firebase Deployment

## Content
[Requirements](#1-install-the-firebase-cli)

### Requirements

* Install the [Firebase CLI reference](https://firebase.google.com/docs/cli#install-cli-mac-linux) or just write this, but make sure the command line to install hasn't changed
```bash
curl -sL https://firebase.tools | bash
```
* Log in and test the Firebase CLI
```bash
firebase login
```
```bash
firebase projects:list
```
* Deploy with
```bash
firebase deploy
```