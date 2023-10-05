<div align="center">
  <p>
    <img src="https://hotemoji.com/images/dl/l/bee-emoji-by-twitter.png" width="150">
  </p>
  <h1>vbusy</h1>
  <p align="center">
    <a href="https://github.com/enna-ai/vbusy-ext">chrome extension</a>
    •
    <a href="http://github.com/enna-ai/vbusy-widget">widget</a>
    <br>
    A versatile task management system with web and CLI interfaces
  </p>
</div>

# Web
<table>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/5AB0wKv.png">
        <figcaption>Login/Register Page</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/kSJB13Q.png">
        <figcaption>Task Dashboard</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/Cqd9aZw.png">
        <figcaption>Recent Activity</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/akpevHv.png">
        <figcaption>Editing a task</figcaption>
      </figure>
    </td>
  </tr>
</table>

## CLI
<table>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/CJqm82Z.png">
        <figcaption>Logging into Vbusy account</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/KdzDjK3.png">
        <figcaption>Dashboard and Commands List</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/KCzOj8A.png">
        <figcaption>Task List Command</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/mh36iJF.png">
        <figcaption>Logging out of Vbusy account</figcaption>
      </figure>
    </td>
  </tr>
</table>

# CLI Commands
```
Usage: vb <command>

Commands
  archive      Archive a task
  complete     Mark a task as incomplete
  create       Create a new task
  delete       Delete a task
  export       Export a task into a json file
  incomplete   Mark a task as incomplete
  list         Get all tasks
  purge        Delete all tasks
  unarchive    Unarchive a task
  update       Edit a task and its properties
  view         Preview a task
```
> usage examples for exporting a task
```sh
vb export -d /Users/User/Downloads
? Select a task to export: task
```

# To Do
- [ ] Add account delete functionality
- [ ] Button to download tasks (web)
- [ ] Add subtasks feature
- [ ] Pagination to _Recent Activity_ and _Tasks Dashboard_
- [ ] CLI flags and aliases
