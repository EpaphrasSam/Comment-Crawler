"use client";

import { Card } from "../shared/Card";
import { Button } from "@nextui-org/react";
import { MessageSquare, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  section?: string;
  publishDate: string;
  commentCount: number;
  thumbnail: string;
}

interface ArticleCardProps {
  article: Article;
  onAnalyze?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  isLoading?: boolean;
}

export const ArticleCard = ({
  article,
  onAnalyze = () => {},
  isSelected = false,
  onSelect,
  isLoading = false,
}: ArticleCardProps) => {
  return (
    <Card className={`${isSelected ? "border-primary-500" : ""}`}>
      <div className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
          {article.section && (
            <div className="absolute top-2 right-2">
              <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs rounded-full px-2 py-1">
                {article.section}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 p-4">
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h3>
          <div className="flex items-center justify-between text-sm text-default-600">
            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{article.commentCount} comments</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-4 pt-0">
          <Button
            as={Link}
            href={`/articles/${article.id}`}
            color="primary"
            className="flex-1 text-background dark:text-white"
            endContent={<MessageSquare className="h-4 w-4" />}
            onClick={onAnalyze}
            isLoading={isLoading}
          >
            Analyze Comments
          </Button>
          <Button
            as="a"
            href={article.url}
            target="_blank"
            variant="flat"
            isIconOnly
            className="text-default-600"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
