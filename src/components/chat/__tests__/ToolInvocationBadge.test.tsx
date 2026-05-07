import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";
import type { ToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

// str_replace_editor — command labels

test("shows 'Creating <filename>' for str_replace_editor create command", () => {
  const tool: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "create", path: "src/components/Card.tsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Creating Card.tsx")).toBeDefined();
});

test("shows 'Editing <filename>' for str_replace_editor str_replace command", () => {
  const tool: ToolInvocation = {
    toolCallId: "2",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "str_replace", path: "src/components/Button.tsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Editing Button.tsx")).toBeDefined();
});

test("shows 'Editing <filename>' for str_replace_editor insert command", () => {
  const tool: ToolInvocation = {
    toolCallId: "3",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "insert", path: "src/App.jsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("shows 'Reading <filename>' for str_replace_editor view command", () => {
  const tool: ToolInvocation = {
    toolCallId: "4",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "view", path: "src/index.ts" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Reading index.ts")).toBeDefined();
});

test("shows 'Reverting <filename>' for str_replace_editor undo_edit command", () => {
  const tool: ToolInvocation = {
    toolCallId: "5",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "undo_edit", path: "src/utils.ts" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Reverting utils.ts")).toBeDefined();
});

// file_manager — command labels

test("shows 'Renaming <filename>' for file_manager rename command", () => {
  const tool: ToolInvocation = {
    toolCallId: "6",
    toolName: "file_manager",
    state: "call",
    args: { command: "rename", path: "src/OldName.tsx", new_path: "src/NewName.tsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Renaming OldName.tsx")).toBeDefined();
});

test("shows 'Deleting <filename>' for file_manager delete command", () => {
  const tool: ToolInvocation = {
    toolCallId: "7",
    toolName: "file_manager",
    state: "call",
    args: { command: "delete", path: "src/Unused.tsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Deleting Unused.tsx")).toBeDefined();
});

// Fallbacks

test("falls back to tool name for unknown tools", () => {
  const tool: ToolInvocation = {
    toolCallId: "8",
    toolName: "unknown_tool",
    state: "call",
    args: {},
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("falls back gracefully when path is missing", () => {
  const tool: ToolInvocation = {
    toolCallId: "9",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "create" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Creating file")).toBeDefined();
});

test("uses only the filename, not the full path", () => {
  const tool: ToolInvocation = {
    toolCallId: "10",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "create", path: "deeply/nested/dir/Component.tsx" },
  };
  render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(screen.getByText("Creating Component.tsx")).toBeDefined();
});

// State — spinner vs green dot

test("shows spinner when state is 'call'", () => {
  const tool: ToolInvocation = {
    toolCallId: "11",
    toolName: "str_replace_editor",
    state: "call",
    args: { command: "create", path: "App.jsx" },
  };
  const { container } = render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows green dot when state is 'result'", () => {
  const tool: ToolInvocation = {
    toolCallId: "12",
    toolName: "str_replace_editor",
    state: "result",
    args: { command: "create", path: "App.jsx" },
    result: "Success",
  };
  const { container } = render(<ToolInvocationBadge toolInvocation={tool} />);
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});
