"use client";

import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

function getFileName(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

function getLabel(toolInvocation: ToolInvocation): string {
  const args = toolInvocation.args as Record<string, unknown> | undefined;
  const command = args?.command as string | undefined;
  const path = args?.path as string | undefined;
  const fileName = path ? getFileName(path) : null;

  if (toolInvocation.toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return fileName ? `Creating ${fileName}` : "Creating file";
      case "str_replace":
      case "insert":
        return fileName ? `Editing ${fileName}` : "Editing file";
      case "view":
        return fileName ? `Reading ${fileName}` : "Reading file";
      case "undo_edit":
        return fileName ? `Reverting ${fileName}` : "Reverting file";
      default:
        return fileName ? `Processing ${fileName}` : "Processing file";
    }
  }

  if (toolInvocation.toolName === "file_manager") {
    switch (command) {
      case "rename":
        return fileName ? `Renaming ${fileName}` : "Renaming file";
      case "delete":
        return fileName ? `Deleting ${fileName}` : "Deleting file";
      default:
        return fileName ? `Processing ${fileName}` : "Processing file";
    }
  }

  return toolInvocation.toolName;
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const isDone = toolInvocation.state === "result";
  const label = getLabel(toolInvocation);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
