// ============================================================
//  EDIT ME — All site content lives here.
//  Swap these placeholders for your real details.
// ============================================================
import portraitImg from "./assets/illi-pic.jpg";

export const site = {
  name: "Iliasu Abubakar",
  initials: "IA",
  role: "DevOps & Platform Engineer",
  // shown in hero, one word each line looks best
  headline: ["I build", "& ship", "reliable systems."],
  location: "Accra, GH",
  availability: "Open to work, 2026",
  email: "nabbiilliasu@gmail.com",
  phone: "+233 59 507 0975",
  resumeUrl:
    "https://drive.google.com/file/d/1IajsCkMassMciJ9B3k21LB9Jj037QksJ/view?usp=drive_link",
};

// ---- Hero (russellnumo-style marquee + portrait reveal) ----
export const hero = {
  // each string becomes one giant scrolling marquee row
  roles: [
    "DevOps Engineer",
    "Platform Engineer",
    "Site Reliability",
    "Backend Engineer",
  ],
  // swap for your own photo — drop a file in /public and point here.
  // a grayscale portrait with a light top / dark bottom reads best under the
  // difference blend (text turns white over dark areas, dark over light).
  portrait: portraitImg,
  city: "Accra",
};

// The boot / deploy loader sequence — rendered as a Jenkins-style pipeline
// stage view. Each stage gets a short log line and a fake duration.
export const deploySteps = [
  { stage: "Checkout", cmd: "git clone origin/portfolio.git", ok: "cloned 1,284 objects", time: "2s" },
  { stage: "Provision", cmd: "terraform apply -auto-approve", ok: "infrastructure provisioned", time: "6s" },
  { stage: "Build", cmd: "docker build -t portfolio:latest .", ok: "image built · 42.6MB", time: "14s" },
  { stage: "Test", cmd: "running integration tests", ok: "128 passed · 0 failed", time: "9s" },
  { stage: "Deploy", cmd: "kubectl rollout status deploy/web", ok: "3/3 replicas ready", time: "5s" },
  { stage: "Release", cmd: "deploy → production", ok: "live", time: "1s" },
];

export const about = {
  eyebrow: "About",
  // Big statement — keep it punchy.
  statement:
    "I write secure backend code, automate infrastructure as code, and streamline deployment pipelines, bridging the gap between software development and IT operations.",
  // the huge poster-style statement — segments alternate plain / emphasized
  // so the JSX can style them differently without parsing a string.
  statementParts: [
    { text: "I bridge the gap between system administration, secure backend development, and scalable cloud infrastructure. Simple philosophy: " },
    { text: "automate everything, secure every layer,", em: true },
    { text: " and " },
    { text: "get things done.", em: true },
  ],
  paragraphs: [
    "I'm a software and DevOps engineer with 3 years of experience across backend development and platform engineering. I care about fast feedback loops, zero-downtime releases, and infrastructure you can read like a book.",
    "Whether it's migrating environments onto spot instances to cut cost, building AI-powered tools that debug Kubernetes clusters, or hardening servers to CIS benchmarks, I turn operational chaos into calm, measurable systems.",
  ],
  stats: [
    { value: "3 yrs", label: "Experience" },
    { value: "51%", label: "Compute cost cut" },
    { value: "5", label: "AWS/K8s/MS certs" },
    { value: "4", label: "Services supported" },
  ],
};

// Grouped skills — the "stack".
export const skills = [
  {
    group: "Languages & Frameworks",
    items: ["Go", "Python (FastAPI)", "JavaScript", "SQL"],
  },
  {
    group: "Cloud",
    items: ["AWS", "Azure"],
  },
  {
    group: "DevOps & CI/CD",
    items: ["Terraform", "Docker", "Jenkins", "GitHub Actions"],
  },
  {
    group: "Containerization",
    items: ["Docker", "Kubernetes"],
  },
  {
    group: "Monitoring",
    items: ["Prometheus", "Grafana", "ELK"],
  },
  {
    group: "Machine Learning",
    items: ["NLP", "Sentiment Analysis", "Predictive Modelling"],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "Linux"],
  },
];

// Featured work / case studies.
export const projects = [
  {
    index: "01",
    title: "AI-Powered DevOps Assistant",
    year: "2025",
    tags: ["Python", "FastAPI", "LLM + Retrieval", "Kubernetes"],
    blurb:
      "Built a model that answers natural-language questions about a Kubernetes cluster, covering workload state, resource usage, and why a deployment failed, grounded in live cluster data and deployed alongside the cluster for the engineering team.",
    link: "#",
  },
  {
    index: "02",
    title: "ShopNow: ECS and EKS Resilience Testing",
    year: "2025",
    tags: ["AWS ECS", "AWS EKS", "Chaos Testing"],
    blurb:
      "Deployed an e-commerce application to both Amazon ECS and EKS to compare failure behavior, running controlled scenarios like task/pod termination, node drain, and AZ loss to measure recovery time and error rate.",
    link: "#",
  },
  {
    index: "03",
    title: "Server Hardening: CIS Level 1",
    year: "2024",
    tags: ["AWS EC2", "Ubuntu", "Security"],
    blurb:
      "Hardened a fresh Ubuntu 24.04 instance to CIS Level 1, with key-only SSH, default-deny UFW, Fail2ban, and 19 custom auditd rules for kernel-level logging, documented as a step-by-step runbook with an automating shell script.",
    link: "#",
  },
  {
    index: "04",
    title: "VisionCore: AI Item-Recognition Backend",
    year: "2024",
    tags: ["FastAPI", "Claude Vision API", "AWS S3", "Supabase"],
    blurb:
      "Built a point-of-sale backend that takes a product image and returns structured item details via the Claude Vision API, secured with service-to-service auth, per-IP rate limiting, and an LRU cache to avoid redundant calls.",
    link: "#",
  },
];

// Career timeline — for the pinned journey section (company name as the
// big heading, role + period underneath, photo, note).
export const experience = [
  {
    role: "DevOps & Platform Engineer",
    org: "AmaliTech Ghana Ltd",
    period: "2025 to Present",
    note: "Migrated staging onto spot instances (-51% compute cost), built an AI infra assistant for the Kubernetes cluster, and secured CI/CD pipelines with SAST scans.",
  },
  {
    role: "Backend & DevOps Engineer",
    org: "BitByte Solutions Ltd",
    period: "2023 to 2026",
    note: "Built and maintained CI/CD pipelines and REST APIs in Go and Python (FastAPI); built an internal RAG assistant that cut onboarding time for new engineers.",
  },
  {
    role: "Undergraduate Researcher",
    org: "Dept. of Information Technology, UCC",
    period: "2025",
    note: "Built an NLP framework in Python for automated review analysis, covering preprocessing, feature extraction, and sentiment classification.",
  },
];

export const socials = [
  { label: "GitHub", url: "https://github.com/nabbi007" },
  { label: "LinkedIn", url: "https://linkedin.com/in/illiasu-abubakar" },
];
