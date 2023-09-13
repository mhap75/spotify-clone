"use client";
import { Input } from "@/components";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (debouncedValue !== "") {
      const query = {
        title: debouncedValue,
      };
      const url = qs.stringifyUrl({
        url: "/search",
        query,
      });
      router.push(url);
    } else {
      router.push("/search");
    }
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="Song title or author"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
};
export default SearchInput;
