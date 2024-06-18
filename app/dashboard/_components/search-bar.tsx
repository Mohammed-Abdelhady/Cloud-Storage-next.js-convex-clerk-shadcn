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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

/**
 * Renders a search bar component with a form that allows users to input a search query.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchQuery - The current search query.
 * @param {function} props.setSearchQuery - A function to update the search query.
 * @return {JSX.Element} The rendered search bar component.
 */
export function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<{ query: string }>({
    defaultValues: {
      query: searchQuery,
    },
  });

  const onSubmit = async (values: { query: string }) => {
    setSearchQuery(values.query);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
      <FormControl>
        <FormItem>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => <Input placeholder="File names" {...field} />}
          />
        </FormItem>
      </FormControl>

      <Button size="sm" type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
        {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <SearchIcon />
        Search
      </Button>
    </form>
  );
}
