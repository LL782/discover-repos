# Discover Trending Repositories

This is an exercise project using TypeScript and React, boot-strapped with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

## Quick links

- [Run the tests](#run-the-tests-)
- [Run the app](#run-the-app)
- [Production build](#production-build)

## The Exercise 🏋️‍♀️

> The idea of this project is to implement a small client application for discovering trending repositories on GitHub.
>
> - A list of the repositories created in the last 7 days with the most number of stars in GitHub should be displayed and the user should be able to favourite them
> - The favourited repositories should be visible either through a filter or in a different tab.
> - Some basic info about the repo should be displayed, such as: repo name, link to GitHub, description and number of stars.
> - To keep things simple, the favourites won’t be sent back to GitHub’s servers but just stored locally (e.g localstorage, cookies etc...).
> - Feel free to use whichever libraries/design systems you like to achieve the task.
>
> 🍎 Bonus task: if time allows, the ability to filter the repos by the languages used would be an awesome addition to have.
>
> ### Implementation Details 🔎

## Run the tests 🧪

>

> GitHub provides a public search endpoint which you can use for fetching the most starred repositories:

```
> https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc
yarn install
yarn test
```

## Run the app

```
yarn install
yarn dev
```

See the [package.json](/package.json) for other available scripts.

## Production Build

The app is deployed to [https://discover-repos.vercel.app/](https://discover-repos.vercel.app/)

This is built from the `main` branch via configuration in [my Vercel Dashboard](https://vercel.com/ll782/discover-repos)
