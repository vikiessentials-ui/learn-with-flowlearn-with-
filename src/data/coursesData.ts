import { Course, Module, Lesson, QuizQuestion } from '../types';
import { parseYouTubeUrl, CURATED_PLAYLIST_PRESETS } from '../utils/youtube';

/**
 * 1 MILLION COURSE CATALOG ENGINE
 * LEARN WITH FLOW - Founder & CEO Muhammad Talha
 * Enterprise Deterministic O(1) Virtual Catalog Architecture
 */

export const TOTAL_CATALOG_COURSES = 1_000_000;

// Helper to convert any YouTube link to clean embed format
export function formatVideoEmbedUrl(url: string): string {
  if (!url) return 'https://www.youtube-nocookie.com/embed/8aGhZQkoFbQ?rel=0&modestbranding=1&enablejsapi=1';
  const parsed = parseYouTubeUrl(url);
  if (parsed.isValid && parsed.embedUrl) {
    return parsed.embedUrl;
  }
  return url;
}

export const CATEGORIES = [
  'All Categories',
  'Web Development',
  'Artificial Intelligence & ML',
  'Cloud & DevOps',
  'Cybersecurity & Ethical Hacking',
  'Data Science & Analytics',
  'System Architecture & Backend',
  'Mobile App Development',
  'UI/UX & Design Systems'
] as const;

export type CategoryName = typeof CATEGORIES[number];

// Standard 5-Question Conceptual Logic Assessment Generator
export function generateStandardQuiz(topic: string): QuizQuestion[] {
  return [
    {
      id: 1,
      question: `In production engineering for ${topic}, what is the primary computational benefit of caching idempotent operations?`,
      options: [
        "It eliminates redundant database and network roundtrips, reducing P99 latency",
        "It recompiles the application binary into assembly",
        "It deletes unused database tables automatically",
        "It disables all security firewall rules"
      ],
      correctAnswer: 0,
      explanation: "Caching idempotent operations prevents repetitive CPU cycles and disk/network I/O, dramatically improving latency profiles."
    },
    {
      id: 2,
      question: `When designing resilient systems for ${topic}, why is implementing exponential backoff with jitter critical during failures?`,
      options: [
        "It prevents thundering herd problem by desynchronizing retry bursts",
        "It guarantees that server bandwidth is doubled",
        "It reduces code size during compilation",
        "It disables SSL certificate verification"
      ],
      correctAnswer: 0,
      explanation: "Exponential backoff combined with randomized jitter spreads out retry attempts across time, preventing cascading overload on recovering services."
    },
    {
      id: 3,
      question: `Which architectural pattern is best suited for decoupling producers and consumers in ${topic}?`,
      options: [
        "Asynchronous Event-Driven Messaging (Pub/Sub)",
        "Synchronous Blocking RPC calls in tight loops",
        "Direct shared global mutable state in RAM",
        "Writing uncompressed log files to local disk"
      ],
      correctAnswer: 0,
      explanation: "Event-driven architecture decouples components in time and space, providing horizontal scalability and fault isolation."
    },
    {
      id: 4,
      question: `Which data structure provides O(1) average-time complexity for key lookups in ${topic}?`,
      options: [
        "Hash Map / Hash Table",
        "Singly linked list traversed from head",
        "Nested matrix permutations with O(n!) complexity",
        "Unsorted flat arrays searched linearly"
      ],
      correctAnswer: 0,
      explanation: "Hash maps and hash-indexed sets provide O(1) constant-time average lookups, ideal for high-throughput systems."
    },
    {
      id: 5,
      question: `How should security and sensitive credentials be handled according to best practices in ${topic}?`,
      options: [
        "Encrypted environment variables and vault secret managers outside client bundles",
        "Hardcoding credentials directly into public frontend git repositories",
        "Printing secret API tokens to the browser developer console",
        "Sending credentials in plain HTTP query string parameters"
      ],
      correctAnswer: 0,
      explanation: "Secrets must always be stored in dedicated secret management systems (like Vault, KMS) and accessed via secure server environments."
    }
  ];
}

// Flagship Featured Hand-Crafted Courses (Courses #1 - #4)
export const INITIAL_FEATURED_COURSES: Course[] = [
  {
    id: 1,
    title: "Full-Stack Web Development Masterclass",
    category: "Web Development",
    level: "All Levels",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "Master modern web engineering from TypeScript and React to high-concurrency Node.js, distributed databases, and automated CI/CD pipelines.",
    instructor: "Muhammad Talha",
    instructorName: "Muhammad Talha",
    instructorRole: "Founder & CEO, LEARN WITH FLOW",
    rating: 4.9,
    studentsCount: 38420,
    estimatedHours: 48,
    featured: true,
    tags: ["React", "TypeScript", "Node.js", "Express", "REST APIs"],
    playlistUrl: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n",
    modules: [
      {
        id: "mod-101",
        title: "Module 1: Modern JavaScript & Async Logic",
        description: "Deep dive into JS runtime, memory management, event loop, and asynchronous programming patterns.",
        lessons: [
          {
            id: "les-101-1",
            title: "Lesson 1: JavaScript Engine, Call Stack & Event Loop",
            duration: "24 min",
            videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ",
            passed: false,
            quiz: [
              {
                id: 1,
                question: "What is the output of typeof NaN in JavaScript?",
                options: ["number", "NaN", "undefined", "object"],
                correctAnswer: 0,
                explanation: "In JavaScript, NaN ('Not-a-Number') is technically a numeric value according to the IEEE 754 floating-point standard, so typeof NaN returns 'number'."
              },
              {
                id: 2,
                question: "Which component of the JS runtime handles asynchronous task resolution before macro-tasks?",
                options: ["Microtask Queue (Job Queue)", "Macrotask Queue (Task Queue)", "Call Stack", "Heap Memory Allocator"],
                correctAnswer: 0,
                explanation: "The microtask queue (Promises, queueMicrotask) has priority execution and is emptied completely after each script execution before macrotasks (setTimeout) execute."
              },
              {
                id: 3,
                question: "How do you declare a block-scoped variable that cannot be re-assigned?",
                options: ["const", "let", "var", "immutable"],
                correctAnswer: 0,
                explanation: "const enforces both block-level scoping and prevents re-assignment to the identifier."
              },
              {
                id: 4,
                question: "What does the DOM stand for in modern browser architecture?",
                options: ["Document Object Model", "Data Object Mode", "Digital Ordinance Model", "Desktop Output Manager"],
                correctAnswer: 0,
                explanation: "DOM stands for Document Object Model, an object-oriented tree representation of the HTML document."
              },
              {
                id: 5,
                question: "Which HTTP method is idempotent and used to completely replace an existing resource?",
                options: ["POST", "PUT", "PATCH", "CONNECT"],
                correctAnswer: 1,
                explanation: "PUT is designed to be idempotent and replace target resource state completely, whereas PATCH is partial."
              }
            ]
          },
          {
            id: "les-101-2",
            title: "Lesson 2: Advanced Promises, Async/Await & Error Boundaries",
            duration: "28 min",
            videoUrl: "https://www.youtube.com/embed/vn3tm0quoqE",
            passed: false,
            quiz: [
              {
                id: 1,
                question: "What happens if an error is thrown inside an async function without a try/catch block?",
                options: ["It returns a rejected Promise", "It crashes the entire browser tab immediately", "It silently ignores the error", "It converts the return to undefined"],
                correctAnswer: 0,
                explanation: "Any uncaught exception within an async function automatically causes the returned Promise to be rejected with that exception."
              },
              {
                id: 2,
                question: "Which method runs multiple promises concurrently and resolves only when ALL promises fulfill?",
                options: ["Promise.all", "Promise.race", "Promise.any", "Promise.resolveAll"],
                correctAnswer: 0,
                explanation: "Promise.all waits for all promises to fulfill, and rejects immediately upon the first rejection encountered."
              },
              {
                id: 3,
                question: "What is the primary benefit of Promise.allSettled over Promise.all?",
                options: ["It never rejects even if some individual promises fail", "It runs synchronously", "It uses less memory", "It runs sequentially"],
                correctAnswer: 0,
                explanation: "Promise.allSettled waits for all inputs to either resolve or reject, returning an array of objects describing each result."
              },
              {
                id: 4,
                question: "In JavaScript closures, what does an inner function retain access to?",
                options: ["Variables in its outer lexical environment", "Only global variables", "Only parameters explicitly passed in", "DOM elements exclusively"],
                correctAnswer: 0,
                explanation: "A closure gives a function access to its outer lexical scope even after that outer function has finished executing."
              },
              {
                id: 5,
                question: "What is the time complexity of looking up a key in a JavaScript Map or Set?",
                options: ["O(1) average case", "O(n) linear case", "O(log n) logarithmic case", "O(n^2) quadratic case"],
                correctAnswer: 0,
                explanation: "JavaScript Maps and Sets are implemented with hash tables, providing O(1) average lookup and insertion time."
              }
            ]
          }
        ]
      },
      {
        id: "mod-102",
        title: "Module 2: Enterprise React Architecture & State Engineering",
        description: "Master React reconciliation, hooks lifecycle, server state caching, and high performance rendering.",
        lessons: [
          {
            id: "les-102-1",
            title: "Lesson 1: React 19 Compiler, Virtual DOM & Fiber Architecture",
            duration: "32 min",
            videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
            passed: false,
            quiz: [
              {
                id: 1,
                question: "Which React hook is used to handle side-effects like network requests or subscriptions?",
                options: ["useEffect", "useMemo", "useContext", "useCallback"],
                correctAnswer: 0,
                explanation: "useEffect is the designated hook in React for synchronizing with external systems and handling side effects."
              },
              {
                id: 2,
                question: "Why should you never mutate state directly in React (e.g., state.count = 5)?",
                options: ["React detects changes via shallow reference equality; direct mutation skips re-renders", "Direct mutation deletes the property from memory", "It throws a compile-time syntax error", "It disables browser cookies"],
                correctAnswer: 0,
                explanation: "React relies on referential identity comparisons (Object.is). Mutating existing state keeps the same memory pointer, preventing re-renders."
              },
              {
                id: 3,
                question: "What is the purpose of React Fiber architecture?",
                options: ["Incremental rendering and prioritizing high-priority UI updates", "Replacing JavaScript with WebAssembly", "Enforcing strict CSS styling", "Creating native mobile binaries"],
                correctAnswer: 0,
                explanation: "Fiber is React's reconciliation algorithm designed to enable incremental rendering and pause/resume work based on priority."
              },
              {
                id: 4,
                question: "When should the useMemo hook be utilized?",
                options: ["To cache the result of an expensive calculation between re-renders", "To trigger HTTP requests on button clicks", "To declare global styling variables", "To replace all useState declarations"],
                correctAnswer: 0,
                explanation: "useMemo is used to memoize expensive computations so they do not execute on every single re-render unless dependencies change."
              },
              {
                id: 5,
                question: "What is the key rule regarding Hook call order in React?",
                options: ["Hooks must be called at the top level, never inside loops, conditions, or nested functions", "Hooks can only be called in asynchronous callbacks", "Hooks must always be called inside setTimeout", "Hooks must have alphabetical names"],
                correctAnswer: 0,
                explanation: "React relies on the call order of Hooks between renders to maintain state references correctly."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Generative AI & LLM Systems Engineering",
    category: "Artificial Intelligence & ML",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    description: "Architect production Retrieval-Augmented Generation (RAG) pipelines, fine-tune open weights, and build autonomous multi-agent systems.",
    instructor: "Muhammad Talha",
    instructorName: "Muhammad Talha",
    instructorRole: "Founder & CEO, LEARN WITH FLOW",
    rating: 4.95,
    studentsCount: 29150,
    estimatedHours: 56,
    featured: true,
    tags: ["Gemini", "PyTorch", "LangChain", "Vector DBs", "RAG"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1",
    modules: [
      {
        id: "mod-201",
        title: "Module 1: Transformers, Embeddings & Vector Mathematics",
        description: "Self-attention mechanisms, tokenization strategies, and high-dimensional cosine similarity indexing.",
        lessons: [
          {
            id: "les-201-1",
            title: "Lesson 1: Self-Attention & Query-Key-Value Matrix Calculations",
            duration: "35 min",
            videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
            passed: false,
            quiz: [
              {
                id: 1,
                question: "In the transformer self-attention formula Attention(Q, K, V) = softmax((QK^T)/sqrt(d_k))V, why is the dot product scaled by sqrt(d_k)?",
                options: ["To prevent softmax gradients from becoming extremely small (vanishing) for large dimensions", "To invert the matrix", "To reduce the embedding dimension to 1", "To convert floating point to integers"],
                correctAnswer: 0,
                explanation: "For large dimensions, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients."
              },
              {
                id: 2,
                question: "What metric is most commonly used to measure semantic similarity between two embedding vectors?",
                options: ["Cosine Similarity", "Hamming Distance", "Euclidean Exponentiation", "Bitwise XOR"],
                correctAnswer: 0,
                explanation: "Cosine similarity calculates the cosine of the angle between two vectors, effectively measuring directional orientation independent of magnitude."
              },
              {
                id: 3,
                question: "Why do transformers require Positional Encodings added to input embeddings?",
                options: ["Because self-attention is permutation-invariant and has no inherent sense of sequence order", "To compress vocabulary size", "To encrypt tokens", "To generate rhymes"],
                correctAnswer: 0,
                explanation: "Standard attention operates on sets of tokens simultaneously without inherent order; positional encodings provide essential temporal/sequential context."
              },
              {
                id: 4,
                question: "In RAG (Retrieval-Augmented Generation), what is the role of a Vector Database?",
                options: ["To store and retrieve chunk embeddings via approximate nearest neighbor (ANN) search", "To train the base foundational model from scratch", "To render frontend web pages", "To run unit tests on Python scripts"],
                correctAnswer: 0,
                explanation: "Vector databases index document embeddings for rapid nearest-neighbor lookup to supply relevant context to the model prompt."
              },
              {
                id: 5,
                question: "What is 'Hallucination' in Large Language Models?",
                options: ["Generating factually incorrect or ungrounded assertions presented with high confidence", "An out-of-memory GPU error", "A malicious denial of service attack", "A type of prompt token compression"],
                correctAnswer: 0,
                explanation: "Hallucination refers to instances where generative models synthesize fabricated claims that appear syntactically and stylistically convincing."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Cloud Infrastructure & Kubernetes DevOps",
    category: "Cloud & DevOps",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    description: "Design resilient multi-cloud architectures, automate GitOps workflows, deploy Kubernetes clusters, and master infrastructure as code.",
    instructor: "Muhammad Talha",
    instructorName: "Muhammad Talha",
    instructorRole: "Founder & CEO, LEARN WITH FLOW",
    rating: 4.88,
    studentsCount: 22400,
    estimatedHours: 42,
    featured: true,
    tags: ["Kubernetes", "Docker", "Terraform", "CI/CD", "AWS"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG",
    modules: [
      {
        id: "mod-301",
        title: "Module 1: Containerization & Pod Orchestration",
        description: "Container runtime specs, namespaces, cgroups, Pod lifecycle, and Kubernetes service meshes.",
        lessons: [
          {
            id: "les-301-1",
            title: "Lesson 1: Docker Internals & Kubernetes Architecture",
            duration: "26 min",
            videoUrl: "https://www.youtube.com/embed/d6WC5n9G_sM",
            passed: false,
            quiz: generateStandardQuiz("Kubernetes & Docker Orchestration")
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Cybersecurity & Ethical Penetration Testing",
    category: "Cybersecurity & Ethical Hacking",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    description: "Hands-on penetration testing, threat modeling, reverse engineering, and defensive zero-trust architectural implementations.",
    instructor: "Muhammad Talha",
    instructorName: "Muhammad Talha",
    instructorRole: "Founder & CEO, LEARN WITH FLOW",
    rating: 4.92,
    studentsCount: 26800,
    estimatedHours: 46,
    featured: true,
    tags: ["Penetration Testing", "Ethical Hacking", "OWASP", "Zero Trust", "Wireshark"],
    playlistUrl: "https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz",
    modules: [
      {
        id: "mod-401",
        title: "Module 1: Threat Modeling & Defensive Security",
        description: "Vulnerability analysis, threat identification, and defensive security protocols.",
        lessons: [
          {
            id: "les-401-1",
            title: "Lesson 1: Network Reconnaissance & Threat Identification",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE",
            passed: false,
            quiz: generateStandardQuiz("Offensive Penetration Testing")
          }
        ]
      }
    ]
  }
];

// Rich Technical Domain Templates across all 8 major disciplines
interface CourseTemplate {
  title: string;
  category: typeof CATEGORIES[number];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  hours: number;
  tags: string[];
  sampleVideo: string;
  playlistId?: string;
}

export const TOPIC_TEMPLATES: CourseTemplate[] = [
  // 1. Web Development
  { title: "React 19 & Next.js 15 Full-Stack Architecture", category: "Web Development", level: "Intermediate", hours: 38, tags: ["React 19", "Next.js", "Server Components", "Tailwind"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Modern TypeScript 5 & Enterprise Type Systems", category: "Web Development", level: "Advanced", hours: 32, tags: ["TypeScript", "Generics", "Type Safety", "Utility Types"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "High-Performance Node.js & Bun Event Loops", category: "Web Development", level: "Advanced", hours: 35, tags: ["Node.js", "Bun", "Microservices", "Event Loop"], sampleVideo: "vn3tm0quoqE", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "GraphQL Federation & Distributed Apollo Gateways", category: "Web Development", level: "Intermediate", hours: 28, tags: ["GraphQL", "Apollo", "APIs", "Schema Stitching"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "WebAssembly & Rust High-Speed Web Modules", category: "Web Development", level: "Advanced", hours: 42, tags: ["WebAssembly", "WASM", "Rust", "High Performance"], sampleVideo: "d6WC5n9G_sM", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "WebRTC Peer-to-Peer Real-Time Collaboration", category: "Web Development", level: "Advanced", hours: 36, tags: ["WebRTC", "Sockets", "Streaming", "P2P"], sampleVideo: "3Kq1MIfTWCE", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Vue 3 Composition API & Nuxt 3 Production", category: "Web Development", level: "Intermediate", hours: 30, tags: ["Vue 3", "Nuxt", "Pinia", "Vite"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Svelte 5 Runes & SvelteKit Edge Deployment", category: "Web Development", level: "Beginner", hours: 26, tags: ["Svelte 5", "Runes", "SvelteKit", "Serverless"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },

  // 2. Artificial Intelligence & ML
  { title: "Deep Learning Foundations with PyTorch & CUDA", category: "Artificial Intelligence & ML", level: "Advanced", hours: 52, tags: ["PyTorch", "CUDA", "Tensors", "Backpropagation"], sampleVideo: "aircAruvnKk", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Transformers, Multi-Head Attention & Math", category: "Artificial Intelligence & ML", level: "Advanced", hours: 48, tags: ["Transformers", "Attention", "NLP", "Math"], sampleVideo: "aircAruvnKk", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Vector Databases, Embeddings & Production RAG", category: "Artificial Intelligence & ML", level: "Intermediate", hours: 38, tags: ["Vector DBs", "Pinecone", "Chroma", "RAG"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Autonomous AI Agents with LangGraph & CrewAI", category: "Artificial Intelligence & ML", level: "Advanced", hours: 44, tags: ["AI Agents", "LangChain", "Autonomous", "Tool Calling"], sampleVideo: "vn3tm0quoqE", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Computer Vision & YOLOv10 Object Detection", category: "Artificial Intelligence & ML", level: "Intermediate", hours: 36, tags: ["Computer Vision", "OpenCV", "YOLO", "Detection"], sampleVideo: "d6WC5n9G_sM", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Model Fine-Tuning with LoRA, QLoRA & PEFT", category: "Artificial Intelligence & ML", level: "Advanced", hours: 40, tags: ["Fine-Tuning", "LoRA", "HuggingFace", "Weights"], sampleVideo: "aircAruvnKk", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },
  { title: "Edge AI Deployment & ONNX TensorRT Optimization", category: "Artificial Intelligence & ML", level: "Advanced", hours: 35, tags: ["Edge AI", "TensorRT", "ONNX", "Inference"], sampleVideo: "dGcsHMXbSOA", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },

  // 3. Cloud & DevOps
  { title: "Kubernetes Production Cluster Architecture", category: "Cloud & DevOps", level: "Intermediate", hours: 42, tags: ["Kubernetes", "K8s", "Pods", "Ingress"], sampleVideo: "d6WC5n9G_sM", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Docker Container Internals & Linux Cgroups", category: "Cloud & DevOps", level: "Beginner", hours: 28, tags: ["Docker", "Containers", "Namespaces", "Images"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Terraform & OpenTofu Infrastructure as Code", category: "Cloud & DevOps", level: "Intermediate", hours: 34, tags: ["Terraform", "IaC", "Cloud Automation", "State"], sampleVideo: "vn3tm0quoqE", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "AWS Cloud Solutions Architect Certification", category: "Cloud & DevOps", level: "Advanced", hours: 58, tags: ["AWS", "VPC", "EC2", "S3", "Cloud"], sampleVideo: "d6WC5n9G_sM", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Observability with Prometheus, Grafana & Jaeger", category: "Cloud & DevOps", level: "Intermediate", hours: 32, tags: ["Observability", "Prometheus", "Grafana", "Metrics"], sampleVideo: "dGcsHMXbSOA", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Service Mesh Orchestration with Istio & Envoy", category: "Cloud & DevOps", level: "Advanced", hours: 38, tags: ["Istio", "Envoy", "Service Mesh", "mTLS"], sampleVideo: "3Kq1MIfTWCE", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },

  // 4. Cybersecurity & Ethical Hacking
  { title: "Offensive Penetration Testing & Red Teaming", category: "Cybersecurity & Ethical Hacking", level: "Advanced", hours: 48, tags: ["Penetration Testing", "Red Team", "Metasploit", "Exploits"], sampleVideo: "3Kq1MIfTWCE", playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz" },
  { title: "Zero-Trust Enterprise Security Architecture", category: "Cybersecurity & Ethical Hacking", level: "Intermediate", hours: 36, tags: ["Zero Trust", "IAM", "Least Privilege", "Network"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz" },
  { title: "Web Application Security & OWASP Top 10", category: "Cybersecurity & Ethical Hacking", level: "Beginner", hours: 30, tags: ["OWASP", "XSS", "SQLi", "CSRF", "AppSec"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz" },
  { title: "Network Forensics, Packet Analysis & Wireshark", category: "Cybersecurity & Ethical Hacking", level: "Intermediate", hours: 34, tags: ["Wireshark", "Packet Analysis", "PCAP", "TCP/IP"], sampleVideo: "vn3tm0quoqE", playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz" },
  { title: "Cryptographic Protocols, TLS 1.3 & PKI Systems", category: "Cybersecurity & Ethical Hacking", level: "Advanced", hours: 40, tags: ["Cryptography", "TLS 1.3", "RSA", "Elliptic Curve"], sampleVideo: "d6WC5n9G_sM", playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz" },

  // 5. Data Science & Analytics
  { title: "Big Data Distributed Processing with Apache Spark", category: "Data Science & Analytics", level: "Advanced", hours: 46, tags: ["Spark", "PySpark", "Big Data", "Dataframes"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "High-Performance Python Data Science with Polars", category: "Data Science & Analytics", level: "Intermediate", hours: 30, tags: ["Python", "Polars", "Pandas", "Analytics"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Cloud Data Warehousing with Snowflake & dbt", category: "Data Science & Analytics", level: "Intermediate", hours: 35, tags: ["Snowflake", "dbt", "SQL", "Warehousing"], sampleVideo: "vn3tm0quoqE", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Applied Machine Learning & Predictive Modeling", category: "Data Science & Analytics", level: "Beginner", hours: 32, tags: ["Scikit-Learn", "Regression", "Random Forest", "ML"], sampleVideo: "aircAruvnKk", playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1" },

  // 6. System Architecture & Backend
  { title: "Distributed Systems Design & Raft Consensus", category: "System Architecture & Backend", level: "Advanced", hours: 50, tags: ["Distributed Systems", "Raft", "Paxos", "Consensus"], sampleVideo: "d6WC5n9G_sM", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "High-Throughput Event Streaming with Apache Kafka", category: "System Architecture & Backend", level: "Advanced", hours: 44, tags: ["Kafka", "Event Driven", "Partitions", "Streaming"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Database Sharding, Partitioning & ACID Internals", category: "System Architecture & Backend", level: "Advanced", hours: 38, tags: ["Databases", "PostgreSQL", "Sharding", "Transactions"], sampleVideo: "dGcsHMXbSOA", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "High-Performance gRPC & Protocol Buffers in Go", category: "System Architecture & Backend", level: "Intermediate", hours: 36, tags: ["Go", "gRPC", "Protobuf", "Microservices"], sampleVideo: "vn3tm0quoqE", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },
  { title: "Rust Systems Programming & Safe Concurrency", category: "System Architecture & Backend", level: "Advanced", hours: 46, tags: ["Rust", "Ownership", "Borrowing", "Threads"], sampleVideo: "d6WC5n9G_sM", playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG" },

  // 7. Mobile App Development
  { title: "React Native Architecture & TurboModules", category: "Mobile App Development", level: "Intermediate", hours: 38, tags: ["React Native", "Expo", "TurboModules", "Mobile"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Flutter & Dart Reactive State Engineering", category: "Mobile App Development", level: "Beginner", hours: 34, tags: ["Flutter", "Dart", "Bloc", "Widgets"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "iOS App Engineering with Swift 6 & SwiftUI", category: "Mobile App Development", level: "Intermediate", hours: 42, tags: ["iOS", "Swift", "SwiftUI", "Apple"], sampleVideo: "vn3tm0quoqE", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Android App Engineering with Kotlin & Compose", category: "Mobile App Development", level: "Intermediate", hours: 40, tags: ["Android", "Kotlin", "Jetpack Compose", "Coroutines"], sampleVideo: "aircAruvnKk", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },

  // 8. UI/UX & Design Systems
  { title: "Enterprise Design Systems in Figma & Code Tokens", category: "UI/UX & Design Systems", level: "Beginner", hours: 26, tags: ["Figma", "Design Systems", "Tokens", "UI/UX"], sampleVideo: "8aGhZQkoFbQ", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Micro-Interactions, Motion Design & Gestures", category: "UI/UX & Design Systems", level: "Intermediate", hours: 28, tags: ["Motion", "Animation", "UX", "Micro-interactions"], sampleVideo: "dGcsHMXbSOA", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" },
  { title: "Advanced Web Accessibility & WCAG 2.2 AAA", category: "UI/UX & Design Systems", level: "All Levels", hours: 24, tags: ["Accessibility", "a11y", "WCAG", "Screen Readers"], sampleVideo: "vn3tm0quoqE", playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n" }
];

export const SPECIALIZATIONS = [
  "Core Architecture & Foundations",
  "High-Concurrency & Distributed Scale",
  "Zero-Trust Security & Hardening",
  "Production CI/CD & Reliability",
  "Performance Benchmarks & Memory Tuning",
  "Enterprise Scale & High Availability",
  "Cloud Native Orchestration",
  "Fault Tolerance & Disaster Recovery",
  "Edge Computing & Real-Time Streaming",
  "Microservices & Event-Driven Systems",
  "Design Patterns & Clean Code Architecture",
  "Full-Stack Integration & API Gateways"
];

export const CURATED_THUMBNAILS = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516116211227-bbc13c7a3607?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
];

// Local Storage Keys
const OVERRIDES_STORAGE_KEY = 'LWF_COURSE_OVERRIDES_1M_V1';
const PROGRESS_STORAGE_KEY = 'LWF_STUDENT_PROGRESS_1M_V1';
const PROFILE_KEY = 'LWF_LEARNER_PROFILE_V2';

export function getStoredOverrides(): Record<number, Course> {
  try {
    const raw = localStorage.getItem(OVERRIDES_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load course overrides", e);
  }
  return {};
}

export function saveStoredOverrides(overrides: Record<number, Course>): void {
  try {
    localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error("Failed to save course overrides", e);
  }
}

export function getStoredStudentProgress(): Record<number, { passedLessons: Record<string, number>; isComplete: boolean }> {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load student progress", e);
  }
  return {};
}

export function saveStoredStudentProgress(progress: Record<number, { passedLessons: Record<string, number>; isComplete: boolean }>): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save student progress", e);
  }
}

/**
 * Deterministic O(1) Course Generator for Any ID from 1 to 1,000,000
 */
export function generateCourse(id: number): Course {
  // Check if admin override exists
  const overrides = getStoredOverrides();
  if (overrides[id]) {
    return overrides[id];
  }

  // Handcrafted featured courses for IDs 1..4
  if (id >= 1 && id <= INITIAL_FEATURED_COURSES.length) {
    const base = INITIAL_FEATURED_COURSES[id - 1];
    return applyProgressToCourse(base);
  }

  const templateIdx = (id - 1) % TOPIC_TEMPLATES.length;
  const template = TOPIC_TEMPLATES[templateIdx];
  const specIdx = Math.floor((id - 1) / TOPIC_TEMPLATES.length) % SPECIALIZATIONS.length;
  const specialization = SPECIALIZATIONS[specIdx];
  const volume = Math.floor((id - 1) / (TOPIC_TEMPLATES.length * SPECIALIZATIONS.length)) + 1;
  const thumbIdx = (id - 1) % CURATED_THUMBNAILS.length;

  const title = volume === 1 
    ? `${template.title}: ${specialization}` 
    : `${template.title}: ${specialization} (Vol. ${volume})`;

  const playlistUrl = template.playlistId 
    ? `https://www.youtube.com/playlist?list=${template.playlistId}`
    : undefined;

  const sampleVid = template.sampleVideo || "8aGhZQkoFbQ";

  const course: Course = {
    id,
    title,
    category: template.category,
    level: template.level,
    thumbnail: CURATED_THUMBNAILS[thumbIdx],
    description: `Accredited curriculum in ${title}. Master production algorithms, low-latency system architectures, security audits, and hands-on lab projects led by CEO Muhammad Talha.`,
    instructor: "Muhammad Talha",
    instructorName: "Muhammad Talha",
    instructorRole: "Founder & CEO, LEARN WITH FLOW",
    rating: +(4.72 + ((id * 19) % 27) * 0.01).toFixed(2),
    studentsCount: 1500 + ((id * 137) % 45000),
    estimatedHours: template.hours + ((id * 3) % 18),
    tags: [template.category.split(" ")[0], ...template.tags],
    playlistUrl,
    modules: [
      {
        id: `mod-${id}-1`,
        title: `Module 1: Foundations & Architecture`,
        description: `Core fundamentals, runtime specifications, and computational design patterns.`,
        lessons: [
          {
            id: `les-${id}-1-1`,
            title: `Lesson 1: Core Mechanics of ${template.title.split(":")[0]}`,
            duration: "24 min",
            videoUrl: `https://www.youtube.com/embed/${sampleVid}`,
            passed: false,
            quiz: generateStandardQuiz(`${template.title.split(":")[0]} Core`)
          },
          {
            id: `les-${id}-1-2`,
            title: `Lesson 2: Production Patterns & Error Handling`,
            duration: "28 min",
            videoUrl: `https://www.youtube.com/embed/vn3tm0quoqE`,
            passed: false,
            quiz: generateStandardQuiz(`${template.title.split(":")[0]} Patterns`)
          }
        ]
      },
      {
        id: `mod-${id}-2`,
        title: `Module 2: Advanced Scalability & Real-World Lab`,
        description: `High-concurrency stress testing, automated CI/CD pipelines, and zero-downtime deployment.`,
        lessons: [
          {
            id: `les-${id}-2-1`,
            title: `Lesson 1: Performance Tuning & Production Lab`,
            duration: "32 min",
            videoUrl: `https://www.youtube.com/embed/d6WC5n9G_sM`,
            passed: false,
            quiz: generateStandardQuiz(`${template.title.split(":")[0]} Scalability`)
          }
        ]
      }
    ]
  };

  return applyProgressToCourse(course);
}

function applyProgressToCourse(course: Course): Course {
  const allProgress = getStoredStudentProgress();
  const prog = allProgress[course.id];
  if (!prog || !prog.passedLessons) return course;

  const clone: Course = JSON.parse(JSON.stringify(course));
  clone.modules.forEach((m) => {
    m.lessons.forEach((l) => {
      if (prog.passedLessons[l.id] !== undefined) {
        l.passed = true;
        l.score = prog.passedLessons[l.id];
      }
    });
  });
  return clone;
}

/**
 * Direct lookup for any course ID from 1 to 1,000,000
 */
export function getCourseById(id: number): Course {
  const clampedId = Math.max(1, Math.min(TOTAL_CATALOG_COURSES, Math.floor(id)));
  return generateCourse(clampedId);
}

/**
 * Save updated course from Admin Editor Modal into persistent storage overrides
 */
export function saveCustomCourse(updatedCourse: Course): void {
  const overrides = getStoredOverrides();
  overrides[updatedCourse.id] = updatedCourse;
  saveStoredOverrides(overrides);
}

/**
 * Record quiz completion and 80%+ gateway pass
 */
export function recordLessonProgress(courseId: number, lessonId: string, score: number): Course {
  const progressMap = getStoredStudentProgress();
  if (!progressMap[courseId]) {
    progressMap[courseId] = { passedLessons: {}, isComplete: false };
  }
  progressMap[courseId].passedLessons[lessonId] = score;

  const course = getCourseById(courseId);
  // Check if course is 100% complete
  let total = 0;
  let passed = 0;
  course.modules.forEach(m => {
    m.lessons.forEach(l => {
      total++;
      if (progressMap[courseId].passedLessons[l.id] !== undefined) passed++;
    });
  });
  progressMap[courseId].isComplete = total > 0 && passed === total;
  saveStoredStudentProgress(progressMap);

  return getCourseById(courseId);
}

export interface MillionCatalogQuery {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  selectedCategory?: string;
  selectedLevel?: string;
  sortBy?: 'popular' | 'rating' | 'newest' | 'duration';
  jumpToId?: number;
}

export interface MillionCatalogResult {
  courses: Course[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Ultra-Fast O(1) Memory Paging & Search Engine across 1,000,000 Courses
 */
export function queryMillionCourses(query: MillionCatalogQuery): MillionCatalogResult {
  const pageSize = Math.max(1, Math.min(100, query.pageSize || 12));
  let requestedPage = Math.max(1, query.page || 1);

  // 1. Direct Course ID Jump (e.g. #458291)
  if (query.jumpToId && query.jumpToId >= 1 && query.jumpToId <= TOTAL_CATALOG_COURSES) {
    const course = getCourseById(query.jumpToId);
    return {
      courses: [course],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1
    };
  }

  // Check if search query is a specific course ID (e.g. "45892" or "#45892")
  const trimmedSearch = (query.searchQuery || '').trim();
  const numericIdMatch = trimmedSearch.match(/^#?(\d+)$/);
  if (numericIdMatch && numericIdMatch[1]) {
    const targetId = parseInt(numericIdMatch[1], 10);
    if (targetId >= 1 && targetId <= TOTAL_CATALOG_COURSES) {
      const course = getCourseById(targetId);
      return {
        courses: [course],
        totalCount: 1,
        totalPages: 1,
        currentPage: 1
      };
    }
  }

  // 2. Filter by Category
  const isCategoryFilter = query.selectedCategory && query.selectedCategory !== 'All Categories';
  const matchingTemplates = isCategoryFilter
    ? TOPIC_TEMPLATES.filter(t => t.category === query.selectedCategory)
    : TOPIC_TEMPLATES;

  // If text search is active
  const isTextSearch = trimmedSearch.length > 0;
  let searchTemplates = matchingTemplates;
  if (isTextSearch) {
    const sLower = trimmedSearch.toLowerCase();
    searchTemplates = matchingTemplates.filter(t => 
      t.title.toLowerCase().includes(sLower) ||
      t.category.toLowerCase().includes(sLower) ||
      t.tags.some(tag => tag.toLowerCase().includes(sLower)) ||
      "muhammad talha".includes(sLower)
    );
    // If no templates match the specific text, fall back to matching templates to keep catalog rich
    if (searchTemplates.length === 0) {
      searchTemplates = matchingTemplates;
    }
  }

  // Calculate total count for this segment
  let totalCount = TOTAL_CATALOG_COURSES;
  if (isCategoryFilter) {
    // 8 categories total, roughly 125,000 courses per category
    totalCount = Math.floor(TOTAL_CATALOG_COURSES / (CATEGORIES.length - 1));
  }
  if (isTextSearch) {
    totalCount = Math.min(totalCount, searchTemplates.length * SPECIALIZATIONS.length * 50);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (requestedPage > totalPages) {
    requestedPage = totalPages;
  }

  // Generate the exact slice of courses for this page
  const courses: Course[] = [];
  const startIndex = (requestedPage - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const virtualIndex = startIndex + i;
    if (virtualIndex >= totalCount) break;

    // Map virtual index to deterministic ID
    let courseId: number;
    if (!isCategoryFilter && !isTextSearch) {
      courseId = virtualIndex + 1;
    } else {
      // Offset by category or search template
      const template = searchTemplates[virtualIndex % searchTemplates.length];
      const templateGlobalIdx = TOPIC_TEMPLATES.findIndex(t => t.title === template.title);
      const volumeStep = Math.floor(virtualIndex / searchTemplates.length);
      courseId = (templateGlobalIdx >= 0 ? templateGlobalIdx : 0) + (volumeStep * TOPIC_TEMPLATES.length) + 1;
      if (courseId > TOTAL_CATALOG_COURSES) {
        courseId = (courseId % TOTAL_CATALOG_COURSES) + 1;
      }
    }

    courses.push(getCourseById(courseId));
  }

  // Apply sorting if requested
  if (query.sortBy === 'rating') {
    courses.sort((a, b) => b.rating - a.rating);
  } else if (query.sortBy === 'duration') {
    courses.sort((a, b) => b.estimatedHours - a.estimatedHours);
  } else if (query.sortBy === 'newest') {
    courses.sort((a, b) => b.id - a.id);
  }

  return {
    courses,
    totalCount,
    totalPages,
    currentPage: requestedPage
  };
}

// Backward-compatibility functions
export function getStoredCourses(): Course[] {
  // Returns the first page of 12 courses for initial mount
  const result = queryMillionCourses({ page: 1, pageSize: 12 });
  return result.courses;
}

export function saveStoredCourses(courses: Course[]): void {
  // Save overrides for any modified courses
  const overrides = getStoredOverrides();
  courses.forEach(c => {
    overrides[c.id] = c;
  });
  saveStoredOverrides(overrides);
}

export function getLearnerProfile(): { name: string; email: string } {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return { name: "Muhammad Talha", email: "student@learnwithflow.com" };
}

export function saveLearnerProfile(profile: { name: string; email: string }): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
}
