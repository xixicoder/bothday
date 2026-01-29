'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, Watch, CreditCard, Shirt, Zap, 
  CheckCircle2, AlertTriangle, Rocket
} from 'lucide-react';

// --- 核心配置 ---
const TARGET_DATE = '2026-02-06T00:00:00';
const USER_NAME = '唐源';
const MAX_SELECTION = 3;

const GIFTS = [
  { id: 'lego', name: '乐高法拉利 Daytona', desc: '1:8 机械传动 / V12引擎复刻', tag: '精密制造', icon: <Cpu className="w-8 h-8" /> },
  { id: 'watch', name: 'Apple Watch SE3', desc: '全天候生物监测 / 数据中枢', tag: '数字生命', icon: <Watch className="w-8 h-8" /> },
  { id: 'card', name: 'Topps Chrome 球星卡', desc: '折射率 1/1 / 稀有物种捕捉', tag: '概率美学', icon: <CreditCard className="w-8 h-8" /> },
  { id: 'vest', name: '专业机能运动背心', desc: '高强度纤维 / 动态散热装甲', tag: '物理增强', icon: <Shirt className="w-8 h-8" /> },
  { id: 'brush', name: '声波净化终端', desc: '40,000次震动/分 / 深度清洁', tag: '系统维护', icon: <Zap className="w-8 h-8" /> }
];

const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`relative inline-block glitch ${className}`}>
    {children}
  </span>
);

const NeonBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-xl opacity-75 blur-sm animate-border-flow" 
         style={{ backgroundSize: '200% 200%' }} />
    <div className="relative bg-card rounded-xl border border-primary/30">
      {children}
    </div>
  </div>
);

const CyberButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "primary" 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost"
}) => {
  const baseStyles = "relative px-8 py-4 font-cyber font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: `bg-gradient-to-r from-neon-cyan to-neon-blue text-background 
              hover:shadow-[0_0_30px_hsl(180_100%_50%/0.6),inset_0_0_20px_hsl(180_100%_50%/0.3)]
              border-2 border-neon-cyan cyber-glow-cyan`,
    secondary: `bg-gradient-to-r from-neon-pink to-neon-purple text-background
                hover:shadow-[0_0_30px_hsl(320_100%_60%/0.6),inset_0_0_20px_hsl(320_100%_60%/0.3)]
                border-2 border-neon-pink cyber-glow-pink`,
    ghost: `bg-transparent text-muted-foreground border border-muted-foreground/30
            hover:border-primary hover:text-primary hover:bg-primary/10`
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

const CountdownHeader = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(TARGET_DATE).getTime() - now;
      setTimeLeft(distance);
    }, 100);
    return () => clearInterval(timer);
  }, []);
  
  const format = (n: number) => String(n).padStart(2, '0');
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const ms = Math.floor((timeLeft % 1000) / 10);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/30 px-4 py-3">
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
      
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        <div className="flex items-center gap-2 text-primary">
          <div className="relative">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping" />
          </div>
          <span className="text-xs font-cyber font-bold tracking-[0.3em] uppercase cyber-text-glow">
            系统在线
          </span>
        </div>
        
        <div className="font-mono text-primary font-bold tracking-widest text-sm tabular-nums cyber-text-glow flicker">
          T-{days}D:{format(hours)}:{format(minutes)}:{format(seconds)}:
          <span className="text-neon-pink">{format(ms)}</span>
        </div>
      </div>
    </div>
  );
};

const IntroView = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="h-full flex flex-col justify-center items-center text-center p-6 space-y-8"
  >
    {/* Decorative elements */}
    <div className="absolute top-20 left-4 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />
    <div className="absolute top-20 right-4 w-px h-32 bg-gradient-to-b from-secondary/50 to-transparent" />
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/50 bg-primary/10 text-primary text-xs font-cyber tracking-[0.3em] uppercase cyber-glow-cyan">
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        身份识别确认
      </div>
      
      <h1 className="text-4xl md:text-6xl font-cyber font-black tracking-tight">
        <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink cyber-text-glow">
          {USER_NAME}
        </GlitchText>
        <br />
        <span className="text-foreground text-3xl md:text-4xl">2026 生日计划</span>
      </h1>
      
      <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs font-mono">
        <span className="text-primary">&lt;</span>
        BIRTHDAY_PROTOCOL_v2.0
        <span className="text-primary">/&gt;</span>
      </div>
      
      <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed font-mono">
        这是一份专属的生日惊喜协议。<br/>
        <span className="text-primary">无需验证</span>，听从直觉，选择你的装备。
      </p>
    </motion.div>
    
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <CyberButton onClick={onStart}>
        <Terminal size={18} />
        初始化系统
      </CyberButton>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="absolute bottom-8 left-0 right-0 flex justify-center"
    >
      <div className="flex items-center gap-2 text-muted-foreground/50 text-xs font-mono">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-muted-foreground/30" />
        SCROLL_TO_BEGIN
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-muted-foreground/30" />
      </div>
    </motion.div>
  </motion.div>
);

const SelectionView = ({ 
  selected, 
  onSelect, 
  onConfirm, 
  shaking 
}: { 
  selected: string[]; 
  onSelect: (id: string) => void; 
  onConfirm: () => void;
  shaking: boolean;
}) => (
  <motion.div 
    initial={{ x: 50, opacity: 0 }} 
    animate={{ x: 0, opacity: 1 }} 
    exit={{ x: -50, opacity: 0 }} 
    className="pb-28 pt-24 px-4"
  >
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-cyber font-bold text-foreground flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-neon-pink rounded-sm"/>
          选择装备
        </h2>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          // 请选择最心动的 <span className="text-primary">{MAX_SELECTION}</span> 项物资
        </p>
      </div>
      
      <div className="text-right">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-cyber font-black ${
            selected.length === MAX_SELECTION 
              ? 'text-neon-yellow cyber-text-glow' 
              : 'text-muted-foreground'
          }`}>
            {selected.length}
          </span>
          <span className="text-muted-foreground/50 font-mono text-sm">/{MAX_SELECTION}</span>
        </div>
        <div className="flex gap-1 mt-1">
          {[...Array(MAX_SELECTION)].map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-1 rounded-full transition-all duration-300 ${
                i < selected.length 
                  ? 'bg-neon-cyan shadow-[0_0_8px_hsl(180_100%_50%/0.8)]' 
                  : 'bg-muted'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
    
    <AnimatePresence>
      {shaking && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: -10 }} 
          className="fixed top-20 left-4 right-4 z-40 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-xs px-4 py-3 flex items-center justify-center gap-2 border border-destructive font-cyber"
          style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
        >
          <AlertTriangle size={14} className="animate-pulse" />
          内存溢出：最多只能选择 {MAX_SELECTION} 项
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="grid grid-cols-1 gap-4">
      {GIFTS.map((gift, index) => {
        const isSelected = selected.includes(gift.id);
        return (
          <motion.div 
            key={gift.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }} 
            onClick={() => onSelect(gift.id)} 
            className={`relative p-4 transition-all duration-300 cursor-pointer group overflow-hidden ${
              isSelected 
                ? 'bg-card border-2 border-neon-cyan shadow-[0_0_30px_hsl(180_100%_50%/0.2),inset_0_0_30px_hsl(180_100%_50%/0.05)]' 
                : 'bg-card/50 border border-muted hover:border-primary/50'
            }`}
            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
          >
            {/* Scan line effect */}
            {isSelected && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-neon-cyan/20 to-transparent animate-scan" />
              </div>
            )}
            
            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 ${isSelected ? 'border-neon-cyan' : 'border-muted/50'}`} />
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 ${isSelected ? 'border-neon-cyan' : 'border-muted/50'}`} />
            
            <div className="flex items-start gap-4 relative">
              <div className={`p-3 transition-all duration-300 ${
                isSelected 
                  ? 'bg-neon-cyan/20 text-neon-cyan cyber-text-glow' 
                  : 'bg-muted text-muted-foreground group-hover:text-primary'
              }`}
              style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                {gift.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h3 className={`font-cyber font-bold text-lg tracking-wide truncate ${
                    isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {gift.name}
                  </h3>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 className="text-neon-cyan w-5 h-5" />
                    </motion.div>
                  )}
                </div>
                
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 mt-2 text-[10px] font-mono uppercase tracking-wider ${
                  isSelected 
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' 
                    : 'bg-muted text-muted-foreground border border-muted'
                }`}>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {gift.tag}
                </div>
                
                <p className="text-sm text-muted-foreground mt-2 leading-tight font-mono">
                  {gift.desc}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
    
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
      <CyberButton 
        disabled={selected.length === 0} 
        onClick={onConfirm}
        variant={selected.length > 0 ? "secondary" : "ghost"}
      >
        {selected.length === 0 ? '等待数据输入...' : '执行写入程序'}
      </CyberButton>
    </div>
  </motion.div>
);

const ConfirmView = ({ 
  selected, 
  onBack, 
  onConfirm 
}: { 
  selected: string[]; 
  onBack: () => void; 
  onConfirm: () => void 
}) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="h-full flex flex-col justify-center px-6 pt-16"
  >
    <NeonBorder className="w-full">
      <div className="p-6 relative overflow-hidden">
        <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
        
        <h2 className="text-xl font-cyber font-bold text-foreground mb-6 flex items-center gap-3">
          <Terminal size={20} className="text-primary" />
          确认上传清单
        </h2>
        
        <div className="space-y-3 mb-8">
          {selected.map((id, index) => { 
            const item = GIFTS.find(g => g.id === id); 
            return (
              <motion.div 
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-muted/50 border border-primary/20"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <span className="text-neon-cyan">{item?.icon}</span>
                <span className="text-foreground text-sm font-cyber font-medium">{item?.name}</span>
              </motion.div>
            ); 
          })}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={onBack} 
            className="flex-1 py-3 border border-muted-foreground/30 text-muted-foreground text-sm font-cyber font-medium hover:bg-muted/50 hover:border-primary hover:text-primary transition-all"
            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
          >
            返回修改
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-background text-sm font-cyber font-bold cyber-glow-cyan hover:shadow-[0_0_40px_hsl(180_100%_50%/0.6)] transition-all"
            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
          >
            确认发射
          </button>
        </div>
      </div>
    </NeonBorder>
  </motion.div>
);

const SuccessView = ({ selected }: { selected: string[] }) => {
  const choicesText = selected.length > 0 ? selected.join('+').toUpperCase() : "ERROR-NO-DATA";
  const missionCode = `[MISSION-2026] :: ${choicesText} :: [AUTH-${Math.floor(Math.random() * 9000) + 1000}]`;
  
  const copyToClipboard = () => { 
    navigator.clipboard.writeText(missionCode); 
    alert('密钥已复制！请发送给唐源指挥官'); 
  };
  
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="h-full flex flex-col justify-center items-center text-center p-6"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-full flex items-center justify-center border-2 border-neon-cyan pulse-neon">
          <Rocket className="w-12 h-12 text-neon-cyan" />
        </div>
        <div className="absolute -inset-4 border border-neon-cyan/30 rounded-full animate-ping" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-cyber font-black text-foreground mb-2">
          <GlitchText>数据已锁定</GlitchText>
        </h2>
        <p className="text-muted-foreground text-sm mb-8 font-mono">
          生日惊喜协议已生效。
        </p>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm"
      >
        <NeonBorder>
          <div className="p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
            <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
            
            <p className="text-xs text-primary font-mono mb-2 text-left flex items-center gap-1">
              <span className="text-neon-pink">&gt;&gt;</span> GENERATED_HASH:
            </p>
            <p className="font-mono text-foreground text-sm break-all text-left leading-relaxed">
              {missionCode}
            </p>
          </div>
        </NeonBorder>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 w-full max-w-sm"
      >
        <CyberButton onClick={copyToClipboard}>
          <span className="animate-pulse">⚡️</span>
          复制密钥并发送
        </CyberButton>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-muted-foreground mt-8 max-w-xs font-mono leading-relaxed"
      >
        <span className="text-destructive">*警告：</span>请务必将上方密钥发送给唐源<br/>
        否则系统无法执行实体物资投放
      </motion.p>
    </motion.div>
  );
};

export default function BirthdayApp() {
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hasVoted_2026');
    const savedChoices = localStorage.getItem('mission_choices');
    
    if (savedChoices) {
      try {
        setSelected(JSON.parse(savedChoices));
      } catch (e) {
        console.error("读取存档失败");
      }
    }
    
    if (saved) setView(3);
  }, []);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      if (selected.length >= MAX_SELECTION) {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
        return;
      }
      setSelected([...selected, id]);
    }
  };

  const handleConfirm = () => {
    localStorage.setItem('hasVoted_2026', 'true');
    localStorage.setItem('mission_choices', JSON.stringify(selected));
    setView(3);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-cyber selection:bg-primary/30">
      <CountdownHeader />
      
      <main className="h-screen pt-16 overflow-y-auto overflow-x-hidden relative">
        {/* Background effects */}
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-30" />
        <div className="fixed inset-0 scanlines pointer-events-none opacity-10" />
        
        {/* Glow orbs */}
        <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="fixed top-[40%] right-[-5%] w-[300px] h-[300px] bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {view === 0 && <IntroView key="intro" onStart={() => setView(1)} />}
          {view === 1 && (
            <SelectionView 
              key="select" 
              selected={selected} 
              onSelect={handleSelect}
              onConfirm={() => setView(2)}
              shaking={shaking}
            />
          )}
          {view === 2 && (
            <ConfirmView 
              key="confirm" 
              selected={selected}
              onBack={() => setView(1)}
              onConfirm={handleConfirm}
            />
          )}
          {view === 3 && <SuccessView key="success" selected={selected} />}
        </AnimatePresence>
      </main>
    </div>
  );
}