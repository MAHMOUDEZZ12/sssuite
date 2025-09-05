
# Super Seller Suite: Your AI-Powered Real Estate Co-Pilot

Welcome to the Super Seller Suite, a generative AI-powered application designed to be the ultimate co-pilot for real estate professionals. This platform is built to streamline workflows, automate content creation, and provide intelligent insights, empowering agents to close more deals with less manual effort.

From instant ad creation to hyper-local market reports and 24/7 AI-powered lead management, the Super Seller Suite is more than a set of tools—it's an integrated system designed to amplify a salesperson's capabilities.

## Key Features

- **Instant Content Generation**: Create high-performance ads, social media posts, landing pages, and video scripts from simple inputs like a property brochure or a topic.
- **Automated Rebranding**: Instantly apply your personal or company branding (logo, colors, contact info) to any marketing material in a single click.
- **Precision Targeting**: Move beyond basic demographics. Our AI analyzes market data to identify high-intent buyer personas for your ad campaigns.
- **AI PDF Editor**: Make changes to any PDF brochure—swap images, edit text, update layouts—using simple, natural language commands.
- **Investor Matching**: Upload a property and a client list, and let the AI find the perfect investor matches based on their past behavior and stated goals.
- **Trainable AI Assistant**: The core of the suite is a central AI you can train. Feed it your documents, brochures, and market reports to create a personalized assistant with deep knowledge of your business.

## Technology Stack

The Super Seller Suite is built on a modern, robust, and scalable technology stack chosen for performance and reliability.

- **Framework**: [Next.js](https://nextjs.org/) with the App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Framework**: [Genkit](https://firebase.google.com/docs/genkit) (from Google)
- **AI Models**: Google Gemini & Imagen
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Firebase App Hosting

## Getting Started

To run the application locally:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    For the AI services to function, you need to provide a Google AI API key.
    - Create a file named `.env.local` in the root of the project.
    - Add the following line to it:
      ```
      GEMINI_API_KEY=your_google_ai_api_key
      ```
    - You can obtain a `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/app/apikey).


3.  **Run the Development Server**:
    The application runs on `http://localhost:9002`.
    ```bash
    npm run dev
    ```

4.  **Explore the App**:
    - The main landing page provides an overview of all the tools.
    - Navigate to `/dashboard` to see the main application interface.
    - Each tool can be found at `/dashboard/tool/[toolId]`.

## Deployment

This application is configured for deployment with **Firebase App Hosting**.

### Prerequisites

- You must have a Firebase project. If you don't have one, create one at the [Firebase Console](https://console.firebase.google.com/).
- You must have the Firebase CLI installed: `npm install -g firebase-tools`.

### Deployment Steps

1.  **Login to Firebase**:
    ```bash
    firebase login
    ```

2.  **Initialize App Hosting**:
    Run the following command from the root of your project directory and follow the prompts. Select the Firebase project you wish to deploy to.
    ```bash
    firebase init apphosting
    ```

3.  **Deploy the Application**:
    This command will build your Next.js application and deploy it to Firebase App Hosting.
    ```bash
    firebase deploy
    ```

The CLI will provide you with the URL of your deployed application upon completion.

---

This project was bootstrapped with Firebase Studio.
