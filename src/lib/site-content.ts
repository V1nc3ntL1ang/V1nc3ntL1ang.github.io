import { publicationsVisible } from "@/lib/publications";

type NavItem = {
  href: string;
  label: string;
  hidden?: boolean;
};

type Profile = {
  name: string;
  displayName: string;
  nickname: string;
  email: string;
  github: string;
};

type FocusArea = {
  eyebrow: string;
  title: string;
  description: string;
  hidden?: boolean;
};

type EducationEntry = {
  title: string;
  subtitle: string;
  period: string;
  location: string;
  description: string;
  href: string;
  media: {
    src: string;
    alt: string;
    position: string;
    overlayClassName: string;
  };
  hidden?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/publications",
    label: "Publications",
    hidden: !publicationsVisible,
  },
];

export const profile: Profile = {
  name: "Letian Liang",
  displayName: "Letian “Vincent” Liang",
  nickname: "Vincent",
  email: "ftv1nc3ntl1ang@mail.scut.edu.cn",
  github: "https://github.com/V1nc3ntL1ang",
};

export const focusAreas: FocusArea[] = [
  {
    eyebrow: "01",
    title: "Agentic AI",
    description:
      "I am interested in agentic AI systems where large language models plan, act, receive feedback, and iterate through interactions with environments to solve complex tasks beyond static prediction.",
  },
  {
    eyebrow: "02",
    title: "Recursive Self-Improvement",
    description:
      "I care about recursive self-improvement (RSI), where agents generate feedback from their own interactions, evaluate the outcomes of their actions, and use these signals to iteratively refine their reasoning, behavior, and capabilities over time.",
  },
  {
    eyebrow: "03",
    title: "Multimodal Large Language Models",
    description:
      "I am interested in multimodal large language models (MLLMs) that can integrate information and reason effectively and reliably across text, vision, and audio.",
  },
];

export const education: EducationEntry[] = [
  {
    title: "Shenzhen Middle School",
    subtitle: "High school",
    period: "2020-2023",
    location: "Shenzhen, China",
    description:
      "Met a bunch of brilliant people and had a genuinely memorable time there. It was a period I still look back on very fondly.",
    href: "https://www.shenzhong.net/",
    media: {
      src: "/education/cards/sms-campus-main.webp",
      alt: "Shenzhen Middle School campus",
      position: "50% 52%",
      overlayClassName:
        "bg-[linear-gradient(180deg,rgba(92,118,156,0.07),rgba(8,10,16,0.2))]",
    },
  },
  {
    title: "South China University of Technology",
    subtitle: "B.Eng. candidate in Data Science and Big Data Technology",
    period: "2023-Present",
    location: "Guangzhou, China",
    description:
      "My current academic base, where I am laying my academic foundation and shaping the direction I hope to pursue over time.",
    href: "https://www.scut.edu.cn/en/",
    media: {
      src: "/education/cards/scut-campus-main.webp",
      alt: "South China University of Technology Guangzhou International Campus",
      position: "50% 54%",
      overlayClassName:
        "bg-[linear-gradient(180deg,rgba(92,118,156,0.1),rgba(8,10,16,0.28))]",
    },
  },
  {
    title: "University of California, Berkeley",
    subtitle: "Berkeley Global Access Program",
    period: "Spring 2025",
    location: "Berkeley, CA",
    description:
      "Completed CS168 (Introduction to the Internet), CS186 (Introduction to Database Systems), and CS188 (Introduction to Artificial Intelligence) during the program.",
    href: "https://www.berkeley.edu/",
    media: {
      src: "/education/cards/berkeley-campus.webp",
      alt: "UC Berkeley campus",
      position: "50% 46%",
      overlayClassName:
        "bg-[linear-gradient(180deg,rgba(92,118,156,0.06),rgba(8,10,16,0.18))]",
    },
  },
];
