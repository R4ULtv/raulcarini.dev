import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { createElement } from "react";

import { Tweet, type TweetProps } from "react-tweet";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/copy-button";

import { codeToHtml } from "shiki";

export function slugify(str: React.ReactElement) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactElement }) => {
    const slug = slugify(children);
    return createElement(`h${level}`, { id: slug }, children);
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const TwitterBadge = ({ username }: { username: string }) => {
  return (
    <Badge variant="secondary" className="not-prose" asChild>
      <a
        href={"https://x.com/" + username}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          unoptimized
          width={14}
          height={14}
          alt={"profile image " + username}
          src={"https://unavatar.io/x/" + username}
          className="rounded-full"
        />
        {username}
      </a>
    </Badge>
  );
};

function CustomLink(props: React.ComponentProps<"a">) {
  const href = props.href || "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function CustomTweet(props: TweetProps) {
  const components = {
    AvatarImg: ({ alt, ...props }: ImageProps) => (
      <Image unoptimized alt={alt} {...props} className="my-0" />
    ),
    MediaImg: ({ alt, ...props }: ImageProps) => (
      <Image unoptimized alt={alt} {...props} fill className="my-0" />
    ),
  };

  return (
    <div className="flex justify-center">
      <Tweet {...props} components={components} />
    </div>
  );
}
async function CodeBlock(props: React.ComponentProps<"pre">) {
  const codeElement = props.children as React.ReactElement<{
    children: string;
    className: string;
  }>;

  const codeContent = codeElement.props.children.trim();
  const language = codeElement.props.className.replace("language-", "");

  const html = await codeToHtml(codeContent, {
    lang: language,
    themes: { dark: "vitesse-dark", light: "vitesse-light" },
  });

  return (
    <div className="relative not-prose text-sm mt-6 [&_pre]:py-3 [&_pre]:px-4 [&_pre]:rounded-md [&_pre]:min-h-12 [&_pre]:overflow-auto">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton
        text={codeContent}
        className="absolute top-2 right-2 opacity-50 hover:opacity-90 transition-opacity duration-150 ease-out"
      />
    </div>
  );
}

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  a: CustomLink,
  pre: CodeBlock,
  Image,
  TwitterBadge,
  YouTubeEmbed: (props) => (
    <div className="rounded-md w-full aspect-video overflow-hidden my-8">
      <YouTubeEmbed {...props} />
    </div>
  ),
  Tweet: CustomTweet,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
