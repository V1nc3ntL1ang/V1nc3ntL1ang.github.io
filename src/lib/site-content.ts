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

type Project = {
  slug: string;
  title: string;
  year: string;
  status: string;
  featured: boolean;
  hidden?: boolean;
  tags: string[];
  summary: string;
  note: string;
};

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects", hidden: true },
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
    title: "Multi-agent systems",
    description:
      "I am interested in systems where multiple agents coordinate, specialize, and interact to solve tasks that exceed the capacity of a single model.",
  },
  {
    eyebrow: "02",
    title: "Open-ended learning",
    description:
      "I care about open-ended learning mechanisms, especially self-play, co-evolution, and self-evolution, through which agents improve by interacting with one another and generating new behaviors over time.",
  },
  {
    eyebrow: "03",
    title: "Multimodal language model systems",
    description:
      "I am interested in multimodal language model systems that can reason more effectively and reliably across text, vision, and audio.",
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

export const projects: Project[] = [
  {
    slug: "agent-lab",
    title: "Agent Lab Notes",
    year: "2026",
    status: "Selected",
    featured: true,
    hidden: false,
    tags: ["Agents", "Research", "Prototype"],
    summary:
      "A placeholder for your most representative project or research thread. This card is here so the page structure starts strong before the real content is finalized.",
    note: "Editable sample",
  },
  {
    slug: "scheduler-sandbox",
    title: "Scheduler Sandbox",
    year: "2026",
    status: "Draft",
    featured: true,
    hidden: false,
    tags: ["RL", "Optimization", "Systems"],
    summary:
      "A second project slot for experiments around resource allocation, planning, or adaptive scheduling. The tone is technical but still readable to a broad audience.",
    note: "Good for system work",
  },
  {
    slug: "personal-site-system",
    title: "Personal Site System",
    year: "2026",
    status: "Live prototype",
    featured: true,
    hidden: false,
    tags: ["Design", "Next.js", "Content"],
    summary:
      "The site itself can become a project entry: a reusable personal publishing system that lets you hide sections, grow pages, and keep the visual language coherent.",
    note: "Can stay public",
  },
  {
    slug: "future-hidden-slot",
    title: "Future Hidden Slot",
    year: "2026",
    status: "Hidden",
    featured: false,
    hidden: true,
    tags: ["Hidden"],
    summary:
      "This item will not render because hidden is true. It is here to prove the content model already supports draft entries.",
    note: "Hidden example",
  },
];
