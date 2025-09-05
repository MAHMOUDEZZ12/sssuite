
'use client';

import React, { useState, useEffect } from 'react';
import { Key, Bomb, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { cn } from '@/lib/utils';
import { Confetti } from '@/components/confetti';
import { Card, CardContent } from '@/components/ui/card';

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const generateGrid = () => {
    const keyPosition = Math.floor(Math.random() * TOTAL_CELLS);
    const grid = Array(TOTAL_CELLS).fill(null).map((_, index) => ({
        id: index,
        hasKey: index === keyPosition,
        isClicked: false,
        icon: 'initial' as 'initial' | 'key' | 'bomb'
    }));
    return grid;
}

export default function SuperFreeTimePage() {
    const [grid, setGrid] = useState(generateGrid());
    const [gameOver, setGameOver] = useState(false);
    const [foundKey, setFoundKey] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleCellClick = (id: number) => {
        if (gameOver) return;

        setAttempts(prev => prev + 1);
        const newGrid = [...grid];
        const cell = newGrid[id];
        cell.isClicked = true;

        if (cell.hasKey) {
            cell.icon = 'key';
            setFoundKey(true);
            setGameOver(true);
        } else {
            cell.icon = 'bomb';
        }
        
        setGrid(newGrid);
    };

    const resetGame = () => {
        setGrid(generateGrid());
        setGameOver(false);
        setFoundKey(false);
        setAttempts(0);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {foundKey && <Confetti />}
            <LandingHeader />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center">
                <div className="text-center mb-12">
                    <div className="inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br from-primary to-accent">
                        <Key className="h-12 w-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                        Find The Key by Gemini
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                        A little game to brighten your day. Click the squares to find the hidden key!
                    </p>
                </div>

                <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-5 gap-3 aspect-square">
                            {grid.map(cell => (
                                <button
                                    key={cell.id}
                                    onClick={() => handleCellClick(cell.id)}
                                    disabled={cell.isClicked || gameOver}
                                    className={cn(
                                        "flex items-center justify-center rounded-lg border transition-all duration-300 aspect-square",
                                        "bg-muted/50 hover:bg-muted hover:border-primary/50",
                                        cell.isClicked && cell.hasKey && "bg-green-500/20 border-green-500",
                                        cell.isClicked && !cell.hasKey && "bg-destructive/20 border-destructive",
                                        gameOver && !cell.isClicked && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {cell.isClicked ? (
                                        cell.hasKey ? (
                                            <Key className="h-8 w-8 text-green-400 animate-in zoom-in" />
                                        ) : (
                                            <Bomb className="h-8 w-8 text-destructive animate-in zoom-in" />
                                        )
                                    ) : (
                                       <Search className="h-6 w-6 text-muted-foreground" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    {gameOver && (
                        <div className="animate-in fade-in space-y-4">
                            {foundKey ? (
                                <h2 className="text-3xl font-bold text-green-400">You found it in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}!</h2>
                            ) : (
                                <h2 className="text-3xl font-bold text-destructive">So close!</h2>
                            )}
                            <Button onClick={resetGame} size="lg">Play Again</Button>
                        </div>
                    )}
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
