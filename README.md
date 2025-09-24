# InvestorEdge

## Project info

Welcome to InvestorEdge - your AI-powered investment platform that combines cutting-edge artificial intelligence with robust financial analysis tools to give you an edge in your investment decisions.

🌐 **Live Demo**: [InvestorEdge on Cloudflare](https://investor-edge.pages.dev)

## Key Features

- 📊 Real-time portfolio tracking and analysis
- 🤖 AI-powered investment recommendations
- 📰 Curated financial news feed
- 📈 Advanced charting and technical analysis tools
- 🔒 Secure authentication via Supabase
- 📱 Fully responsive design for all devices

## Deployment

This project is deployed on Cloudflare Pages, offering:
- Global CDN distribution
- Automatic HTTPS
- Instant cache invalidation
- Zero-downtime deployments
- Unlimited bandwidth

### Deployment Configuration
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18.x

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push your changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development Stack Details

### Frontend
- **Vite**: Lightning-fast build tool and development server
- **React 18**: Modern UI development with hooks and concurrent features
- **TypeScript**: Type-safe code development
- **shadcn/ui**: Beautiful and accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **TanStack Query**: Powerful data synchronization
- **Supabase Auth**: Secure authentication system

### Developer Experience
- Hot Module Replacement (HMR)
- ESLint + Prettier configuration
- Pre-commit hooks with Husky
- Type checking in development
- Automated deployments via GitHub Actions

## Deployment Options

While this project is currently deployed on Cloudflare Pages, it can also be deployed to other platforms:

### Cloudflare Pages (Current)
1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   ```
   Build command: npm run build
   Build output directory: dist
   ```
3. Deploy with automatic HTTPS and CDN benefits

### Alternative Platforms
- **Vercel**: Optimal for Next.js and React applications
- **Netlify**: Great for JAMstack applications
- **DigitalOcean**: Flexible cloud hosting
- **Heroku**: Platform-as-a-Service option

## Custom Domain Configuration

### With Cloudflare Pages
1. Go to your project in Cloudflare Pages
2. Navigate to Custom Domains
3. Add your domain and follow the DNS configuration steps
4. SSL is automatically configured

### With Other Providers
Follow the hosting provider's domain configuration instructions for custom domain setup.
