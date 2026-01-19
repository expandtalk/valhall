import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Eye, Clock } from 'lucide-react';

interface SecurityAlert {
  alert_type: string;
  user_count: number;
  last_occurrence: string;
}

interface AuditLogEntry {
  id: string;
  event_type: string;
  user_id: string;
  target_user_id: string;
  old_role: string;
  new_role: string;
  success: boolean;
  error_message: string;
  created_at: string;
}

export const SecurityAuditDashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load security alerts
      const { data: alertsData, error: alertsError } = await supabase
        .rpc('get_security_alerts', { hours_back: 24 });

      if (alertsError) throw alertsError;
      setAlerts(alertsData || []);

      // Load recent audit logs
      const { data: logsData, error: logsError } = await supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (logsError) throw logsError;
      setAuditLogs(logsData || []);
    } catch (err) {
      console.error('Error loading security data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load security data');
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeColor = (eventType: string) => {
    if (eventType.includes('ATTEMPT')) return 'destructive';
    if (eventType.includes('GRANTED') || eventType.includes('MODIFIED')) return 'default';
    if (eventType.includes('REVOKED')) return 'secondary';
    return 'outline';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Loading security data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Audit Dashboard</h2>
          <p className="text-muted-foreground">Monitor security events and potential threats</p>
        </div>
        <Button onClick={loadSecurityData} size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Security Alerts (Last 24 Hours)
          </CardTitle>
          <CardDescription>
            Suspicious activities and failed security attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No security alerts in the last 24 hours</p>
              <p className="text-sm">Your system appears secure</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Badge variant="destructive" className="mb-2">
                      {alert.alert_type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {alert.user_count} occurrence{alert.user_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Last seen</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(alert.last_occurrence)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Security Events
          </CardTitle>
          <CardDescription>
            Latest 20 security-related activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No audit logs available
            </p>
          ) : (
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={getEventTypeColor(log.event_type)}>
                      {log.event_type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">
                        {log.success ? 'Success' : 'Failed'}
                      </p>
                      {log.error_message && (
                        <p className="text-xs text-muted-foreground">{log.error_message}</p>
                      )}
                      {log.old_role && log.new_role && (
                        <p className="text-xs text-muted-foreground">
                          Role: {log.old_role} → {log.new_role}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(log.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};