'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChartNoAxesCombined } from 'lucide-react';
import Sidebar from '@/components/dashboard/sidebar';
import GoalBanner from '@/components/plan/goal-banner';
import WeeklyCalendar from '@/components/plan/weekly-calendar';
import DailyPlanCard from '@/components/plan/daily-plan-card';
import ProgressSidebar from '@/components/plan/progress-sidebar';
import EmptyState from '@/components/plan/empty-state';
import GoalModal from '@/components/plan/goal-modal';

// Mock data - replace with real data from backend
const mockGoal = {
  title: 'Pass Cloud Architecture Exam',
  deadline: '2026-05-26',
};

const mockDailyPlans = [
  {
    id: '1',
    dayLabel: 'Monday',
    date: 'May 12, 2026',
    materials: [
      { id: 'm1', title: 'Cloud Fundamentals - Chapter 1', estimatedTime: 25 },
      { id: 'm2', title: 'AWS Services Overview', estimatedTime: 20 },
    ],
    topics: ['Cloud Computing Basics', 'IaaS vs PaaS vs SaaS', 'AWS Regions'],
    isCompleted: true,
  },
  {
    id: '2',
    dayLabel: 'Tuesday',
    date: 'May 13, 2026',
    materials: [
      { id: 'm3', title: 'Networking in the Cloud', estimatedTime: 30 },
    ],
    topics: ['VPC', 'Subnets', 'Security Groups'],
    isCompleted: true,
  },
  {
    id: '3',
    dayLabel: 'Wednesday',
    date: 'May 14, 2026',
    materials: [
      { id: 'm4', title: 'Storage Solutions', estimatedTime: 35 },
      { id: 'm5', title: 'Database Services', estimatedTime: 25 },
    ],
    topics: ['S3', 'EBS', 'RDS', 'DynamoDB'],
    isCompleted: false,
    isToday: true,
  },
  {
    id: '4',
    dayLabel: 'Thursday',
    date: 'May 15, 2026',
    materials: [
      { id: 'm6', title: 'Compute Services Deep Dive', estimatedTime: 40 },
    ],
    topics: ['EC2', 'Lambda', 'ECS', 'Fargate'],
    isCompleted: false,
  },
  {
    id: '5',
    dayLabel: 'Friday',
    date: 'May 16, 2026',
    materials: [
      { id: 'm7', title: 'Security Best Practices', estimatedTime: 30 },
    ],
    topics: ['IAM', 'Encryption', 'Compliance'],
    isCompleted: false,
  },
  {
    id: '6',
    dayLabel: 'Saturday',
    date: 'May 17, 2026',
    materials: [
      { id: 'm8', title: 'Architecture Patterns', estimatedTime: 45 },
    ],
    topics: ['High Availability', 'Disaster Recovery', 'Cost Optimization'],
    isCompleted: false,
  },
  {
    id: '7',
    dayLabel: 'Sunday',
    date: 'May 18, 2026',
    materials: [
      { id: 'm9', title: 'Practice Exam Review', estimatedTime: 60 },
    ],
    topics: ['Review All Topics', 'Practice Questions'],
    isCompleted: false,
  },
];

const mockKnowledgeGaps = [
  { id: '1', topic: 'VPC Peering', docReference: 'Networking Ch. 3' },
  { id: '2', topic: 'Lambda Cold Starts', docReference: 'Compute Ch. 5' },
  { id: '3', topic: 'S3 Lifecycle Policies', docReference: 'Storage Ch. 2' },
];

export default function LearningPlanPage() {
  const router = useRouter();
  const [hasGoal, setHasGoal] = useState(true);
  const [goal, setGoal] = useState(mockGoal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyPlans, setDailyPlans] = useState(mockDailyPlans);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday (today)
  const [weekOffset, setWeekOffset] = useState(0);

  // Calculate days until goal
  const daysLeft = useMemo(() => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [goal.deadline]);

  // Calculate overall progress
  const completedDays = dailyPlans.filter((d) => d.isCompleted).length;
  const overallProgress = Math.round((completedDays / dailyPlans.length) * 100);

  // Generate week days data
  const weekDays = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    return days.map((dayName, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + index + weekOffset * 7);
      
      const plan = dailyPlans[index];
      
      return {
        dayName,
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        isCompleted: plan?.isCompleted || false,
        hasContent: !!plan?.materials.length,
      };
    });
  }, [weekOffset, dailyPlans]);

  const weekLabel = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return `${monday.toLocaleDateString('en-US', options)} - ${sunday.toLocaleDateString('en-US', options)}`;
  }, [weekOffset]);

  const handleToggleComplete = (index: number) => {
    setDailyPlans((prev) =>
      prev.map((plan, i) =>
        i === index ? { ...plan, isCompleted: !plan.isCompleted } : plan
      )
    );
  };

  const handleStartSession = () => {
    router.push('/dashboard/chat');
  };

  const handleSaveGoal = (newGoal: { title: string; deadline: string }) => {
    setGoal(newGoal);
    setHasGoal(true);
  };

  const sidebarContent = (
    <ProgressSidebar
      overallProgress={overallProgress}
      completedDays={completedDays}
      totalDays={dailyPlans.length}
      knowledgeGaps={mockKnowledgeGaps}
      suggestedAction={{
        message: 'Based on your gaps, review VPC Peering concepts today.',
        chapterRef: 'Networking Ch. 3',
      }}
    />
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                My Learning Plan
              </h1>
              <p className="text-gray-400">
                Your personalized study schedule
              </p>
            </div>

            {/* Mobile Progress Sheet Trigger */}
            {hasGoal && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden bg-purple-500/10 border-purple-500/30 text-purple-400"
                  >
                    <ChartNoAxesCombined size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-[#0A0F1E] border-[#1F2937] h-[80vh] overflow-y-auto">
                  <div className="pt-4">
                    {sidebarContent}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {!hasGoal ? (
            <EmptyState onSetGoal={() => setIsModalOpen(true)} />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                {/* Goal Banner */}
                <GoalBanner
                  goalTitle={goal.title}
                  daysLeft={daysLeft}
                  onEdit={() => setIsModalOpen(true)}
                />

                {/* Weekly Calendar */}
                <WeeklyCalendar
                  days={weekDays}
                  selectedDay={selectedDayIndex}
                  onSelectDay={setSelectedDayIndex}
                  onPreviousWeek={() => setWeekOffset((prev) => prev - 1)}
                  onNextWeek={() => setWeekOffset((prev) => prev + 1)}
                  weekLabel={weekLabel}
                />

                {/* Daily Plan Cards */}
                <div className="space-y-4">
                  <h2 className="text-white font-bold text-lg">Daily Schedule</h2>
                  {dailyPlans.map((plan, index) => (
                    <DailyPlanCard
                      key={plan.id}
                      dayLabel={plan.dayLabel}
                      date={plan.date}
                      materials={plan.materials}
                      topics={plan.topics}
                      isCompleted={plan.isCompleted}
                      isToday={plan.isToday}
                      onToggleComplete={() => handleToggleComplete(index)}
                      onStartSession={handleStartSession}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-8">
                  {sidebarContent}
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      {/* Goal Modal */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
        initialGoal={hasGoal ? goal : undefined}
      />
    </div>
  );
}
