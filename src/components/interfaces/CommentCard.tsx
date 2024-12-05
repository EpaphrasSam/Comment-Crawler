"use client";

import { Card } from "../shared/Card";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Avatar } from "@nextui-org/react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

interface CommentCardProps {
  comment: Comment;
  className?: string;
}

export const CommentCard = ({ comment, className = "" }: CommentCardProps) => {
  return (
    <Card className={className}>
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar
            name={comment.author}
            size="sm"
            className="flex-shrink-0"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{comment.author}</p>
              <p className="text-sm text-default-500">
                {new Date(comment.timestamp).toLocaleDateString()}
              </p>
            </div>
            <p className="text-default-700 dark:text-default-300">{comment.content}</p>
            <div className="flex items-center gap-4 text-sm text-default-500">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{comment.replies} replies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
