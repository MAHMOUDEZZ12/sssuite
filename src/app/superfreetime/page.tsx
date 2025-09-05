
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Key, Bomb, X, Search, Lightbulb, Briefcase, UserPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { cn } from '@/lib/utils';
import { Confetti } from '@/components/confetti';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const MAX_ATTEMPTS = 3;
const TIME_LIMIT_SECONDS = 180; // 3 minutes

const generateGridState = () => {
    const keyPosition = Math.floor(Math.random() * TOTAL_CELLS);
    const grid = Array(TOTAL_CELLS).fill(null).map((_, index) => ({
        id: index,
        hasKey: index === keyPosition,
        isClicked: false,
        icon: 'initial' as 'initial' | 'key' | 'bomb'
    }));

    let hint = '';
    const hintType = Math.floor(Math.random() * 4);
    if (hintType === 0) {
        hint = `You're on the right street. It's in one of the first three buildings on the left.`;
    } else if (hintType === 1) {
        hint = `You passed it. Turn back and check the houses on the odd-numbered side of the road.`;
    } else if (hintType === 2) {
        hint = `You are facing the office. Don't park. Next left after the 3rd board.`;
    } else {
        hint = `It's not in the main square. Check the alleyways on the south side.`;
    }

    return { grid, hint };
}

export default function SuperFreeTimePage() {
    const [gameState, setGameState] = useState(generateGridState());
    const [gameOver, setGameOver] = useState(false);
    const [foundKey, setFoundKey] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);

    useEffect(() => {
        if (gameOver || timeLeft <= 0) {
            if (timeLeft <= 0) {
                setGameOver(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver, timeLeft]);

    const handleCellClick = (id: number) => {
        if (gameOver) return;

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        const newGrid = [...gameState.grid];
        const cell = newGrid[id];
        cell.isClicked = true;

        if (cell.hasKey) {
            cell.icon = 'key';
            setFoundKey(true);
            setGameOver(true);
        } else {
            cell.icon = 'bomb';
            if (newAttempts >= MAX_ATTEMPTS) {
                setGameOver(true);
            }
        }
        
        setGameState(prev => ({ ...prev, grid: newGrid }));
    };

    const resetGame = () => {
        setGameState(generateGridState());
        setGameOver(false);
        setFoundKey(false);
        setAttempts(0);
        setTimeLeft(TIME_LIMIT_SECONDS);
    };

    const attemptsLeft = MAX_ATTEMPTS - attempts;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

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
                        You have {MAX_ATTEMPTS} chances to find the key using the hint below. Good luck!
                    </p>
                </div>

                <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="mb-4 text-center p-3 bg-muted/50 rounded-lg border flex items-center justify-center gap-3">
                           <Lightbulb className="h-5 w-5 text-primary" />
                           <p className="font-semibold text-foreground/80">{gameState.hint}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3 aspect-square">
                            {gameState.grid.map(cell => (
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
                         <div className="mt-4 text-center flex justify-around text-sm text-muted-foreground">
                            <p>Attempts left: {attemptsLeft > 0 ? attemptsLeft : 0}</p>
                            <p className='flex items-center gap-1'><Clock className="h-4 w-4" /> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center h-24">
                    {gameOver && (
                        <div className="animate-in fade-in space-y-4">
                            {foundKey ? (
                                <>
                                    <h2 className="text-3xl font-bold text-green-400">You found it in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}!</h2>
                                    <Button onClick={resetGame} size="lg">Play Again</Button>
                                </>
                            ) : (
                                <>
                                 <h2 className="text-3xl font-bold text-destructive">{timeLeft <= 0 ? "Time's up!" : "That was fun, let's get back to business."}</h2>
                                  <div className="flex items-center justify-center gap-4">
                                     <Button onClick={resetGame} size="lg" variant="outline">One More Game</Button>
                                     <Link href="/dashboard/leads">
                                        <Button size="lg"><UserPlus className="mr-2 h-4 w-4"/> One More Lead</Button>
                                     </Link>
                                  </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
