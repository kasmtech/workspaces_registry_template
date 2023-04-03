# THIS IS CURRENTLY IN DEVELOPMENT AND NOT READY FOR PRIME TIME YET, WE'LL ANNOUNCE WHEN IT'S INCLUDED IN BUILDS. FEEL FREE TO PLAY WITH IT THOUGH AND GIVE FEEDBACK.

# Kasm Workspaces

This is a repository of the workspaces supported by Kasm. The workspaces list is automatically generated and can be used when creating new workspaces or using the 1 click installer

## Create your own workspace registry

We have tried to make it as simple as possible for people to create their own registries that work with Kasm, the easiest way to do that is to follow these steps:

1. Click on "Use this template", select Create a new repository
1. Select a Repository name, you will need to use this name later in the process as well, tick the "Include all branches" checkbox, then click on the "Create repository from template" button
1. Click on the actions tab and check whether workflows need enabling, if they do, enable them, otherwise you should be good to go.
1. Go to `/site/next.config.js` and edit the `env` section with the relevant details. 
    * name - The name you want to display
    * description - A short description to display when a store's information button is pressed.
    * icon - The image to display for your registry. You can upload an image to `/site/public/` and reference that by https://domain.com/1.0/image.png or if you aren't using a {sub}domain by referencing it from https://username.github.io/repositoryname/1.0/image.png where image.png is the name of the image you uploaded.
    * listUrl - The link to the root of your site. For example https://username.github.io/repositoryname/ it should always include a trailing slash.
    * contactUrl - A link users can use to contact you on.
If you are using a domain or a subdomain, your basePath will just be `basePath: '/1.0',`, otherwise change the value to include what you chose for the repository name in step 2 `basePath: '/repositoryname/1.0',`. the `1.0` will be replaced with the branch name automatically, so you should always keep it as 1.0.
1. Upload your workspaces to the /workspaces folder
1. Go to Settings then Pages and select Branch - gh-pages and click Save
1. Check progress in Actions
1. Once complete go back to Settings / Pages and you should have a live site. Click on the Visit Site button.
1. You should now have a working site which includes any workspaces you added

[![](https://cdn.loom.com/sessions/thumbnails/256fac3d2bbb422b8e779ac1c8244d33-00001.gif)](https://www.loom.com/share/256fac3d2bbb422b8e779ac1c8244d33 "")

## New schema version

If a new schema version comes out, this is what you will need to do.

1. Create a new branch with the schema version as the branch name (for example, 1.1)
1. Open `site/next.config.js` and change the `basePath` to include the version number as well.

## Discovery

The tag below will hopefully make it easier for people to find your Workspace Registry by clicking on [this github search link](https://github.com/search?q=in%3Areadme+sort%3Aupdated+-user%3Akasmtech+%22KASM-REGISTRY-DISCOVERY-IDENTIFIER%22&type=repositories). If you want to make it harder to find your repository for some reason, just remove this section.

KASM-REGISTRY-DISCOVERY-IDENTIFIER