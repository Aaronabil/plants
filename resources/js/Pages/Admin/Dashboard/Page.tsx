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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
    {
        name: 'Jan',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Feb',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Mar',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Apr',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'May',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Jun',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Jul',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Aug',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Sep',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Oct',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Nov',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Dec',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
];

export default function PageDashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports">
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
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
                                    $45,231.89
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
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
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">
                                    +180.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Profit
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +12,234
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-3">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Users
                                </CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
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
                                        Recent transactions from your store.
                                    </CardDescription>
                                </div>
                                <Button asChild size="sm" className="ml-auto gap-1">
                                    <Link href="#">
                                        View All
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={data}>
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
                                            tickFormatter={(value) =>
                                                `$${value}`
                                            }
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
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage
                                            src="/avatars/01.png"
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Olivia Martin
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            olivia.martin@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$1,999.00
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage
                                            src="/avatars/02.png"
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>JL</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Jackson Lee
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            jackson.lee@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$39.00
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage
                                            src="/avatars/03.png"
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>IN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Isabella Nguyen
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            isabella.nguyen@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$299.00
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage
                                            src="/avatars/04.png"
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>WK</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            William Kim
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            will@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$99.00
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage
                                            src="/avatars/05.png"
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>SD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Sofia Davis
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            sofia.davis@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$39.00
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
