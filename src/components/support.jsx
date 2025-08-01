"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    MessageCircle,
    Mail,
    Phone,
    Search,
    Send,
    Clock,
    CheckCircle,
    AlertCircle,
    User,
    Package,
    CreditCard,
    Truck,
    RotateCcw,
    HelpCircle,
} from "lucide-react"

export default function CustomerSupport() {
    const [searchQuery, setSearchQuery] = useState("")
    const [chatMessage, setChatMessage] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const supportCategories = [
        { icon: Package, label: "Orders & Shipping", count: 12 },
        { icon: CreditCard, label: "Payment & Billing", count: 8 },
        { icon: RotateCcw, label: "Returns & Refunds", count: 15 },
        { icon: User, label: "Account Issues", count: 6 },
        { icon: Truck, label: "Delivery Problems", count: 9 },
        { icon: HelpCircle, label: "General Questions", count: 20 },
    ]

    const faqItems = [
        {
            question: "How can I track my order?",
            answer:
                "You can track your order by logging into your account and visiting the 'My Orders' section. You'll find tracking information and estimated delivery dates there.",
        },
        {
            question: "What is your return policy?",
            answer:
                "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to certain product categories.",
        },
        {
            question: "How long does shipping take?",
            answer:
                "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. Free shipping is available on orders over $50.",
        },
        {
            question: "Can I change or cancel my order?",
            answer:
                "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team for assistance.",
        },
        {
            question: "Do you ship internationally?",
            answer:
                "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.",
        },
    ]

    const recentTickets = [
        { id: "TK-001", subject: "Order not received", status: "In Progress", date: "2024-01-15" },
        { id: "TK-002", subject: "Refund request", status: "Resolved", date: "2024-01-14" },
        { id: "TK-003", subject: "Product defect", status: "Pending", date: "2024-01-13" },
    ]

    const filteredFAQ = faqItems.filter(
        (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
                    <p className="text-gray-600">We're here to help you with any questions or concerns</p>
                </div>

                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Online
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                            <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
                            <Badge variant="secondary">24h response</Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                            <p className="text-gray-600 text-sm mb-4">Call us at (555) 123-4567</p>
                            <Badge variant="secondary">Mon-Fri 9AM-6PM</Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Support Interface */}
                <Tabs defaultValue="chat" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="chat">Live Chat</TabsTrigger>
                        <TabsTrigger value="ticket">Create Ticket</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                        <TabsTrigger value="status">My Tickets</TabsTrigger>
                    </TabsList>

                    {/* Live Chat Tab */}
                    <TabsContent value="chat" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageCircle className="h-5 w-5" />
                                            Live Chat
                                        </CardTitle>
                                        <CardDescription>Chat with our support team in real-time</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Chat Messages */}
                                            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                        S
                                                    </div>
                                                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                                                        <p className="text-sm">Hello! How can I help you today?</p>
                                                        <span className="text-xs text-gray-500">2:30 PM</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 justify-end">
                                                    <div className="bg-blue-600 text-white rounded-lg p-3 shadow-sm max-w-xs">
                                                        <p className="text-sm">Hi, I have a question about my recent order.</p>
                                                        <span className="text-xs text-blue-200">2:31 PM</span>
                                                    </div>
                                                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                        U
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chat Input */}
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Type your message..."
                                                    value={chatMessage}
                                                    onChange={(e) => setChatMessage(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Button size="icon">
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Support Categories */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Help</CardTitle>
                                        <CardDescription>Browse common topics</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {supportCategories.map((category, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <category.icon className="h-5 w-5 text-gray-600" />
                                                        <span className="text-sm font-medium">{category.label}</span>
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {category.count}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Create Ticket Tab */}
                    <TabsContent value="ticket" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Support Ticket</CardTitle>
                                <CardDescription>Submit a detailed support request</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="Enter your full name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="Enter your email" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {supportCategories.map((category, index) => (
                                                        <SelectItem key={index} value={category.label}>
                                                            {category.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="priority">Priority</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">Low</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="high">High</SelectItem>
                                                    <SelectItem value="urgent">Urgent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="Brief description of your issue" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Please provide detailed information about your issue..."
                                            className="min-h-[120px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="order">Order Number (if applicable)</Label>
                                        <Input id="order" placeholder="Enter your order number" />
                                    </div>

                                    <Button className="w-full">Submit Ticket</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* FAQ Tab */}
                    <TabsContent value="faq" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Frequently Asked Questions</CardTitle>
                                <CardDescription>Find quick answers to common questions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Search FAQ..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>

                                    {/* FAQ Items */}
                                    <Accordion type="single" collapsible className="w-full">
                                        {filteredFAQ.map((item, index) => (
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>

                                    {filteredFAQ.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p>No FAQ items found matching your search.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* My Tickets Tab */}
                    <TabsContent value="status" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Support Tickets</CardTitle>
                                <CardDescription>Track the status of your support requests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTickets.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{ticket.id}</span>
                                                    <Badge
                                                        variant={
                                                            ticket.status === "Resolved"
                                                                ? "default"
                                                                : ticket.status === "In Progress"
                                                                    ? "secondary"
                                                                    : "outline"
                                                        }
                                                        className={
                                                            ticket.status === "Resolved"
                                                                ? "bg-green-100 text-green-800"
                                                                : ticket.status === "In Progress"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                        }
                                                    >
                                                        {ticket.status === "Resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                                        {ticket.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                                                        {ticket.status === "Pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                                                        {ticket.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">{ticket.subject}</p>
                                                <p className="text-xs text-gray-500">Created: {ticket.date}</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
