import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Check, Trophy, Flame } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  name: string;
  completed: boolean;
  progress: number;
}

type SessionType = 'work' | 'short_break' | 'long_break';

const SESSION_DURATIONS = {
  work: 25,
  short_break: 5,
  long_break: 15,
};

const SESSION_XP = {
  work: 10,
  short_break: 3,
  long_break: 5,
};

export default function FocusPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATIONS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [userStats, setUserStats] = useState({
    level: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    loadUserStats();
    loadTasks();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const loadUserStats = async () => {
    const { data } = await supabase
      .from('focus_user_stats')
      .select('*')
      .maybeSingle();

    if (data) {
      setUserStats({
        level: data.level,
        totalXp: data.total_xp,
        currentStreak: data.current_streak,
        longestStreak: data.longest_streak,
      });
    } else {
      await supabase.from('focus_user_stats').insert({
        total_xp: 0,
        level: 1,
        current_streak: 0,
        longest_streak: 0,
      });
    }
  };

  const loadTasks = () => {
    const savedTasks = localStorage.getItem('auratimer-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem('auratimer-tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const addTask = () => {
    if (newTaskName.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        name: newTaskName.trim(),
        completed: false,
        progress: 0,
      };
      saveTasks([...tasks, task]);
      setNewTaskName('');
    }
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleSessionComplete = async () => {
    setIsRunning(false);

    const xpEarned = SESSION_XP[sessionType];
    const newTotalXp = userStats.totalXp + xpEarned;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    await supabase.from('focus_sessions').insert({
      task_name: 'Focus Session',
      session_type: sessionType,
      duration: SESSION_DURATIONS[sessionType],
      completed: true,
      xp_earned: xpEarned,
    });

    const today = new Date().toISOString().split('T')[0];
    const { data: stats } = await supabase
      .from('focus_user_stats')
      .select('*')
      .maybeSingle();

    let newStreak = userStats.currentStreak;
    if (stats?.last_session_date) {
      const lastDate = new Date(stats.last_session_date);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        newStreak = userStats.currentStreak + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newLongestStreak = Math.max(newStreak, userStats.longestStreak);

    await supabase
      .from('focus_user_stats')
      .update({
        total_xp: newTotalXp,
        level: newLevel,
        current_streak: newStreak,
        longest_streak: newLongestStreak,
        last_session_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('id', stats?.id);

    setUserStats({
      level: newLevel,
      totalXp: newTotalXp,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
    });

    checkAchievements(newLevel, newStreak);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus Session Complete!', {
        body: `Great job! You earned ${xpEarned} XP.`,
      });
    }
  };

  const checkAchievements = async (level: number, streak: number) => {
    const newAchievements: string[] = [];

    if (level >= 5 && !achievements.includes('level_5')) {
      newAchievements.push('level_5');
      await supabase.from('focus_achievements').insert({
        achievement_name: 'Level 5 Reached',
        achievement_type: 'level',
        badge_icon: '⭐',
      });
    }

    if (streak >= 7 && !achievements.includes('streak_7')) {
      newAchievements.push('streak_7');
      await supabase.from('focus_achievements').insert({
        achievement_name: '7-Day Streak',
        achievement_type: 'streak',
        badge_icon: '🔥',
      });
    }

    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    if (timeLeft === 0) {
      setTimeLeft(SESSION_DURATIONS[sessionType] * 60);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(SESSION_DURATIONS[sessionType] * 60);
  };

  const changeSessionType = (type: SessionType) => {
    setSessionType(type);
    setTimeLeft(SESSION_DURATIONS[type] * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const xpToNextLevel = ((userStats.level) * 100) - userStats.totalXp;
  const xpProgress = ((userStats.totalXp % 100) / 100) * 100;

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Beginner';
    if (level < 10) return 'Intermediate';
    if (level < 20) return 'Advanced';
    return 'Master';
  };

  return (
    <AppLayout appTitle="AuraTimer" appSubtitle="Gamified productivity timer" maxWidth="full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Tasks</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vexto-blue"
              />
              <Button onClick={addTask} className="gap-2">
                <Plus size={20} />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks yet. Add one to get started!</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth ${
                        task.completed
                          ? 'bg-vexto-blue border-vexto-blue'
                          : 'border-gray-300 hover:border-vexto-blue'
                      }`}
                    >
                      {task.completed && <Check size={14} className="text-white" />}
                    </button>
                    <span
                      className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                    >
                      {task.name}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-smooth"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-6">
            <div className="inline-flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => changeSessionType('work')}
                className={`px-6 py-2 rounded-md transition-smooth ${
                  sessionType === 'work'
                    ? 'bg-white text-vexto-blue font-medium shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => changeSessionType('short_break')}
                className={`px-6 py-2 rounded-md transition-smooth ${
                  sessionType === 'short_break'
                    ? 'bg-white text-vexto-blue font-medium shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Short
              </button>
              <button
                onClick={() => changeSessionType('long_break')}
                className={`px-6 py-2 rounded-md transition-smooth ${
                  sessionType === 'long_break'
                    ? 'bg-white text-vexto-blue font-medium shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Long
              </button>
            </div>

            <div className="text-8xl font-bold text-vexto-charcoal">{formatTime(timeLeft)}</div>

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={isRunning ? pauseTimer : startTimer}
                size="lg"
                className="gap-2 px-8"
              >
                {isRunning ? (
                  <>
                    <Pause size={20} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    Start
                  </>
                )}
              </Button>
              <Button onClick={resetTimer} variant="secondary" size="lg" className="gap-2">
                <RotateCcw size={20} />
                Reset
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-vexto-blue/10 to-purple-100 p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="text-vexto-blue" size={24} />
                  <div>
                    <div className="text-sm text-gray-600">Level {userStats.level}</div>
                    <div className="font-bold text-lg text-vexto-charcoal">
                      {getLevelTitle(userStats.level)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-vexto-blue">{userStats.totalXp} XP</div>
                  <div className="text-xs text-gray-600">{xpToNextLevel} XP to next level</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-vexto-blue h-3 rounded-full transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="text-orange-500" size={20} />
                    <span className="text-sm text-gray-600">Current Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-500">
                    {userStats.currentStreak} days
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Trophy className="text-yellow-500" size={20} />
                    <span className="text-sm text-gray-600">Longest Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-500">
                    {userStats.longestStreak} days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
