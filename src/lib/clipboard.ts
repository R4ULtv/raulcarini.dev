type ClipboardWriter = {
  writeText(text: string): Promise<void>;
};

export type ClipboardDocument = Pick<Document, "activeElement" | "body"> & {
  createElement(tagName: "input"): HTMLInputElement;
  execCommand(command: "copy"): boolean;
};

export async function copyText(
  text: string,
  clipboard: ClipboardWriter | undefined,
  document: ClipboardDocument,
): Promise<boolean> {
  if (clipboard) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Fall back for denied or unavailable Clipboard API access.
    }
  }

  const previouslyFocused = document.activeElement;
  let input: HTMLInputElement | undefined;

  try {
    input = document.createElement("input");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    input?.remove();
    (previouslyFocused as HTMLElement | null)?.focus?.();
  }
}

type StatusElement = {
  textContent: string | null;
};

export type CopyFeedbackButton = {
  dataset: Record<string, string | undefined>;
  querySelector(selector: string): StatusElement | null;
  setAttribute(name: string, value: string): void;
};

const defaultLabel = "Share this post";

export function setCopyFeedback(button: CopyFeedbackButton, copied: boolean): void {
  const label = copied ? "Short link copied" : "Copy failed";

  if (copied) {
    button.dataset.copied = "true";
    delete button.dataset.copyFailed;
  } else {
    delete button.dataset.copied;
    button.dataset.copyFailed = "true";
  }

  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);

  const status = button.querySelector("[data-share-status]");
  if (status) status.textContent = label;
}

export function resetCopyFeedback(button: CopyFeedbackButton): void {
  delete button.dataset.copied;
  delete button.dataset.copyFailed;
  button.setAttribute("aria-label", defaultLabel);
  button.setAttribute("title", defaultLabel);

  const status = button.querySelector("[data-share-status]");
  if (status) status.textContent = "";
}
