<div align="center">
  <img src="https://i.imgur.com/AVqWl72.png" alt="bee" width="80"  style="margin-bottom: 15px;">
  <h1 align="center">vbusy</h1>
  <p>
    <a href="https://github.com/enna-ai/vbusy/tree/main/apps/extension">chrome extension</a>
     ·
    <a href="https://github.com/enna-ai/vbusy/tree/main/apps/widget">widget</a>
     ·
    <a href="https://github.com/enna-ai/vbusy/tree/main/apps/cli">cli
    </a>
  </p>
  <p>A versatile task management system with web and CLI interfaces</p>
</div>

&nbsp;

## At a glance

<table>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/5AB0wKv.png" alt="login screen">
        <figcaption>Login Screen</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/bfFb6fi.png" alt="onboarding">
        <figcaption>Onboarding</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
      <td>
        <figure>
          <img src="https://i.imgur.com/kSJB13Q.png" alt="Task Dashboard">
          <figcaption>Task Dashboard</figcaption>
        </figure>
      </td>
      <td>
        <figure>
          <img src="https://i.imgur.com/Cqd9aZw.png" alt="tasks history">
        <figcaption>Task History</figcaption>
      </figure>
    </td>
  </tr>
</table>

## Installation

1. clone repo

```sh
git clone
```

2. install turbo globally
```sh
npm install -g @turbo/cli
```

4. run the setup script

```sh
chmod +x setup.sh

./setup.sh
```

4. fill out the `.env` values for each app

5. run the development server

> [!NOTE]
> this runs the web app and api

```sh
turbo dev --filter api --filter web
```
