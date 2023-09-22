## Hosted on Vercel
[Link to app](https://blog-frontend-ts.vercel.app)

## Next.JS , React and Tailwind CSS
In this iteration of the project, I have learnt more about the framework and the libraries, and a bit more about the general good practices. I have separated the pages into components and separated the API logic in the app/api folder according to the nextjs convention.

### Context Provider
-  I have used the context provider to store the user state which is fetched from localstorage and is updated when the user logs in or logs out.
- The accessToken is stored in a cookie and is sent with the headers to the API for protected routes.
- The only problem I'm facing is modifying the caching behaviour. _Sometimes after a Update or Delete method, the user might still need to refresh the page to see the updated data_.

## Improvements
- All of the routes are protected
- The UI is cleaner and better looking
- Form validation is implemented and is better than the previous iteration
- Code is more modular and easier to read
- The app is nicely divided into server and client components, with the client components being on the leaves of the component tree

