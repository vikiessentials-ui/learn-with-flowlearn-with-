/**
 * YouTube Video & Playlist Embed & Parsing Engine for LEARN WITH FLOW
 * Founded by CEO Muhammad Talha
 */

export interface ParsedYouTubeVideo {
  videoId: string | null;
  playlistId: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  isValid: boolean;
}

export interface ParsedYouTubePlaylist {
  playlistId: string | null;
  embedUrl: string | null;
  canonicalUrl: string | null;
  isValid: boolean;
}

/**
 * YouTube Playlist URL / ID Parser
 * Handles:
 * - Playlist page: https://www.youtube.com/playlist?list=PLxxx
 * - Watch with playlist: https://www.youtube.com/watch?v=VIDEO_ID&list=PLxxx
 * - Short URL with playlist: https://youtu.be/VIDEO_ID?list=PLxxx
 * - Embed videoseries: https://www.youtube.com/embed/videoseries?list=PLxxx
 * - Query string fragment: list=PLxxx
 * - Raw Playlist ID: PLxxx, UUxxx, FLxxx, RDxxx, OLAKxxx, etc.
 */
export function parseYouTubePlaylist(urlOrId: string | null | undefined): ParsedYouTubePlaylist {
  if (!urlOrId || typeof urlOrId !== 'string') {
    return {
      playlistId: null,
      embedUrl: null,
      canonicalUrl: null,
      isValid: false,
    };
  }

  const trimmed = urlOrId.trim();
  if (!trimmed) {
    return {
      playlistId: null,
      embedUrl: null,
      canonicalUrl: null,
      isValid: false,
    };
  }

  // 1. Check for explicit list= query parameter in URL or fragment
  const listParamMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
  if (listParamMatch && listParamMatch[1]) {
    const playlistId = listParamMatch[1];
    return {
      playlistId,
      embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&enablejsapi=1`,
      canonicalUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      isValid: true,
    };
  }

  // 2. Check if user typed "list=PLxxx" directly without protocol
  if (/^list=[a-zA-Z0-9_-]+/i.test(trimmed)) {
    const playlistId = trimmed.replace(/^list=/i, '');
    return {
      playlistId,
      embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&enablejsapi=1`,
      canonicalUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      isValid: true,
    };
  }

  // 3. Check for standard YouTube playlist ID prefixes (PL, UU, FL, RD, OLAK) or 15+ alphanumeric chars
  if (/^(?:PL|UU|FL|RD|OLAK)[a-zA-Z0-9_-]{10,}$/i.test(trimmed) || /^[a-zA-Z0-9_-]{18,}$/i.test(trimmed)) {
    const playlistId = trimmed;
    return {
      playlistId,
      embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&enablejsapi=1`,
      canonicalUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      isValid: true,
    };
  }

  return {
    playlistId: null,
    embedUrl: null,
    canonicalUrl: null,
    isValid: false,
  };
}

/**
 * Universal YouTube URL Parser
 * Handles:
 * - Standard Watch URL: https://www.youtube.com/watch?v=VIDEO_ID
 * - Watch with playlist: https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 * - Short URL: https://youtu.be/VIDEO_ID
 * - Embed URL: https://www.youtube.com/embed/VIDEO_ID
 * - Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
 * - Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
 * - Raw Video ID: VIDEO_ID (11 characters)
 * - Timestamp preservation if provided (e.g. ?t=120 or &start=120)
 */
export function parseYouTubeUrl(urlOrId: string | null | undefined): ParsedYouTubeVideo {
  if (!urlOrId || typeof urlOrId !== 'string') {
    return {
      videoId: null,
      playlistId: null,
      embedUrl: null,
      thumbnailUrl: null,
      isValid: false,
    };
  }

  const trimmed = urlOrId.trim();
  if (!trimmed) {
    return {
      videoId: null,
      playlistId: null,
      embedUrl: null,
      thumbnailUrl: null,
      isValid: false,
    };
  }

  // Extract playlist ID if present in the URL
  const playlistMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
  const playlistId = playlistMatch ? playlistMatch[1] : null;

  // Check if raw 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    const videoId = trimmed;
    const listQuery = playlistId ? `&list=${playlistId}` : '';
    return {
      videoId,
      playlistId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${listQuery}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      isValid: true,
    };
  }

  // If this is purely a playlist URL without a specific video ID
  if (trimmed.includes('playlist?list=') || trimmed.startsWith('list=') || /^(?:PL|UU|FL|RD|OLAK)[a-zA-Z0-9_-]{16,}$/i.test(trimmed)) {
    const plParsed = parseYouTubePlaylist(trimmed);
    if (plParsed.isValid && plParsed.playlistId) {
      return {
        videoId: null,
        playlistId: plParsed.playlistId,
        embedUrl: plParsed.embedUrl,
        thumbnailUrl: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`,
        isValid: true,
      };
    }
  }

  // Regex covering standard watch, youtu.be, embed, shorts, live, v
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = trimmed.match(regExp);

  if (match && match[1] && match[1].length === 11) {
    const videoId = match[1];
    
    // Check for start time parameter
    let startSeconds: number | null = null;
    const timeMatch = trimmed.match(/[?&](?:t|start)=(\d+h)?(\d+m)?(\d+s)?(\d+)?/i);
    if (timeMatch) {
      if (timeMatch[4]) {
        startSeconds = parseInt(timeMatch[4], 10);
      } else {
        let total = 0;
        if (timeMatch[1]) total += parseInt(timeMatch[1], 10) * 3600;
        if (timeMatch[2]) total += parseInt(timeMatch[2], 10) * 60;
        if (timeMatch[3]) total += parseInt(timeMatch[3], 10);
        if (total > 0) startSeconds = total;
      }
    }

    const startParam = startSeconds ? `&start=${startSeconds}` : '';
    const listParam = playlistId ? `&list=${playlistId}` : '';
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${startParam}${listParam}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return {
      videoId,
      playlistId,
      embedUrl,
      thumbnailUrl,
      isValid: true,
    };
  }

  // Fallback: check if it parses as playlist
  const plFallback = parseYouTubePlaylist(trimmed);
  if (plFallback.isValid && plFallback.playlistId) {
    return {
      videoId: null,
      playlistId: plFallback.playlistId,
      embedUrl: plFallback.embedUrl,
      thumbnailUrl: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`,
      isValid: true,
    };
  }

  return {
    videoId: null,
    playlistId: null,
    embedUrl: null,
    thumbnailUrl: null,
    isValid: false,
  };
}

/**
 * Returns clean embed URL supporting videoId and optional playlistId
 */
export function getYouTubeEmbedUrl(
  urlOrId: string | null | undefined, 
  playlistId?: string | null,
  fallbackId = '8aGhZQkoFbQ'
): string {
  if (playlistId && !urlOrId) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&enablejsapi=1`;
  }

  const parsed = parseYouTubeUrl(urlOrId);
  if (parsed.isValid && parsed.embedUrl) {
    if (playlistId && !parsed.embedUrl.includes('list=')) {
      return `${parsed.embedUrl}&list=${playlistId}`;
    }
    return parsed.embedUrl;
  }

  if (playlistId) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&enablejsapi=1`;
  }

  return `https://www.youtube-nocookie.com/embed/${fallbackId}?rel=0&modestbranding=1&enablejsapi=1`;
}

/**
 * Curated High-Yield Educational Technical Playlists for quick admin attachment
 */
export interface CuratedPlaylistPreset {
  label: string;
  category: string;
  playlistId: string;
  playlistUrl: string;
  description: string;
  sampleLessons: { title: string; videoId: string; duration: string }[];
}

export const CURATED_PLAYLIST_PRESETS: CuratedPlaylistPreset[] = [
  {
    label: "Full-Stack Web Development Mastery",
    category: "Web Development",
    playlistId: "PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n",
    playlistUrl: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n",
    description: "End-to-end full stack web applications with modern state and API design.",
    sampleLessons: [
      { title: "Lesson 1: Modern Web Foundations & Runtime", videoId: "8aGhZQkoFbQ", duration: "24 min" },
      { title: "Lesson 2: Component Architecture & State Engines", videoId: "dGcsHMXbSOA", duration: "28 min" },
      { title: "Lesson 3: RESTful Micro-Endpoints & Data Fetching", videoId: "vn3tm0quoqE", duration: "32 min" },
      { title: "Lesson 4: Secure Auth, JWT & Session Management", videoId: "aircAruvnKk", duration: "26 min" },
      { title: "Lesson 5: Production Deployment & Docker Containerization", videoId: "d6WC5n9G_sM", duration: "35 min" }
    ]
  },
  {
    label: "Deep Learning & Neural Networks",
    category: "Artificial Intelligence & ML",
    playlistId: "PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1",
    playlistUrl: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkfiqHnNaxdV1Dnpe8re2u1",
    description: "Deep mathematical and practical foundations of transformers, tensors, and neural networks.",
    sampleLessons: [
      { title: "Lesson 1: Tensor Math & Forward Propagation", videoId: "aircAruvnKk", duration: "30 min" },
      { title: "Lesson 2: Backpropagation & Gradient Descent", videoId: "8aGhZQkoFbQ", duration: "34 min" },
      { title: "Lesson 3: Convolutional & Recurrent Layers", videoId: "dGcsHMXbSOA", duration: "29 min" },
      { title: "Lesson 4: Attention Mechanism & Transformer Models", videoId: "vn3tm0quoqE", duration: "42 min" },
      { title: "Lesson 5: Model Quantization & Edge Deployment", videoId: "d6WC5n9G_sM", duration: "38 min" }
    ]
  },
  {
    label: "DevOps, Docker & Kubernetes Engineering",
    category: "Cloud & DevOps",
    playlistId: "PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG",
    playlistUrl: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvPEPCHvdGLVCG",
    description: "Automated continuous delivery, infrastructure-as-code, and Kubernetes orchestration.",
    sampleLessons: [
      { title: "Lesson 1: Container Mechanics & Linux Namespaces", videoId: "d6WC5n9G_sM", duration: "26 min" },
      { title: "Lesson 2: Multi-Stage Dockerfile Optimization", videoId: "8aGhZQkoFbQ", duration: "22 min" },
      { title: "Lesson 3: Kubernetes Pods, Services & Ingress Routing", videoId: "dGcsHMXbSOA", duration: "36 min" },
      { title: "Lesson 4: ConfigMaps, Secrets & Persistent Volumes", videoId: "vn3tm0quoqE", duration: "30 min" },
      { title: "Lesson 5: Production Helm Charts & Automated CI/CD", videoId: "aircAruvnKk", duration: "40 min" }
    ]
  },
  {
    label: "Cybersecurity & Offensive Penetration Testing",
    category: "Cybersecurity & Ethical Hacking",
    playlistId: "PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz",
    playlistUrl: "https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PrE9srvEn8jS32VQK99tkz",
    description: "Hands-on vulnerability assessments, zero-day threat analysis, and secure code audits.",
    sampleLessons: [
      { title: "Lesson 1: Network Reconnaissance & Threat Modeling", videoId: "3Kq1MIfTWCE", duration: "28 min" },
      { title: "Lesson 2: Web Application Attack Vectors (OWASP Top 10)", videoId: "8aGhZQkoFbQ", duration: "35 min" },
      { title: "Lesson 3: Cryptographic Protocols & TLS Inspection", videoId: "dGcsHMXbSOA", duration: "31 min" },
      { title: "Lesson 4: Privilege Escalation & Memory Exploit Analysis", videoId: "aircAruvnKk", duration: "44 min" },
      { title: "Lesson 5: Zero-Trust Defense & Incident Response", videoId: "d6WC5n9G_sM", duration: "33 min" }
    ]
  }
];
