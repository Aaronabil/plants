import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { Order } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

interface DashboardProps {
    revenue: {
        today: number;
        month: number;
        total: number;
    };
    orders: {
        today: number;
        month: number;
        total: number;
    };
    profit: {
        today: number;
        month: number;
        total: number;
    };
    visitors: {
        today: number;
        month: number;
        total: number;
    };
    conversion_rate: number;
    monthly_sales: Array<{
        name: string;
        total: number;
    }>;
    recent_orders: Order[];
}

export default function PageDashboard({
    revenue,
    orders,
    profit,
    visitors,
    conversion_rate,
    monthly_sales,
    recent_orders
}: DashboardProps) {

    // Formatting currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {/* <TabsTrigger value="analytics">
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports">
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger> */}
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card x-chunk="dashboard-01-chunk-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Revenue
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(revenue.total)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {formatCurrency(revenue.month)} this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Orders
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+{orders.total}</div>
                                <p className="text-xs text-muted-foreground">
                                    +{orders.month} this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Profit (Est.)
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(profit.total)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {formatCurrency(profit.month)} this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-3">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Visitors
                                </CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+{visitors.total}</div>
                                <p className="text-xs text-muted-foreground">
                                    {conversion_rate}% Conversion Rate
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card className="col-span-1 xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>Transactions</CardTitle>
                                    <CardDescription>
                                        Monthly sales performance.
                                    </CardDescription>
                                </div>
                                {/* <Button asChild size="sm" className="ml-auto gap-1">
                                    <Link href="#">
                                        View All
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button> */}
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={monthly_sales}>
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `Rp${value / 1000}k`}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="currentColor"
                                            radius={[4, 4, 0, 0]}
                                            className="fill-primary"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 lg:col-span-3 mt-5">
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {recent_orders.length === 0 ? (
                                    <p className="text-center text-muted-foreground">No recent sales found.</p>
                                ) : (
                                    recent_orders.map((order) => (
                                        <div key={order.id} className="flex items-center gap-4">
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarFallback>
                                                    {order.user?.name ? order.user.name.substring(0, 2).toUpperCase() : 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {order.user?.name || 'Guest'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.user?.email || '-'}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                +{formatCurrency(parseFloat(order.total_amount))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
