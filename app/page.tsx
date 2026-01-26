import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="Kanam Academy logo"
              width={28}
              height={28}
              priority
            />
            <CardTitle>Kanam Academy</CardTitle>
          </div>
          <CardDescription>
            A mobile-friendly lesson canvas for learning Python + AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/learn/demo">Start Lesson</Link>
          </Button>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This is a local MVP. No accounts, no database, no external APIs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
