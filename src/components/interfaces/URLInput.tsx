"use client";

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link2, Search } from "lucide-react";
import { Card } from "../shared/Card";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export const URLInput = ({ onSubmit, isLoading = false }: URLInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateURL = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname.includes("bbc.") &&
        parsedUrl.hostname.includes(".com")
      );
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      setError("Please enter a valid BBC News URL");
      return;
    }

    setError(null);
    onSubmit(url);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="Article URL"
            placeholder="Enter BBC News article URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            errorMessage={error}
            isInvalid={!!error}
            startContent={<Link2 className="text-secondary-400" size={20} />}
            className="flex-1"
          />
          <Button
            color="primary"
            startContent={<Search size={20} />}
            onClick={handleSubmit}
            isLoading={isLoading}
            className="sm:w-32 text-secondary-600"
          >
            Analyze
          </Button>
        </div>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          Enter a BBC News article URL to analyze its comments
        </p>
      </div>
    </Card>
  );
};
