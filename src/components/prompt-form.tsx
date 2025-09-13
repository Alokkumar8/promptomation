"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isAnimating: boolean;
}

export default function PromptForm({ onSubmit, isAnimating }: PromptFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.prompt);
  }

  return (
    <Card className={`shadow-2xl shadow-primary/10 border-primary/20 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 -z-10">
            <div className={`absolute inset-0 border-2 border-primary/20 rounded-lg ${isAnimating ? 'animate-expand-left' : ''}`} />
            <div className={`absolute inset-0 border-2 border-primary/20 rounded-lg ${isAnimating ? 'animate-expand-right' : ''}`} />
        </div>

      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 inline-block">
            <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl sm:text-4xl">Promptomation</CardTitle>
        <CardDescription className="text-base">
          Describe the browser task you want to automate in plain English.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Go to gmail.com, log in with my credentials, and delete all emails from promotions.'"
                      className="min-h-[120px] resize-none text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-lg py-6" size="lg" variant="default" disabled={isAnimating}>
              <Rocket className="mr-2 h-5 w-5" />
              {isAnimating ? 'Creating...' : 'Create Agent'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
