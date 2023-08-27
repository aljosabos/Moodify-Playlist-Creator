# Install Project 

- Run <b>npm install</b> 
- Start the app with <b>npm run dev</b>.
- Open http://localhost:5173/

# Moodify Playlist Creator

Playlists
- The user can switch between different playlists by clicking on the Mood buttons below the player, next to 'Pick your mood'
- The track can be played with a double click.

Favourite playlist 
- The user can add songs to the list of favorites by clicking on the 'Add to Favorites' button on every track.
- Tracks can be removed from 'Favorites' by clicking on the 'Remove' button.

Emojis
- The user can change the playlist emoji by first choosing the playlist and then clicking on the emoji in the player which opens the emoji picker.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
