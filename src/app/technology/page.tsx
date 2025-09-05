
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Cpu, GitBranch, Puzzle, Sparkles, Upload } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { CodeBlock } from '@/components/code-block';

const exampleFlow = `
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CustomToolInput = z.object({
  propertyId: z.string().describe("The ID of the property."),
});

const CustomToolOutput = z.object({
  summary: z.string().describe("A summary of the property."),
});

export const myCustomFlow = ai.defineFlow(
  {
    name: 'myCustomFlow',
    inputSchema: CustomToolInput,
    outputSchema: CustomToolOutput,
  },
  async (input) => {
    // 1. Fetch data from your internal API
    const propertyData = await getPropertyFromDatabase(input.propertyId);

    // 2. Call another AI model for analysis
    const { output } = await ai.generate({
        prompt: \`Summarize this property: \${JSON.stringify(propertyData)}\`,
    });

    // 3. Return the structured output
    return { summary: output!.text! };
  }
);
`.trim();


export default function TechnologyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader 
            icon={<BrainCircuit className="h-8 w-8" />}
            title="The Super Seller AI Agent"
            description="More than a chatbot. An extensible, trainable co-pilot for your business."
        />

        <section className='mt-16 space-y-16'>

            <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader>
                    <CardTitle className="text-2xl">The Core Philosophy: A Trainable Agent</CardTitle>
                    <p className="text-foreground/70">
                        Generic AI assistants are public utilities. The Super Seller Agent is a private, specialized partner. Its power comes from its ability to be trained on *your* data, giving it deep, contextual knowledge that no public model can match. This transforms it from a simple tool into a true competitive advantage.
                    </p>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                        <div className="p-3 bg-primary/10 text-primary rounded-full mb-3"><Upload className="h-6 w-6"/></div>
                        <h3 className="font-semibold">Knowledge Ingestion</h3>
                        <p className="text-sm text-muted-foreground">Upload your brochures, market reports, and client lists. The agent learns from this private data pool.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                        <div className="p-3 bg-primary/10 text-primary rounded-full mb-3"><Cpu className="h-6 w-6"/></div>
                        <h3 className="font-semibold">Contextual Reasoning</h3>
                        <p className="text-sm text-muted-foreground">The agent uses your private data to inform its responses, providing insights and executing tasks with high relevance.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                        <div className="p-3 bg-primary/10 text-primary rounded-full mb-3"><Puzzle className="h-6 w-6"/></div>
                        <h3 className="font-semibold">Tool Integration</h3>
                        <p className="text-sm text-muted-foreground">The agent can use any tool in the suite, allowing it to perform multi-step, complex tasks on your command.</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader>
                    <CardTitle className="text-2xl">Onboarding: The First Training Session</CardTitle>
                    <p className="text-foreground/70">
                        The agent's training begins the moment a user starts onboarding. By asking for key developers and confirming market relevance, the agent builds its initial understanding of the user's business focus. This data immediately personalizes the project library and tool suggestions.
                    </p>
                </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader>
                    <CardTitle className="text-2xl">For Developers: Extending The Agent</CardTitle>
                    <p className="text-foreground/70">
                       The Super Seller Agent is built on Genkit, Google's open-source AI framework. This makes it highly extensible. Developers can create custom flows and tools to integrate the agent with their own proprietary databases, internal APIs, or specialized workflows.
                    </p>
                </CardHeader>
                 <CardContent>
                    <h3 className="font-semibold text-lg mb-2">Example: A Custom Flow</h3>
                    <p className="text-muted-foreground mb-4">
                        Imagine you have your own internal property database. You can create a custom flow that allows the agent to query it directly.
                    </p>
                    <CodeBlock>{exampleFlow}</CodeBlock>
                     <p className="text-muted-foreground mt-4">
                        By defining a custom flow like this, you could then command your assistant: "Give me a summary for property ID 12345." The agent would execute your custom code, talk to your database, and deliver the result seamlessly within the chat interface. This unlocks limitless potential for bespoke integrations.
                    </p>
                </CardContent>
            </Card>

        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
