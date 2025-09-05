
import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Cpu, Component, Wind, BrainCircuit } from 'lucide-react';
import { tools } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';

const technologies = [
  {
    name: 'Next.js',
    description: 'The application is built using the Next.js App Router for optimal performance, server-side rendering, and a modern React framework.',
    icon: <Component className="h-8 w-8" />,
  },
  {
    name: 'Tailwind CSS & ShadCN UI',
    description: 'Styling is handled by Tailwind CSS for utility-first design, with a component library built on top of ShadCN UI for a consistent and professional look and feel.',
    icon: <Wind className="h-8 w-8" />,
  },
  {
    name: 'Genkit & Google AI',
    description: 'All AI capabilities are powered by Genkit, an open-source framework from Google that simplifies building production-ready AI flows, integrated with Gemini models.',
    icon: <BrainCircuit className="h-8 w-8" />,
  },
];

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-800/50 text-white p-4 rounded-lg text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
);

const SchemaDisplay = ({ schema }: { schema: any }) => {
    const fields = Object.entries(schema.shape).map(([key, value]: [string, any]) => {
        let type = 'string';
        if (value.constructor.name.includes('ZodNumber')) type = 'number';
        if (value.constructor.name.includes('ZodArray')) type = 'array';
        if (value.constructor.name.includes('ZodObject')) type = 'object';
        if (value._def.typeName === 'ZodEffects') { // for refine, etc.
             if(value._def.schema._def.typeName === 'ZodCustom') type = 'file';
        }
       
        return `  ${key}: ${type}${value.isOptional() ? '?' : ''}; // ${value.description || ''}`;
    }).join('\n');

    return <CodeBlock>{`{\n${fields}\n}`}</CodeBlock>
};


export default function DocumentationPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Suite Documentation
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A technical overview of the technologies and AI flows that power the Super Seller Suite.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">{tech.icon}</div>
                  <CardTitle className="text-2xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">AI Flows</h2>
          <div className="space-y-12">
            {tools.filter(t => t.flowRunner).map((tool) => {
              const { inputSchema, outputSchema } = require(`@/ai/flows/${tool.id.replace(/-/g,'-')}.ts`);
              return (
              <Card key={tool.id} className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <GitBranch />
                    {tool.id.replace(/-/g,'-')}Flow
                  </CardTitle>
                  <p className="text-foreground/70 pt-2">{tool.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {inputSchema && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground/90">Input Schema</h3>
                        <SchemaDisplay schema={inputSchema} />
                    </div>
                  )}
                  {outputSchema && (
                     <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground/90">Output Schema</h3>
                        <SchemaDisplay schema={outputSchema} />
                    </div>
                  )}
                </CardContent>
              </Card>
            )})}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
