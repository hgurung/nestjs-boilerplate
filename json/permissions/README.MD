# Description

This file contains information about user permission while creating roles or assigning user with roles. There are three modules `general`, `settings`, `reports`. Under these modules contains submodules like `general` has `inboxes` so permission becomes `general.inboxes` and again we have `create_edit` permission so if user is assigned to `create_edit` in inboxes then his/her permission becomes `general.inboxes.create_edit`.

# Folder contains three files 
1. General (general_config_permission.json)
2. Reports (reports_config_permission.json)
3. Settings (settings_config_permission.json)


# Note for attributes

| Attributes | Description |
| ---------- | ----------- |
| `__comments` | This is overall description or comments about modules, submodules or permission. |
| `module` | Slug of module or id of module i.e general, settings, reports. |
| `access` | Child modules of parent module can be multiple and has own access and permissions. |
| `submodules` | Slug of module or id of module i.e general, settings, reports. |
| `name` | Name of submodules |
| `slug` | Slug of module or id of submodules i.e inboxes, deals, pipelines which later can be obtained via `settings.inboxes`. |
| `isDynamic` | Submodule which has api call likes fetching deals or contacts. |
| `nested` | Contains sub-category array list like in `Inboxes` We have `Shared & user's inboxes`, `All inboxes` and so on. |
| `access` | Contains access array list like `no_access`, `view_interact`, `create_edit`, `create_edit_delete`. |
