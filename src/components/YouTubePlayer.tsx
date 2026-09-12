import React, { useState, useEffect } from 'react';
import { parseYouTubeUrl, parseYouTubePlaylist, getYouTubeEmbedUrl } from '../utils/youtube';
import { 
  Play, 
  RefreshCw, 
  ExternalLink, 
  VideoOff, 
  Sparkles, 
  ShieldCheck,
  ListVideo,
  Film,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

interface YouTubePlayerProps {
  urlOrId: string | null | undefined;
  playlistUrl?: string | null;
  playlistId?: string | null;
  title: string;
  autoplay?: boolean;
  onFinishLessonAndStartQuiz?: () => void;
  quizPassed?: boolean;
  quizScore?: number | null;
  moduleTitle?: string;
  duration?: string;
  isPlaylistView?: boolean;
  onTogglePlaylistView?: () => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  urlOrId,
  playlistUrl,
  playlistId: explicitPlaylistId,
  title,
  autoplay = false,
  onFinishLessonAndStartQuiz,
  quizPassed = false,
  quizScore = null,
  moduleTitle,
  duration,
  isPlaylistView = false,
  onTogglePlaylistView,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  // Parse playlist information if provided
  const parsedPlaylist = parseYouTubePlaylist(playlistUrl || explicitPlaylistId);
  const effectivePlaylistId = parsedPlaylist.isValid ? parsedPlaylist.playlistId : (explicitPlaylistId || null);

  // Parse video URL
  const parsedVideo = parseYouTubeUrl(urlOrId);

  // Determine effective embed URL
  let embedSrc: string | null = null;

  if (isPlaylistView && effectivePlaylistId) {
    embedSrc = `https://www.youtube-nocookie.com/embed/videoseries?list=${effectivePlaylistId}&rel=0&modestbranding=1&enablejsapi=1${autoplay ? '&autoplay=1' : ''}`;
  } else if (parsedVideo.isValid && parsedVideo.videoId) {
    const listParam = effectivePlaylistId ? `&list=${effectivePlaylistId}` : '';
    const autoParam = autoplay ? '&autoplay=1' : '';
    embedSrc = `https://www.youtube-nocookie.com/embed/${parsedVideo.videoId}?rel=0&modestbranding=1&enablejsapi=1${listParam}${autoParam}`;
  } else if (effectivePlaylistId) {
    // If no video URL but playlist ID exists, fall back to playlist videoseries
    embedSrc = `https://www.youtube-nocookie.com/embed/videoseries?list=${effectivePlaylistId}&rel=0&modestbranding=1&enablejsapi=1${autoplay ? '&autoplay=1' : ''}`;
  }

  const isValidStream = !!embedSrc;

  // Reset loading state when video or playlist changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  }, [urlOrId, effectivePlaylistId, isPlaylistView]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full space-y-3">
      {/* 16:9 Theater Container */}
      <div 
        id="youtube-theater-player"
        className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group transition-all"
      >
        {isValidStream && !hasError ? (
          <>
            {/* Smooth Loading Shimmer Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs text-white space-y-3 transition-opacity duration-300">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-3 border-blue-500/20 border-t-[#0056D2] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[#0056D2] fill-[#0056D2]" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold tracking-wide text-slate-200">
                    {isPlaylistView ? 'Connecting to YouTube Playlist Series...' : 'Connecting to YouTube Stream...'}
                  </p>
                  <p className="text-xs text-slate-400">
                    LEARN WITH FLOW HD Player • CEO Muhammad Talha
                  </p>
                </div>
              </div>
            )}

            {/* Embedded YouTube Iframe */}
            <iframe
              key={`yt-iframe-${iframeKey}-${parsedVideo.videoId || effectivePlaylistId}-${isPlaylistView ? 'pl' : 'vid'}`}
              src={embedSrc!}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />

            {/* Top Theater Header Overlay (Subtle on hover) */}
            <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/85 via-black/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-white text-xs z-20">
              <div className="flex items-center gap-2 truncate max-w-[70%]">
                <span className="bg-[#0056D2] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  {isPlaylistView ? 'Playlist Series' : 'HD Stream'}
                </span>
                {effectivePlaylistId && (
                  <span className="hidden sm:inline-flex items-center gap-1 bg-slate-800/90 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                    <ListVideo className="w-3 h-3 text-blue-400" />
                    list={effectivePlaylistId.slice(0, 10)}...
                  </span>
                )}
                <span className="truncate font-medium drop-shadow-sm">{title}</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {effectivePlaylistId && onTogglePlaylistView && (
                  <button
                    type="button"
                    onClick={onTogglePlaylistView}
                    className="p-1.5 px-2.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-[11px] font-medium border border-slate-700/60"
                    title={isPlaylistView ? "Switch to Individual Lesson Mode" : "Switch to YouTube Full Playlist Series Player"}
                  >
                    {isPlaylistView ? (
                      <>
                        <Film className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">Single Lesson View</span>
                      </>
                    ) : (
                      <>
                        <ListVideo className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">Playlist Series View</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReload}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition border border-slate-700/60"
                  title="Reload Player Stream"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {parsedVideo.videoId ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${parsedVideo.videoId}${effectivePlaylistId ? `&list=${effectivePlaylistId}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px] border border-slate-700/60"
                    title="Open on YouTube in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : effectivePlaylistId ? (
                  <a
                    href={`https://www.youtube.com/playlist?list=${effectivePlaylistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px] border border-slate-700/60"
                    title="Open YouTube Playlist in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          /* Fallback State: Invalid or Empty YouTube URL */
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shadow-inner">
                <VideoOff className="w-10 h-10 text-slate-400" />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Preview
              </span>
            </div>

            <div className="space-y-1.5 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Video Coming Soon
              </div>
              <h4 className="text-base font-bold text-white">
                {title || 'Lesson Stream in Production'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Founder & CEO Muhammad Talha's engineering team is preparing high-definition lecture media for this slot. You can still test your knowledge via the 5-question logic assessment below.
              </p>
            </div>

            {onFinishLessonAndStartQuiz && (
              <button
                type="button"
                onClick={onFinishLessonAndStartQuiz}
                className="mt-2 bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Proceed to 5-Question Quiz</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Playlist Status Banner if connected */}
      {effectivePlaylistId && (
        <div className="bg-slate-900 text-slate-200 px-4 py-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0056D2]/30 border border-[#0056D2]/60 flex items-center justify-center text-[#0056D2] shrink-0">
              <ListVideo className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">YouTube Playlist Engine Active</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-500/30">
                  list={effectivePlaylistId.slice(0, 16)}...
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Select any lesson from the dynamic playlist sidebar on the right. 80% quiz mastery required per lesson.
              </p>
            </div>
          </div>

          {onTogglePlaylistView && (
            <button
              type="button"
              onClick={onTogglePlaylistView}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                isPlaylistView
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              {isPlaylistView ? (
                <>
                  <Film className="w-3.5 h-3.5" />
                  <span>Showing Playlist Series</span>
                </>
              ) : (
                <>
                  <ListVideo className="w-3.5 h-3.5" />
                  <span>Switch to Playlist Series Player</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Prominent Quiz Trigger Integration directly below the player */}
      {onFinishLessonAndStartQuiz && (
        <div className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          quizPassed 
            ? 'bg-emerald-50/80 border-emerald-200' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                quizPassed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {quizPassed ? '✓ 80% Threshold Achieved' : '🔒 80% Logic Gate Active'}
              </span>
              {duration && (
                <span className="text-xs text-slate-500">
                  • Video duration: {duration}
                </span>
              )}
              {moduleTitle && (
                <span className="text-xs text-slate-500 truncate hidden sm:inline">
                  • {moduleTitle}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              {quizPassed 
                ? `Lesson Cleared (${quizScore ?? 100}% Score)` 
                : 'Finished the video? Take the 5-question quiz to unlock next lesson'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {quizPassed
                ? 'Your passing score is recorded in your gradebook. You may retake anytime to sharpen your technical mastery.'
                : 'Coursera-grade academic gate: score 4/5 (80%+) to unlock the next video stream in the syllabus.'}
            </p>
          </div>

          <button
            id="finish-lesson-start-quiz-btn"
            type="button"
            onClick={onFinishLessonAndStartQuiz}
            className={`shrink-0 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 ${
              quizPassed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-[#0056D2] hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {quizPassed ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Retake / Review Quiz</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Finish Lesson & Start 5-Question Quiz</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
