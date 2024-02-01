# TWS Prototype

Basic template to springboard projects. Very similar to the [Indie Stack](https://github.com/remix-run/indie-stack).

## Stack

-   [Remix](https://remix.run/docs)
-   [Tailwind](https://tailwindcss.com/)
-   [Prisma](https://www.prisma.io/docs)
-   [SQLite](https://www.sqlite.org/index.html)
-   [Draft UI](https://draft-ui.com/getting-started/installation)
    -   [React ARIA](https://github.com/adobe/react-spectrum/tree/main/packages/react-aria-components)
    -   [CVA](https://github.com/joe-bell/cva)
    -   [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
    -   [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)
    -   [Tailwind React ARIA components](https://github.com/adobe/react-spectrum/tree/main/packages/tailwindcss-react-aria-components)
-   [Conform](https://github.com/edmundhung/conform)
-   [Lucide icons](https://lucide.dev/)

## Local development

Install dependencies:

```sh
npm i
```

Change the `.env.example` filename to `.env`.  
Update initial user data (optional)

```sh
INITIAL_USER_EMAIL="user@mail.com"
INITIAL_USER_PASSWORD="banana"
```

Run the `seed` script:

```
npm run seed
```

Start the app:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

-   `build/`
-   `public/build/`

### Thank you

Big shout out to "Raj talks tech" for your [Remix + Supabase video](https://www.youtube.com/watch?v=ocWc_FFc5jE)
