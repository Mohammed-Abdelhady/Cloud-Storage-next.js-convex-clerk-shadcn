import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDebounce from "@/lib/hooks/use-debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

/**
 * Renders a search bar component that allows users to search for file names.
 *
 * @param {Object} props - The component props.
 * @param {string} props.query - The current search query.
 * @param {function} props.setQuery - The function to update the search query.
 * @return {JSX.Element} The rendered search bar component.
 */
export function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const submitButtonRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  const debouncedSearchTerm = useDebounce<string>(form.watch("query"), 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      submitButtonRef?.current?.click();
    }
  }, [debouncedSearchTerm]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="search..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="hidden gap-1"
            ref={submitButtonRef}
          >
            {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
