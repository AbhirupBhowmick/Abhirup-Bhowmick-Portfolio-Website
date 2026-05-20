"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import { 
  GitBranch, 
  Star, 
  GitFork, 
  GitPullRequest, 
  GitCommit, 
  AlertTriangle,
  FolderOpen,
  Calendar,
  Layers,
  Cpu
} from "lucide-react";

interface RepoData {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  url: string;
  visibility: string;
  isOpenSource: boolean;
}

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  profile: {
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
  };
  repos: RepoData[];
  contributions: {
    calendar: ContributionDay[];
    totalContributions: number;
    activeDays: number;
    streak: number;
  };
  languages: LanguageData[];
  metrics: {
    commits: number;
    pullRequests: number;
    issues: number;
    forks: number;
    stars: number;
    publicContribs: number;
  };
  timestamp: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "GitHub telemetry temporarily unavailable.");
  }
  return res.json();
};

export default function GitHubActivity() {
  const { data, error, isLoading } = useSWR<GitHubData>("/api/github", fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  const [timeAgo, setTimeAgo] = useState("Just now");
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Auto-refresh the timestamp text
  useEffect(() => {
    if (!data?.timestamp) return;
    const updateTimeAgo = () => {
      const diffMs = Date.now() - data.timestamp;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      
      if (diffMins < 1) {
        setTimeAgo("Just now");
      } else {
        setTimeAgo(`${diffMins}m ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 15000);
    return () => clearInterval(interval);
  }, [data?.timestamp]);

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Responsive calendar days (Show full year on desktop, last 18 weeks on mobile)
  const calendarColumns = useMemo(() => {
    if (!data?.contributions?.calendar) return [];
    
    const days = data.contributions.calendar;
    const cols = [];
    
    // Group days by week (7 days per column)
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }
    
    return cols;
  }, [data?.contributions?.calendar]);

  // Framer Motion presets
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  if (error) {
    return (
      <section id="github" className="py-24 relative border-t border-white/5 bg-[#09090b]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                GitHub Sync
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                An overview of active engineering work, code quality, and continuous integration patterns.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-950/20 border border-red-500/20 rounded-full shrink-0">
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-xs font-semibold tracking-widest text-red-400 uppercase">SYNC FAILED</span>
            </div>
          </div>

          <div className="p-12 bg-[#111113] border border-white/5 rounded-sm flex flex-col items-center justify-center text-center gap-3">
            <AlertTriangle size={32} className="text-gray-600 mb-2" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Telemetry Lost</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              GitHub telemetry temporarily unavailable. Please check back shortly or inspect network connectivity.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      {/* Background aurora blur for ambient depth */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              GitHub Sync
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              An overview of active engineering work, code quality, and continuous integration patterns.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <div className="w-1.5 h-1.5 absolute rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">LIVE SYNC ACTIVE</span>
            </div>
            {!isLoading && data && (
              <span className="text-[10px] font-mono text-gray-500">
                Synced {timeAgo} // Refreshing
              </span>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm h-[400px] animate-pulse flex flex-col gap-6">
              <div className="h-6 w-1/3 bg-white/5 rounded-md" />
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-full bg-white/5 rounded-sm" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm h-[400px] animate-pulse flex flex-col gap-6">
              <div className="h-6 w-1/3 bg-white/5 rounded-md" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="space-y-2">
                    <div className="h-4 w-1/4 bg-white/5 rounded-md" />
                    <div className="h-3 w-full bg-white/5 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          data && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              
              {/* CARD 1: RECENT REPOSITORIES */}
              <motion.div 
                variants={cardVariants}
                className="lg:col-span-7 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-white/5">
                    <FolderOpen size={14} className="text-gray-400" /> Recent Repositories
                  </h3>
                  <div className="space-y-3">
                    {data.repos.map((repo) => (
                      <a 
                        key={repo.name} 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-4 bg-black/20 border border-white/5 hover:border-white/20 transition-all duration-300 group rounded-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                                {repo.name}
                              </h4>
                              <span className="text-[9px] font-semibold tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 text-gray-400 uppercase rounded-sm">
                                {repo.visibility}
                              </span>
                              {repo.isOpenSource && (
                                <span className="text-[9px] font-semibold tracking-widest px-2 py-0.5 bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 uppercase rounded-sm">
                                  Open Source
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                              {repo.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 shrink-0 mt-0.5">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              {repo.language}
                            </span>
                            {repo.stars > 0 && (
                              <span className="flex items-center gap-0.5">
                                <Star size={12} className="text-yellow-500" />
                                {repo.stars}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>PROVIDER // GITHUB_REST_V3</span>
                  <a 
                    href="https://github.com/AbhirupBhowmick" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    VIEW PROFILE &rarr;
                  </a>
                </div>
              </motion.div>

              {/* CARD 3: LANGUAGES USED */}
              <motion.div 
                variants={cardVariants}
                className="lg:col-span-5 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-white/5">
                    <Layers size={14} className="text-gray-400" /> Language Metrics
                  </h3>
                  <div className="space-y-5">
                    {data.languages.map((lang) => (
                      <div key={lang.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-gray-300 font-mono">{lang.name}</span>
                          <span className="text-gray-500 font-mono">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full bg-gradient-to-r ${lang.color} relative`}
                          >
                            {/* Inner soft glow */}
                            <div className="absolute inset-0 bg-white/20 blur-[1px]" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
                  <span>METRICS_METHOD // REPO_LANG_AGGREGATOR</span>
                </div>
              </motion.div>

              {/* CARD 2: CONTRIBUTION ACTIVITY */}
              <motion.div 
                variants={cardVariants}
                className="lg:col-span-7 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-white/5">
                    <Calendar size={14} className="text-gray-400" /> Contribution Activity
                  </h3>
                  
                  {/* Heatmap Stats Headers */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-3 bg-black/20 border border-white/5 rounded-sm">
                      <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Yearly contributions</p>
                      <p className="text-lg font-bold text-white font-mono">{data.contributions.totalContributions}</p>
                    </div>
                    <div className="p-3 bg-black/20 border border-white/5 rounded-sm">
                      <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Active days</p>
                      <p className="text-lg font-bold text-white font-mono">{data.contributions.activeDays}</p>
                    </div>
                    <div className="p-3 bg-black/20 border border-white/5 rounded-sm">
                      <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Streak</p>
                      <p className="text-lg font-bold text-white font-mono">{data.contributions.streak} Days</p>
                    </div>
                  </div>

                  {/* Heatmap Container */}
                  <div className="relative">
                    
                    {/* Tooltip Overlay */}
                    {hoveredDay && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 text-[10px] font-mono text-gray-300 rounded shadow-2xl z-20 whitespace-nowrap pointer-events-none transition-all">
                        <span className="font-bold text-white">{hoveredDay.count} commits</span> on {formatDate(hoveredDay.date)}
                      </div>
                    )}

                    {/* Responsive Grid Wrapper */}
                    <div className="flex gap-[3px] overflow-x-auto py-2 custom-scrollbar justify-between">
                      {/* Render columns (weeks) */}
                      {calendarColumns.map((week, wIdx) => {
                        // Desktop shows all 52 weeks, mobile/tablet slices to show last 18 weeks
                        const totalWeeks = calendarColumns.length;
                        const isMobileHidden = totalWeeks - wIdx > 18;

                        return (
                          <div 
                            key={wIdx} 
                            className={`flex flex-col gap-[3px] shrink-0 ${isMobileHidden ? 'hidden sm:flex' : 'flex'}`}
                          >
                            {week.map((day) => {
                              // Custom dark green/blue tones
                              let colorClass = "bg-[#121214] border-white/[0.02]";
                              if (day.level === 1) colorClass = "bg-cyan-950/40 border-cyan-800/10";
                              if (day.level === 2) colorClass = "bg-cyan-800/40 border-cyan-600/20";
                              if (day.level === 3) colorClass = "bg-teal-600/40 border-teal-400/30";
                              if (day.level === 4) colorClass = "bg-teal-400/70 border-teal-300/40";

                              return (
                                <div
                                  key={day.date}
                                  onMouseEnter={() => setHoveredDay(day)}
                                  onMouseLeave={() => setHoveredDay(null)}
                                  className={`w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] border transition-colors duration-150 cursor-pointer ${colorClass}`}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-600 mt-2">
                      <span className="hidden sm:inline">1 Year Ago</span>
                      <span className="sm:hidden">Last 18 Weeks</span>
                      <div className="flex items-center gap-1">
                        <span>Less</span>
                        <div className="w-[8px] h-[8px] bg-[#121214] border border-white/5" />
                        <div className="w-[8px] h-[8px] bg-cyan-950/40 border border-cyan-800/10" />
                        <div className="w-[8px] h-[8px] bg-cyan-800/30 border border-cyan-600/20" />
                        <div className="w-[8px] h-[8px] bg-teal-600/40 border border-teal-400/30" />
                        <div className="w-[8px] h-[8px] bg-teal-400/70 border border-teal-300/40" />
                        <span>More</span>
                      </div>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
                  <span>TELEMETRY // TELEMETRY_COMMITS_HEATMAP</span>
                </div>
              </motion.div>

              {/* CARD 4: OPEN SOURCE & COLLABORATION */}
              <motion.div 
                variants={cardVariants}
                className="lg:col-span-5 p-5 sm:p-8 bg-[#111113] border border-white/5 rounded-sm hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-white/5">
                    <Cpu size={14} className="text-gray-400" /> Collaboration Metrics
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/20 border border-white/5 rounded-sm">
                      <div className="flex items-center gap-2 mb-2 text-gray-500">
                        <GitCommit size={14} />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">Commits</span>
                      </div>
                      <span className="text-xl font-bold text-white font-mono">
                        {data.metrics.commits}+
                      </span>
                    </div>

                    <div className="p-4 bg-black/20 border border-white/5 rounded-sm">
                      <div className="flex items-center gap-2 mb-2 text-gray-500">
                        <GitPullRequest size={14} />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">Pull Requests</span>
                      </div>
                      <span className="text-xl font-bold text-white font-mono">
                        {data.metrics.pullRequests}+
                      </span>
                    </div>

                    <div className="p-4 bg-black/20 border border-white/5 rounded-sm">
                      <div className="flex items-center gap-2 mb-2 text-gray-500">
                        <GitFork size={14} />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">Forks</span>
                      </div>
                      <span className="text-xl font-bold text-white font-mono">
                        {data.metrics.forks}
                      </span>
                    </div>

                    <div className="p-4 bg-black/20 border border-white/5 rounded-sm">
                      <div className="flex items-center gap-2 mb-2 text-gray-500">
                        <Star size={14} />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">Total Stars</span>
                      </div>
                      <span className="text-xl font-bold text-white font-mono">
                        {data.metrics.stars}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-indigo-950/10 border border-indigo-500/10 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <GitBranch size={16} />
                      <span className="text-[9px] font-semibold uppercase tracking-wider">Platform Contributions</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-300 font-mono">
                      {data.metrics.publicContribs}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
                  <span>TELEMETRY // TELEMETRY_COLLAB_METRICS</span>
                </div>
              </motion.div>

            </motion.div>
          )
        )}
      </div>
    </section>
  );
}
