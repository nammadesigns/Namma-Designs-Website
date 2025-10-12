import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MessageSquare, CheckCircle, XCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    totalFeedback: 0,
    pendingMessages: 0,
  });
  const [feedback, setFeedback] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchStats();
    fetchFeedback();
    fetchMessages();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
  };

  const fetchStats = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    const { count: totalVisits } = await supabase
      .from('visitor_analytics')
      .select('*', { count: 'exact', head: true });

    const { count: todayVisits } = await supabase
      .from('visitor_analytics')
      .select('*', { count: 'exact', head: true })
      .gte('visited_at', today);

    const { count: totalFeedback } = await supabase
      .from('customer_feedback')
      .select('*', { count: 'exact', head: true });

    const { count: pendingMessages } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    setStats({
      totalVisits: totalVisits || 0,
      todayVisits: todayVisits || 0,
      totalFeedback: totalFeedback || 0,
      pendingMessages: pendingMessages || 0,
    });
  };

  const fetchFeedback = async () => {
    const { data } = await supabase
      .from('customer_feedback')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setFeedback(data);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMessages(data);
  };

  const toggleFeedbackApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('customer_feedback')
      .update({ is_approved: !currentStatus })
      .eq('id', id);

    if (!error) {
      toast({ title: "Success", description: "Feedback updated successfully" });
      fetchFeedback();
    }
  };

  const markMessageRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      fetchMessages();
      fetchStats();
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => navigate('/')}>Back to Site</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFeedback}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingMessages}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow key={msg.id} className={!msg.is_read ? 'bg-primary/5' : ''}>
                        <TableCell>{msg.name}</TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                        <TableCell>{new Date(msg.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {!msg.is_read && (
                            <Button size="sm" onClick={() => markMessageRead(msg.id)}>
                              Mark Read
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Feedback Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.customer_name}</TableCell>
                        <TableCell>{item.rating} ⭐</TableCell>
                        <TableCell className="max-w-xs truncate">{item.feedback_text}</TableCell>
                        <TableCell>
                          {item.is_approved ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={16} /> Approved
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-600">
                              <XCircle size={16} /> Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={item.is_approved ? "outline" : "default"}
                            onClick={() => toggleFeedbackApproval(item.id, item.is_approved)}
                          >
                            {item.is_approved ? 'Unapprove' : 'Approve'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;