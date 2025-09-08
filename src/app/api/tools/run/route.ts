
import { NextRequest, NextResponse } from 'next/server';
import { flowRunnerMap } from '@/lib/tool-registry';
import { z } from 'zod';

const runToolSchema = z.object({
  toolId: z.string(),
  payload: z.any(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = runToolSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.formErrors }, { status: 400 });
    }

    const { toolId, payload } = validation.data;

    const flowRunner = flowRunnerMap[toolId];

    if (!flowRunner) {
      return NextResponse.json({ error: `Tool with id "${toolId}" not found or has no flow runner.` }, { status: 404 });
    }

    const result = await flowRunner(payload);
    return NextResponse.json(result);
  } catch (e: any) {
    console.error(`Error running tool: ${e.message}`, e);
    // It's good practice to not expose raw error messages in production
    const errorMessage = e.message || 'An unexpected error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
