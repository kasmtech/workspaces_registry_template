<h1 align="center">
  <br>
  <img width="150" src="https://user-images.githubusercontent.com/5698566/230345149-ef757e51-6eb9-479d-94f5-a13e4ad33b03.png">
  <br>
  Kasm Workspaces Registry
  <br>
</h1>

<p align="center">This repository is a template you can use to create your own registry that will work with Kasm Workspaces. A front end website is automatically generated for you and will look similar to the one below.</p>

![image](https://user-images.githubusercontent.com/5698566/230064289-9e8967a1-4ff9-43f3-8495-f4170c23a80f.png)

## Contents

1. [Create your own repository](#1-create-your-own-repository)
   - [Use this template](#use-this-template)
   - [Configure repository](#configure-repository)
1. [Check workflows are running](#2-check-workflows-are-running)
1. [Edit the config variables](#3-edit-the-config-variables)
   - [Modify next.config.js](#modify-nextconfigjs)
   - [Settings definitions](#settings-definitions)
   - [Commit changes](#commit-changes)
1. [Set up GitHub pages](#4-set-up-github-pages)
   - [Initial setup](#initial-setup)
   - [Visit the site](#visit-the-site)
   - [Check build progress](#check-build-progress)
   - [Checking it works](#checking-it-works)
1. [Creating Workspaces](#5-creating-workspaces)
   - [Folder structure](#folder-structure)
   - [Schema](#schema)
   - [New schema version](#new-schema-version)
1. [Discovery](#6-dicovery)


&nbsp;

## 1. Create your own repository

### Use this template

<img width="800" src="https://user-images.githubusercontent.com/5698566/230080486-08d4c678-a0bd-4f30-863b-5f7f0bb9182f.png" />

1. Click on the green **Use this template** button.
2. Select **Create a new repository** from the dropdown. 


### Configure repository

![use-template](https://user-images.githubusercontent.com/5698566/230080115-e81a5663-5752-44fc-94a5-ea7721e5745b.gif)

> **Note**
> If you set the **Repository name** to `kasm-registry` you wont have to make any changes to the `baseUrl` later, unless you want to use a (sub)domain.

1. Select a **Repository name**, this name will also be used later for the `baseUrl`, 
2. Make sure it's set as a **Public** repository
3. Tick the **Include all branches** checkbox, 
4. Click on the **Create repository from template** button.

&nbsp;

## 2. Check workflows are running

<img width="600" src="https://user-images.githubusercontent.com/5698566/230056251-09d722e8-41d8-4adf-b166-b623624e19ec.png" />

> **Note**
> If you see something in the table that looks similar to the above then it's working. If it needs enabling this section will probably be blank with a message about workflows needing to be enabled.

Click on the **Actions** tab in the top menu and check whether workflows need enabling, if they do, enable them, otherwise you should be good to go.

&nbsp;

## 3. Edit the config variables

### Modify next.config.js
![edit-conf](https://user-images.githubusercontent.com/5698566/230075839-ec698589-1276-4163-bd5e-34642a108e7f.gif)

1. Go back to the `Code` tab
1. Click the `site` folder
2. Click on the `next.config.js` file
1. Click the edit button. 
2. Fill in the `env` section with the relevant information and change the basePath if needed (details below).

### Settings definitions

<img width="600" src="https://user-images.githubusercontent.com/5698566/230057592-a6fbde4d-2bda-44ca-b77d-62c58ed97cc4.png" />

| Property  | Description |
| --------- | ----------- |
| env.name  | The name you want to display for your registry. |
| env.description  | A short description to display when a store's information button is pressed. |
| env.icon  | The image to display for your registry. You can upload an image to `/site/public/` and reference that by https://domain.com/1.1/image.png or if you aren't using a {sub}domain by referencing it from https://username.github.io/repositoryname/1.1/image.png where image.png is the name of the image you uploaded. Alternatively just put the url of an image available on the web. If you just want to get the registry up and working, leave the default value in place until later. |
| env.listUrl  | The link to the root of your site. For example https://username.github.io/repositoryname/ it should always include a trailing slash. |
| env.contactUrl  | A link users can use to contact you on, such as your github issues page (right click the **Issues** tab in the top menu - next to the **Code** tab - and select `copy link address` and paste that in). |
| basePath  | If you are using a domain or a subdomain, your basePath will just be `basePath: '/1.0',`, otherwise change the value to include what you chose for the repository name in step 2 `basePath: '/repositoryname/1.0',`. **The `1.0` will be replaced with the branch name automatically, so you should always keep it as 1.0.** |

### Commit changes
<img width="600" alt="image" src="https://user-images.githubusercontent.com/5698566/230355586-39f6b4a6-9e01-482d-bab1-f0c1a292de24.png">


1. Scroll down to the bottom of the page
2. Enter a commit message (You can also leave this blank)
3. Click the **Commit changes** button.

&nbsp;

## 4. Set up GitHub pages

### Initial setup

![gh-pages](https://user-images.githubusercontent.com/5698566/230077012-938704c4-af44-4d3c-8023-0732c34a78bc.gif)

> **Note**
> If you ticked the "Include all branches" checkbox in step 1, this should all be set up for you, if not, just follow the instructions below

1. Go to the **Settings** top menu tab
2. Click the **Pages** left menu item 
3. In the **Build and deployment** section, under the **Branch** heading, make sure the dropdown is set to gh-pages, if not, set it and click **Save**.

### Visit the site

If you see a message like the following:

![image](https://user-images.githubusercontent.com/5698566/230061310-f2883e2f-7279-45c9-8cc5-de56dcc6e03f.png)

Then congratulations, you should have a working site! Just click the **Visit Site** button. **However**, you changes may not have finished building yet, so before clicking the button it's advised to check the build process first.

### Check build progress

If you don't see that button yet, then not to worry, it's likely that you are just too quick (also if you do see the button but it doesn't reflect the changes you made, this next bit is relevant as well)

Check on the CI progress in the **Actions** tab, 

<img width="600" alt="image" src="https://user-images.githubusercontent.com/5698566/230061667-63829dbd-46f2-4f7b-96c4-0cab8279e8a6.png" />

Once `Page build and deployment` is finished go back to Settings / Pages and you should have a live site. Click on the Visit Site button.

**You should now have a working site which includes any workspaces you added or the default if you haven't made any changes yet**

<img width="600" alt="image" src="https://user-images.githubusercontent.com/5698566/230064289-9e8967a1-4ff9-43f3-8495-f4170c23a80f.png" />

### Checking it works

![install-registry-800](https://user-images.githubusercontent.com/5698566/230379178-4b2a08c7-3ae1-4000-88a0-ae4b8ab17892.gif)

> **Note**
> If you copy the url from the address bar instead of clicking the button, be sure to remove the branch version from the URL when adding to workspaces, otherwise it wont work.

1. Click on the **Workspace Registry Link** button, this will put the correct url in your clipboard.
2. Go to your Kasm Workspaces instance.
3. Navigate to the Workspaces Registry (Admin / Workspaces / Click on the **Workspaces Registry** button).
4. Click on **Add new** in the registries list.
5. Paste the URL into the text box and click **Add Registry**
6. Click on the mini icon under the registry name to filter by your registries workspaces

&nbsp;

## 5. Creating workspaces

Once you are ready to upload your workspaces, head back to the **Code** tab. You can either continue using the online editor or you might find it easier to clone the repository and work on a local copy, it's up to you. For this example we will continue with the online editor.

### Folder structure

![workspaces-800](https://user-images.githubusercontent.com/5698566/230384525-d8577582-fab7-4850-979d-d75e83503022.gif)

All workspaces reside in the **workspaces** folder

You will need to create a folder and the necessary files using the following format:

```
Workspace Name
- workspace.json
- workspace-name.png
```

![add-workspace-800](https://user-images.githubusercontent.com/5698566/230386427-c2221647-ce30-4c2e-bc92-e83481d1b8ba.gif)

**Folder name** - The folder name can be whatever it needs to be. You probably want to stay clear of special characters to be on the safe side, but spaces should be fine.

**workspace.json** - This is a JSON file with all the parameters you want to be sent to Kasm Workspaces when it builds the container. You can see the valid paramaters in the schema section and whether they are required or not.

```
{
  "description": "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
  "docker_registry": "https://index.docker.io/v1/",
  "image_src": "vs-code.png",
  "categories": [
    "Development"
  ],
  "friendly_name": "Visual Studio Code",
  "architecture": [
    "amd64",
    "arm64"
  ],
  "compatibility": [
    {
      "version": "1.16.x",
      "image": "kasmweb/vs-code:1.16",
      "uncompressed_size_mb": 2428,
      "available_tags": [
        "develop",
        "1.16.0"
      ]

    },
    {
      "version": "1.17.x",
      "image": "kasmweb/vs-code:1.17",
      "uncompressed_size_mb": 2528,
      "available_tags": [
        "develop",
        "1.17.0"
      ]
    }
  ]
}
```

**Image file** - The image can be `.png` or `.svg` and ideally will be square and at least 50 x 50px. If you use the workspace builder on your registry store front it will try to normalise everything to make it simpler.

Don't forget to commit your changes!

### Schema

**Version** 1.1

| Property              | Required | Type | Description |
| --------------------- | -------- | --- | --- |
| friendly_name         | True     | String | The name to show                                                                                     |
| description           | True     | String | A short description of the workspace                                                                 |
| image_src             | True     | String | The name of the workspace icon used                                                                  |
| architecture          | True     | Array | Json list containing either "amd64", "arm64" or both                                                 |
| compatability         | True     | Array | A list of Kasm versions the workspace should work with                                               |
| categories            | False    | Array | Json list containing the categories the workspace belongs too. This should be limited to a max of 3. |
| docker_registry       | False    | String | Which docker registry to use                                                                         |
| run_config            | False    | Object | Any additional parameters to add to the run config                                                   |
| exec_config           | False    | Object | Any additional parameters to add to the exec config                                                  |
| notes                 | False    | String | Notes about running the workspace, such as if it requires libseccomp.                                |
| cores                 | False    | Integer | Specify the amount of cores to use for this workspace                                                |
| memory                | False    | Integer | Specify the amount of memory to use for this workspace                                               |
| gpu_count             | False    | Integer | Specify the amount of GPUs to use for this workspace                                                 |
| cpu_allocation_method | False    | String | What CPU allocation method to use for this workspace. Can be either "Inherit", "Quotas" or "Shares"  |

The compatibility property is an array of objects and needs a bit more explanation
```json
  "compatibility": [
    {
      "version": "1.16.x",
      "image": "kasmweb/chromium:1.16.0-rolling-daily",
      "uncompressed_size_mb": 2643,
      "available_tags": [
        "develop",
        "1.16.0",
        "1.16.0-rolling-weekly",
        "1.16.0-rolling-daily"
      ]
    }
  ]
```
* **version** - This is the version of kasm the entry is compatible with
* **image** - The docker image. The tag is included for things like estimating the size and is used if there are no available_tags.
* **uncompressed_size_mb** - Integer of the approximate size of the workspace when it’s uncompressed in MB. This doesn’t take into account layers. For example if an image is 2.46GB you would enter 2460
* **available_tags** - These values are what will determine the available "channels" on the front end. If you don't want/need channels, remove the available_tags section completely. You shouldn't mix and match though, if you specify available_tags for 1 workspace, it should be specified for all of them. That doesn't mean every workspace has to have all the same tags, if a workspace only has develop tags then it will only show when develop is the selected channel. 

Head to the **Actions** tab to check your progress and once `Page build and deployment` is complete, your site should be ready.

### New Kasm Workspaces version

When a new version of Kasm is released then a new entry needs to be added to the compatibility list to support it. If you have a lot of workspaces defined then there are a couple of scripts included that can help.

Go to the processing folder and edit add_next_version.js changing the `baseversion` to match the new version. Also make sure the rest of the file matches your setup, if you anre't using channels then completely remove the `available_tags` section.

Then in a terminal run

```
cd processing
npm install
node add_next_version.js
```

This will add a new entry for every single workspace, but the size will be set to 0, this is so you can run the `get_image_sizes.js` script. This will loop through each `image` that has an uncompressed_size_mb of 0 and will pull the image, get the size, update the workspace json and remove the image. 

This can take a long time if you have a lot of workspaces and dependng on their sizes, but if the script crashes out, you can just start it agin and it will carry on from where it left off. 

```
node add_next_version.js
```

### New schema version

When a new schema version comes out, you just need to create a new branch that reflects the new schema, for example `1.2` and make it the default branch.

In the new branch, make any updates that are needed, when the changes are committed a new version will be built.

Kasm Workspaces will automatically pull the version of the schema that it understands.

If only the latest version is building (so 1.1 works but 1.0 doesn't), open build_all_branches.sh, search for `echo "All branches:` and check if there is `git fetch --all` on the line underneath, if not, add it, this will need to be added to the 1.0 branch as well if it's missing, otherwise if you make a change to 1.0 (for kasm versions 1.12.x - 1.15.x) it won't build all the branches.

**Updating to 1.16.x support**

1.16.x changed the schema from 1.0 to 1.1, the main changes to this are the compatibility changes from a simple array to an array of objects, this allows us to tie the image used and the image size to the kasm version.
In addition the top level name is removed as is top level uncompessed_size_mb as these are now available in the compatibility matrix (name is called image).

If you have an older version you will probably need to update the following files in your 1.1 branch:
* build_all_branches.sh
* processing/processjson.js
* site/components/Workspace.js
* site/pages/index.js
* site/pages/new/[[..workspace]].js

If you have a lot of workspaces (or just want an easier way to update your workspaces), there is an update file in processing called `update_1_0_to_1_1.js` copy that across to your own install, edit it and make sure the tags etc match your install. If you don't want to use channels, you can remove the available_tags section entirely.

Then to use it, create a 1.1 branch from your current 1.0 source, then in a terminal:

```
cd processing
npm install
node update_1_0_to_1_1.js
```

This will convert your existing workspaces to a 1.1 compatible format.

## Channels
Schema 1.1 added the concept of channels. Each registry can specify the channels they support, these are defined by the tags an image has. For example you might have develop, 1.16.0 and 1.16.0-rolling-daily. When the registry json is built it loops through all the workspaces and generates a list of all the possible "Channels" (tags) that are listed in compatibility.available_tags. Available tags is an optional list, if you don't include it on any of the workspaces then your registry will work as before without presenting the end user with a channels option. You shouldn't mix and match though, if you add available tags to 1 workspace, you should add available tags to all workspaces.

If you are using channels, update processing/processjson.js and specify the `default_channel` such as `'develop'`. If you aren't using channels you don't need to do anything, it will automatically detect there are no channels and set the correct value.

&nbsp;

## 6. Discovery

The tag below will hopefully make it easier for people to find your Workspace Registry by clicking on [this github search link](https://github.com/search?q=in%3Areadme+sort%3Aupdated+-user%3Akasmtech+%22KASM-REGISTRY-DISCOVERY-IDENTIFIER%22&type=repositories). If you want to make it harder to find your repository for some reason, just remove this section.

If you are the one doing the searching, click on the **site** folder, then click on **next.config.js** and the url can be found under **env.listUrl**

![search-600](https://user-images.githubusercontent.com/5698566/230614274-2976b4d7-074f-4e6d-9e58-e4d2512a3d2a.gif)

KASM-REGISTRY-DISCOVERY-IDENTIFIER


## Reporting Issues

To report any issues for this repository, please use our central issue tracker: **[Kasm Workspaces Issue Tracker](https://github.com/kasmtech/workspaces-issues/issues)**
