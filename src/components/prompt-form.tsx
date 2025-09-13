"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className={`bg-white/5 border-white/20 backdrop-blur-md shadow-2xl shadow-primary/10 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Go to gmail.com, log in with my credentials, and delete all emails from promotions.'"
                      className="min-h-[120px] resize-none text-base bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
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
