'use client';

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CommentCard } from "@/components/interfaces/CommentCard";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Search, Filter } from "lucide-react";
import { faker } from "@faker-js/faker";
import { useState } from "react";

const generateMockComments = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    content: faker.lorem.paragraph(),
    timestamp: faker.date.recent().toISOString(),
    likes: faker.number.int({ min: 0, max: 100 }),
    replies: faker.number.int({ min: 0, max: 20 }),
  }));
};

const sortOptions = ["Most Recent", "Most Likes", "Most Replies", "Oldest"];
const filterOptions = ["All Comments", "Most Engaged", "Most Controversial", "Recent"];

export default function CommentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All Comments");
  const [sortBy, setSortBy] = useState("Most Recent");
  const comments = generateMockComments(20);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Comments</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="text-default-400" />}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Select
                placeholder="Filter"
                selectedKeys={[filter]}
                onChange={(e) => setFilter(e.target.value)}
                startContent={<Filter className="text-default-400" />}
                className="w-40"
              >
                {filterOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
              <Select
                placeholder="Sort by"
                selectedKeys={[sortBy]}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40"
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
