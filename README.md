# Yusra Azeem | Portfolio

A fast, static portfolio site (plain HTML, CSS and JavaScript). No build step and no dependencies.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploy on GitHub Pages

1. Create a new GitHub repository and push this folder to the `main` branch.
2. In the repo, go to Settings > Pages and set Source to **GitHub Actions**.
3. Push any change. The included workflow publishes the site at `https://<your-username>.github.io/<repo-name>/`.

Tip: name the repo `<your-username>.github.io` to get the shorter URL `https://<your-username>.github.io/`.

## Deploy on Vercel or Netlify

Import the GitHub repo and deploy with the default settings. No build command and no output directory are needed.

## Things to edit

- Links to your live demos, repos, LeetCode and certificates are in `index.html`. Search for `href=` to change them.
- Text, skills and projects live in `index.html`. Colors are the variables at the top of `css/style.css`.
- Replace `assets/Yusra_Azeem_Resume.pdf` whenever you update your resume (keep the same file name).
