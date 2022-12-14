# Kasm Apps

This is a repository of the apps supported by Kasm. The apps list is automatically generated and can be used when creating new workspaces or using the 1 click installer

## Create your own app store

We have tried to make it as simple as possible for people to create their own app stores that work with Kasm, the easiest way to do that is to follow these steps:
 1. Fork this repository. You can also clone it, but forking it will make it easier for people to discover your app store.
 1. Enable workflows in the `Actions` tab.
 1. Remove the default apps in `/apps/` and add your own.
 1. Once you have made your first commit, the workflow will run and build your own App Store landing page and generate the apps.json file. Even just making a change to the README will trigger the build, this step is required before you can set up github pages.
 1. Go to `Settings / Pages` and under `Branch` select `gh-pages` then hit Save.
 1. Wait a few minutes for the Action to run building your page (you can see the progress in the Actions tab) and then you should be presented with your URL.
 
 Note: If you want to use a domain / subdomain, you will need to modify `site/next.config.js` and remove the line `basePath: '/kasm-apps',`.
