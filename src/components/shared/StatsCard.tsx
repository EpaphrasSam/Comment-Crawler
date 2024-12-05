"use client";

import { Card } from "./Card";
import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  description?: string;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  icon,
  trend,
  description,
  className = "",
}: StatsCardProps) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between p-4">
        <div>
          <p className="text-sm text-default-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-default-500">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {description && (
            <p className="mt-1 text-sm text-default-600">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`flex items-center text-sm font-medium ${
                  trend.isUpward ? "text-success" : "text-danger"
                }`}
              >
                {trend.isUpward ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                {trend.value}%
              </span>
              <span className="text-sm text-default-500">vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2 text-primary dark:bg-primary/20">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
