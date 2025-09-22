import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: MetricCardProps) {
  const variantStyles = {
    default: 'bg-card',
    primary: 'bg-gradient-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    danger: 'bg-destructive text-destructive-foreground',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    danger: 'text-destructive-foreground',
  };

  return (
    <Card className={cn('p-6 transition-all hover:shadow-lg', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
          )}>
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className={cn(
              'text-sm',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-75'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', 
          variant === 'default' ? 'bg-accent' : 'bg-white/20'
        )}>
          <Icon className={cn('h-6 w-6', iconStyles[variant])} />
        </div>
      </div>
    </Card>
  );
}